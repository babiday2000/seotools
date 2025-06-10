import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const DomainToIpConverterTool = () => {
  const [domain, setDomain] = useState('');
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    setLoading(true);
    setIp('');
    setError(null);
    try {
      const domainName = domain.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
      const response = await fetch(`https://dns.google/resolve?name=${domainName}`);
      const data = await response.json();
      if (data.Answer) {
        const ipAddresses = data.Answer
          .filter((ans: { type: number }) => ans.type === 1 || ans.type === 28) // A (1) and AAAA (28) records
          .map((ans: { data: string }) => ans.data)
          .join('\n');
        setIp(ipAddresses || 'No A or AAAA records found');
      } else {
        setError('Could not resolve domain.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Domain to IP Converter</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Instantly translate any human-readable domain name into its fundamental machine-readable IP address. Our tool performs a real-time DNS lookup to reveal the server address behind a website. This is an essential utility for network administrators, web developers, and cybersecurity professionals for troubleshooting, verification, and investigation.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Resolve Domain to IP</CardTitle>
          <CardDescription>Enter a domain name to find its corresponding IP address (IPv4 and IPv6).</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter domain name (e.g., example.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleConvert()}
                className="flex-grow text-base"
              />
              <Button onClick={handleConvert} disabled={loading || !domain.trim()} className="text-base px-6">
                {loading ? 'Converting...' : 'Convert to IP'}
              </Button>
            </div>
            {error && (
              <Card>
                <CardHeader>
                  <CardTitle>Error</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-500">{error}</p>
                </CardContent>
              </Card>
            )}
            {ip && (
              <Card>
                <CardHeader>
                  <CardTitle>IP Address(es) for {domain}</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-lg font-semibold text-center whitespace-pre-wrap">{ip}</pre>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">The Foundation of Internet Communication</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>The internet as we know it is built on a fundamental partnership between easy-to-remember domain names (like `seotooler.com`) and the not-so-easy-to-remember numerical IP addresses that represent the actual locations of servers online. An IP (Internet Protocol) address is a unique identifier assigned to every device connected to a computer network, including the servers that host websites. This system is managed by the Domain Name System (DNS), the internet's global address book.</p>
                <p>When you type a domain into your browser, a process called a "DNS lookup" or "DNS resolution" happens in the background. Your computer asks a series of DNS servers, "What is the IP address for this domain?" The servers look up the domain's 'A' record (for an IPv4 address) or 'AAAA' record (for an IPv6 address) and send the answer back to your browser. Only then can your browser establish a connection with the correct server to request the website's content. Our Domain to IP Converter gives you a direct look into this critical first step of internet communication.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">IPv4 vs. IPv6: Understanding the Two Types of IP Addresses</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool will often show two different types of IP addresses. It's important to understand the difference:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>IPv4 (Internet Protocol version 4):</strong> This is the original and still most common type of IP address. It's a 32-bit number typically represented as four blocks of numbers separated by periods (e.g., `93.184.216.34`). The IPv4 system allows for approximately 4.3 billion unique addresses. While that sounds like a lot, the rapid growth of the internet has led to the exhaustion of available IPv4 addresses.</li>
                    <li><strong>IPv6 (Internet Protocol version 6):</strong> This is the next generation of the protocol, developed to solve the address shortage. It uses a 128-bit address, represented as eight groups of four hexadecimal digits separated by colons (e.g., `2606:2800:220:1:248:1893:25c8:1946`). This system allows for a virtually limitless number of addresses (340 undecillion, or 3.4 x 10^38), ensuring the internet can continue to grow indefinitely. Most modern websites and networks support both protocols.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Practical Applications and Use Cases</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Converting a domain to its IP address is more than a technical curiosity; it's a vital task for many professionals:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Network Troubleshooting:</strong> If a website isn't loading, one of the first steps is to check if its domain is resolving to an IP address correctly. If it isn't, the problem lies with the domain's DNS configuration, not necessarily the server itself.</li>
                    <li><strong>Server and Hosting Identification:</strong> The IP address can tell you a lot about where a website is hosted. You can use the IP with other tools (like our IP Address Lookup) to find the hosting provider, the physical location of the server, and the organization that owns the IP block.</li>
                    <li><strong>Cybersecurity Investigations:</strong> Security analysts use this process to trace the origin of malicious websites or phishing emails. By finding the IP address, they can report the server to its hosting provider for abuse or block the IP address on their network firewalls.</li>
                    <li><strong>Bypassing DNS Issues:</strong> In rare cases where your local DNS server is having problems, you might be able to access a website directly via its IP address. This is also useful for developers who want to test a site on a new server before updating the public DNS records.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Can a domain have more than one IP address?</h3>
                    <p className="text-muted-foreground mt-1">Yes, absolutely. Large websites often use multiple servers to handle their traffic, a practice known as load balancing. In this case, a single domain may resolve to several different IP addresses. When you perform a lookup, the DNS system may return a different IP each time, distributing the load across the servers.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Why does the tool sometimes show "No A or AAAA records found"?</h3>
                    <p className="text-muted-foreground mt-1">This means that while the domain itself may be registered, it doesn't have the specific DNS records that point it to a web server. This is common for domains that are "parked" or are used only for email services (which use MX records) and not for hosting a website.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Is this the same as a "ping" command?</h3>
                    <p className="text-muted-foreground mt-1">It's the first part of a ping. When you ping a domain from your command line, your computer first performs a DNS lookup to get the IP address, and then it sends packets to that IP to test the connection speed and reliability. Our tool focuses only on the first step: the DNS lookup itself.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can I find the domain for an IP address?</h3>
                    <p className="text-muted-foreground mt-1">Yes, that process is called a "Reverse DNS Lookup." It's like looking up a phone number to find the name of the person. We offer this functionality in our separate IP Address Lookup tool, which can often identify the hostname associated with a given IP.</p>
                </div>
            </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Related Tools</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/tools/domain-ip-tools/ip-address-lookup" className="p-4 border rounded-lg transition-transform hover:scale-105">
              <h3 className="font-semibold">IP Address Lookup</h3>
              <p className="text-muted-foreground text-sm mt-1">Look up the location and other information for an IP address.</p>
            </Link>
            <Link to="/tools/domain-ip-tools/what-is-my-ip-address" className="p-4 border rounded-lg transition-transform hover:scale-105">
              <h3 className="font-semibold">What Is My IP Address</h3>
              <p className="text-muted-foreground text-sm mt-1">Find out your public IP address.</p>
            </Link>
            <Link to="/tools/domain-ip-tools/dns-records-checker" className="p-4 border rounded-lg transition-transform hover:scale-105">
              <h3 className="font-semibold">DNS Records Checker</h3>
              <p className="text-muted-foreground text-sm mt-1">Check the DNS records for a domain name.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DomainToIpConverterTool;
