import whois from 'whois-json';
export default async function handler(req, res) {
    const domain = req.query.domain;
    if (!domain) {
        return res.status(400).json({ error: 'Domain is required' });
    }
    try {
        const result = await whois(domain);
        res.status(200).json({ data: result });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}
