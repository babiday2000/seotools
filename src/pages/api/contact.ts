export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 });
  }

  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
  }

  // Here you would typically send an email.
  // For this example, we'll just log the data to the console.
  console.log('Contact form submission:', { name, email, subject, message });

  return new Response(JSON.stringify({ message: 'Message sent successfully!' }), { status: 200 });
}
