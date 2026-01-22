import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// Telegram Bot Configuration - Set these in Netlify Environment Variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

// Rate limiting: max 3 submissions per hour per IP
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour in milliseconds

// In-memory rate limit store (resets on cold start - acceptable for free plan)
const rateLimitStore = new Map<string, { count: number; firstRequest: number }>();

// Clean up expired entries
function cleanupRateLimitStore() {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now - data.firstRequest > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
}

// Check rate limit for an IP
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  cleanupRateLimitStore();
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record) {
    rateLimitStore.set(ip, { count: 1, firstRequest: now });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  // Check if window has expired
  if (now - record.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, firstRequest: now });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  // Within window, check count
  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  // Increment count
  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

// Sanitize input to prevent injection
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove HTML tags
    .trim()
    .substring(0, 1000); // Limit length
}

// Format message for Telegram
function formatTelegramMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  ip: string;
  userAgent: string;
  timestamp: string;
}): string {
  return `📬 *New Contact Form Submission*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📋 *Subject:* ${data.subject}

💬 *Message:*
${data.message}

───────────────
🕐 *Time:* ${data.timestamp}
🌐 *IP:* ${data.ip}
🖥️ *User Agent:* ${data.userAgent}`;
}

// Send message to Telegram
async function sendToTelegram(message: string): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Telegram credentials not configured");
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const result = await response.json();
    return result.ok === true;
  } catch (error) {
    console.error("Telegram API error:", error);
    return false;
  }
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight request
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  // Get client IP
  const clientIp =
    event.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    event.headers["client-ip"] ||
    "unknown";

  // Check rate limit
  const rateLimit = checkRateLimit(clientIp);
  if (!rateLimit.allowed) {
    return {
      statusCode: 429,
      headers: {
        ...headers,
        "X-RateLimit-Remaining": "0",
      },
      body: JSON.stringify({
        message: "Rate limit exceeded. Maximum 3 submissions per hour. Please try again later.",
      }),
    };
  }

  try {
    // Parse request body
    const body = JSON.parse(event.body || "{}");
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "All fields are required" }),
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: "Invalid email format" }),
      };
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
      ip: clientIp,
      userAgent: sanitizeInput(event.headers["user-agent"] || "Unknown"),
      timestamp: new Date().toLocaleString("en-US", {
        timeZone: "UTC",
        dateStyle: "full",
        timeStyle: "long",
      }),
    };

    // Format and send to Telegram
    const telegramMessage = formatTelegramMessage(sanitizedData);
    const sent = await sendToTelegram(telegramMessage);

    if (!sent) {
      console.error("Failed to send message to Telegram");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: "Failed to send message. Please try again later." }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        ...headers,
        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
      },
      body: JSON.stringify({ message: "Message sent successfully!" }),
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: "Something went wrong. Please try again later." }),
    };
  }
};

export { handler };
