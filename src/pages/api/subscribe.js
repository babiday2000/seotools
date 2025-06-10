export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 });
    }
    const { email } = await req.json();
    if (!email) {
        return new Response(JSON.stringify({ message: 'Email is required' }), { status: 400 });
    }
    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
    if (!MAILERLITE_API_KEY) {
        return new Response(JSON.stringify({ message: 'MailerLite API key not configured' }), { status: 500 });
    }
    try {
        const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
            },
            body: JSON.stringify({
                email,
            }),
        });
        if (response.ok) {
            return new Response(JSON.stringify({ message: 'Successfully subscribed!' }), { status: 200 });
        }
        else {
            const errorData = await response.json();
            return new Response(JSON.stringify({ message: errorData.message || 'Something went wrong' }), { status: response.status });
        }
    }
    catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
    }
}
