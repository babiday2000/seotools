import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

const recordTypes = ['ANY', 'A', 'AAAA', 'CNAME', 'MX', 'NS', 'SOA', 'TXT'];

interface DnsRecord {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

const DnsRecordsCheckerTool = () => {
  const [domain, setDomain] = useState('');
  const [recordType, setRecordType] = useState('ANY');
  const [dnsData, setDnsData] = useState<DnsRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    setLoading(true);
    setDnsData([]);
    setError(null);
    try {
      const response = await fetch(`https://dns.google/resolve?name=${domain}&type=${recordType}`);
      const data = await response.json();
      if (data.Answer) {
        setDnsData(data.Answer);
      } else {
        setError('No records found.');
      }
    } catch {
      setError('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const getType = (type: number) => {
    const typeMap: { [key: number]: string } = {
      1: 'A',
      2: 'NS',
      5: 'CNAME',
      6: 'SOA',
      15: 'MX',
      16: 'TXT',
      28: 'AAAA',
    };
    return typeMap[type] || String(type);
  }

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">DNS Records Checker</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Instantly query and inspect the Domain Name System (DNS) records for any domain. Our tool provides a comprehensive and easy-to-read report of essential records like A, AAAA, CNAME, MX, NS, and TXT. Whether you're troubleshooting website issues, verifying email configurations, or conducting security analysis, our DNS checker is your go-to resource for accurate and immediate insights.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>DNS Lookup Tool</CardTitle>
          <CardDescription>Enter a domain name below to retrieve its public DNS records.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter domain name (e.g., example.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                className="flex-grow text-base"
              />
              <Select value={recordType} onValueChange={setRecordType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Record Type" />
                </SelectTrigger>
                <SelectContent>
                  {recordTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleCheck} disabled={loading || !domain.trim()} className="text-base px-6">
                {loading ? 'Checking...' : 'Check DNS Records'}
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
            {dnsData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>DNS Records for {domain}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dnsData.map((record, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                        <strong className="md:col-span-1">Name:</strong>
                        <span className="md:col-span-3 break-all">{record.name}</span>
                        <strong className="md:col-span-1">Type:</strong>
                        <span className="md:col-span-3 break-all">{getType(record.type)}</span>
                        <strong className="md:col-span-1">TTL:</strong>
                        <span className="md:col-span-3 break-all">{record.TTL}</span>
                        <strong className="md:col-span-1">Data:</strong>
                        <span className="md:col-span-3 break-all">{record.data}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">The Role of DNS in the Digital World</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>The Domain Name System (DNS) is often called the "phonebook of the internet," and for good reason. It's the foundational technology that translates human-readable domain names (like www.example.com) into the numerical Internet Protocol (IP) addresses that computers use to communicate with each other (like 93.184.216.34). Without DNS, we would have to remember long strings of numbers for every website we want to visit—an impossible task.</p>
                <p>Every domain has a set of DNS records stored on authoritative nameservers across the globe. These records are like individual entries in the phonebook, each providing a specific instruction for how to handle different types of requests. When you type a domain into your browser, your computer initiates a DNS query to find these records. This process, called DNS resolution, is what connects you to the correct server hosting the website, directs your emails to the right mail server, and ensures the internet functions seamlessly and efficiently. Our DNS Records Checker allows you to look directly at these critical records for any domain.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">A Deep Dive into Common DNS Record Types</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>While there are many types of DNS records, a few are essential for the everyday operation of a website and its associated services. Understanding their purpose is key to diagnosing problems and managing your online presence.</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>A (Address) Record:</strong> The most fundamental record type. It maps a domain or subdomain to a specific IPv4 address. This is the primary record used to point a domain to its web hosting server.</li>
                    <li><strong>AAAA (Quad A) Record:</strong> The next-generation equivalent of the A record. It maps a domain to an IPv6 address, the newer internet protocol designed to accommodate the vast number of devices now connected to the internet.</li>
                    <li><strong>CNAME (Canonical Name) Record:</strong> An alias record. It points a subdomain to another domain name, rather than an IP address. For example, you could use a CNAME to make `blog.example.com` point to a separate service like `example.wordpress.com`. It's important to note that a CNAME record cannot coexist with other records for the same hostname.</li>
                    <li><strong>MX (Mail Exchange) Record:</strong> Absolutely critical for email. This record specifies which mail servers are responsible for accepting emails on behalf of your domain, and it includes a priority value to indicate the order in which servers should be tried. Incorrect MX records are the most common cause of email delivery issues.</li>
                    <li><strong>NS (Name Server) Record:</strong> This record delegates authority over a domain or subdomain to a specific set of DNS servers (nameservers). These are the servers that hold all the other DNS records for that domain. When you change your hosting provider, you often need to update your NS records at your domain registrar.</li>
                    <li><strong>TXT (Text) Record:</strong> A versatile record that allows you to store arbitrary text. Its flexibility makes it useful for a variety of purposes, such as verifying domain ownership for services like Google Search Console, implementing email authentication protocols like SPF (Sender Policy Framework) and DKIM (DomainKeys Identified Mail) to combat spam, and storing other important information.</li>
                    <li><strong>SOA (Start of Authority) Record:</strong> This record contains administrative information about the DNS zone, such as the primary nameserver, the email of the domain administrator, the domain serial number, and various timers related to refreshing the zone. It's a critical part of how DNS information is synchronized across the internet.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Practical Uses for the DNS Records Checker</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool is more than just a technical utility; it's a problem-solving powerhouse for a variety of scenarios:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Website and Email Troubleshooting:</strong> Is your website down? Check the A record. Are emails not arriving? Inspect the MX records. This tool provides the first and most important step in diagnosing connectivity issues.</li>
                    <li><strong>Verifying DNS Propagation:</strong> After you make a change to your DNS records, such as switching web hosts, it can take time for the changes to propagate across the internet. Our tool allows you to check the current state of your records from a neutral, third-party perspective to confirm if your updates are live.</li>
                    <li><strong>Security and SEO Audits:</strong> Security professionals use DNS lookups to identify a domain's infrastructure, check for potentially malicious subdomains, and verify security-related TXT records like SPF and DMARC. For SEO, ensuring fast and correct DNS resolution is a small but important technical factor for user experience and crawlability.</li>
                    <li><strong>Competitive Analysis:</strong> Curious about what services a competitor is using? Examining their MX records might reveal their email provider (e.g., Google Workspace, Microsoft 365), and checking their other records can provide clues about their hosting and CDN infrastructure.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Why are the records I see here different from what I configured?</h3>
                    <p className="text-muted-foreground mt-1">This is usually due to DNS propagation. When you change a DNS record, it can take anywhere from a few minutes to 48 hours for the update to be reflected everywhere on the internet. Our tool shows the currently propagated record. If you just made a change, you may need to wait a while and check again.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What does TTL mean in the DNS records?</h3>
                    <p className="text-muted-foreground mt-1">TTL stands for "Time To Live." It's a value in seconds that tells DNS resolvers how long they should cache (store) a particular DNS record before requesting a fresh copy from the authoritative nameserver. A lower TTL means changes propagate faster, while a higher TTL can reduce the load on nameservers and speed up lookups for returning visitors.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can I see the DNS records for any domain?</h3>
                    <p className="text-muted-foreground mt-1">Yes, you can look up the records for any publicly registered domain name. DNS is a public system designed for open lookups. However, you cannot see the records for private or internal network domains.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What if the tool says "No records found"?</h3>
                    <p className="text-muted-foreground mt-1">This can mean a few things: the domain name might not exist, it might be misspelled, or it might not have any records of the specific type you're querying for. For a standard website, it should at least have NS and SOA records, and typically an A record.</p>
                </div>
            </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Related Tools</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/tools/domain-ip-tools/domain-age-checker" className="p-4 border rounded-lg transition-transform hover:scale-105">
              <h3 className="font-semibold">Domain Age Checker</h3>
              <p className="text-muted-foreground text-sm mt-1">Check the age of a domain name.</p>
            </Link>
            <Link to="/tools/domain-ip-tools/whois-domain-lookup" className="p-4 border rounded-lg transition-transform hover:scale-105">
              <h3 className="font-semibold">Whois Domain Lookup</h3>
              <p className="text-muted-foreground text-sm mt-1">Look up the registration information for a domain name.</p>
            </Link>
            <Link to="/tools/domain-ip-tools/hosting-checker" className="p-4 border rounded-lg transition-transform hover:scale-105">
              <h3 className="font-semibold">Hosting Checker</h3>
              <p className="text-muted-foreground text-sm mt-1">Check who is hosting a website.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DnsRecordsCheckerTool;
