import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const WhoisDomainLookupTool = () => {
  const [domain, setDomain] = useState('');
  const [lookupDomain, setLookupDomain] = useState('');

  const handleLookup = () => {
    if (domain.trim()) {
      setLookupDomain(domain.trim());
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">WHOIS Domain Lookup</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Access the public database of domain registration information. Our WHOIS Lookup tool retrieves detailed records for any domain, including registrar details, creation and expiration dates, nameservers, and registrant contact information (where available). This is an essential tool for network administrators, cybersecurity analysts, and anyone needing to verify domain ownership.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>WHOIS Lookup</CardTitle>
          <CardDescription>Enter a domain name to query the public WHOIS database.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Enter domain name (e.g., example.com)"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                className="flex-grow text-base"
              />
              <Button onClick={handleLookup} disabled={!domain.trim()} className="text-base px-6">
                Lookup WHOIS
              </Button>
            </div>
            {lookupDomain && (
              <div className="mt-6">
                <iframe
                  src={`https://www.whois.com/whois/${lookupDomain}`}
                  className="w-full h-96 border rounded-md"
                  title={`WHOIS lookup for ${lookupDomain}`}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">The Internet's Public Ledger: What is WHOIS?</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>WHOIS is a long-standing internet protocol that functions as a public directory for domain name registrations. Mandated by ICANN (the Internet Corporation for Assigned Names and Numbers), the organization that oversees domain names, every domain registrar is required to maintain a publicly accessible database of information about the domains they manage. This system was created to bring accountability and transparency to the internet, allowing anyone to find out who is responsible for a particular domain name.</p>
                <p>When a domain is registered, the owner (registrant) must provide contact information, which is then entered into the WHOIS record. This record acts as the official "deed" for that digital property. It contains vital details such as the name and contact information of the registrant, the registrar company that sold the domain, the domain's current status, its creation and expiration dates, and the nameservers it points to. Our tool directly queries this global database to bring you the raw, authoritative data for any domain.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Decoding the WHOIS Record: Key Information Explained</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>A WHOIS record can seem cryptic at first, but it contains several key pieces of information:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Registrant Information:</strong> This section details the legal owner of the domain. It traditionally includes the name, organization, address, and email. However, due to privacy concerns, this is often redacted or replaced by a privacy service.</li>
                    <li><strong>Registrar Information:</strong> This identifies the company that the domain was registered through (e.g., GoDaddy, Namecheap, Google Domains). This is the company you would contact to manage the domain.</li>
                    <li><strong>Important Dates:</strong> Look for the `Creation Date`, `Updated Date`, and `Registry Expiry Date`. These tell you when the domain was first registered, when it was last modified, and when it needs to be renewed.</li>
                    <li><strong>Domain Status:</strong> This field indicates the current state of the domain. Codes like `clientTransferProhibited` are normal and prevent unauthorized transfers. Codes like `redemptionPeriod` or `pendingDelete` indicate the domain has expired and may soon be available for registration.</li>
                    <li><strong>Name Servers:</strong> This lists the DNS nameservers responsible for handling the domain's DNS records. This tells you where the domain's technical operations are being managed, which often points to the hosting provider.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Practical Applications for WHOIS Data</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Accessing WHOIS data is essential for a wide range of professional and personal activities:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Domain Acquisition:</strong> If you want to purchase a domain that's already taken, a WHOIS lookup is your first step. If the owner's contact information is public, you can reach out directly with an offer. If it's private, you can often still make contact through the registrar's provided proxy email.</li>
                    <li><strong>Cybersecurity and Fraud Investigation:</strong> WHOIS data is a cornerstone of digital forensics. Security analysts use it to trace the ownership of phishing websites, spam networks, and other malicious domains. This information is crucial for reporting abuse and taking down harmful sites.</li>
                    <li><strong>Brand and Trademark Protection:</strong> Legal teams and brand managers use WHOIS lookups to identify who is behind websites that may be infringing on their trademarks, selling counterfeit goods, or engaging in cybersquatting.</li>
                    <li><strong>Network Administration:</strong> When diagnosing complex network or email issues, administrators may use WHOIS data to confirm registrar details and verify that the correct nameservers are listed for a domain.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Why is the owner's contact information often hidden?</h3>
                    <p className="text-muted-foreground mt-1">This is due to a service called WHOIS Privacy or Domain Privacy. Because WHOIS records are public, they became a target for spammers and data miners who would harvest email addresses and contact details. To combat this, registrars offer a service that replaces the owner's personal information with the registrar's generic contact details, acting as a privacy shield. This is now a standard and highly recommended practice.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Is the information in a WHOIS record always accurate?</h3>
                    <p className="text-muted-foreground mt-1">ICANN requires registrants to provide accurate information, and providing false data can be grounds for domain cancellation. However, it's not always perfectly policed. While the registrar and date information is almost always accurate, contact details can sometimes be outdated or, in rare cases, intentionally falsified.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What's the difference between a Registry and a Registrar?</h3>
                    <p className="text-muted-foreground mt-1">The <strong>Registry</strong> is the top-level organization that manages a specific TLD (e.g., Verisign is the registry for `.com`). The <strong>Registrar</strong> is the customer-facing company (e.g., GoDaddy) that is accredited by the registry to sell domain names to the public. The WHOIS record will list both.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can I look up any domain TLD?</h3>
                    <p className="text-muted-foreground mt-1">Our tool can look up most common generic TLDs (gTLDs) like .com, .net, .org, and .info, as well as many country-code TLDs (ccTLDs). However, some ccTLD registries have their own unique WHOIS policies and may not provide public access to this data, or they may offer very limited information.</p>
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
            <Link to="/tools/domain-ip-tools/hosting-checker" className="p-4 border rounded-lg transition-transform hover:scale-105">
              <h3 className="font-semibold">Hosting Checker</h3>
              <p className="text-muted-foreground text-sm mt-1">Check who is hosting a website.</p>
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

export default WhoisDomainLookupTool;
