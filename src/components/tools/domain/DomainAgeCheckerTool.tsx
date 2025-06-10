import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const DomainAgeCheckerTool = () => {
  const [inputValue, setInputValue] = useState('');
  const [domain, setDomain] = useState('');
  const [age, setAge] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [updatedDate, setUpdatedDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);  const handleCheck = async () => {
    setLoading(true);
    setAge('');
    setCreationDate('');
    setUpdatedDate('');
    setExpirationDate('');
    setError(null);
    setDomain(inputValue);
    
    try {
      const domainName = inputValue.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
      
      // Fetch WHOIS data directly from whois.com using CORS proxy
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.whois.com/whois/${domainName}`)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch WHOIS data from whois.com');
      }
      
      const result = await response.json();
      const htmlContent = result.contents;
      
      // Extract WHOIS information from HTML
      let creationDate = null;
      let updatedDate = null;
      let expirationDate = null;
        // Try multiple patterns for Creation Date (based on whois.com format)
      const creationPatterns = [
        /Registered On:\s*([^\n\r<\s]+)/i,
        /Creation Date:\s*([^\n\r<]+)/i,
        /Created On:\s*([^\n\r<]+)/i,
        /Registration Date:\s*([^\n\r<]+)/i,
        /Domain Name:\s*[^\n\r<]*[\n\r]+[^:]*Created[^:]*:\s*([^\n\r<]+)/i,
        /Registered:\s*([^\n\r<]+)/i,
        /<div[^>]*>Creation Date<\/div>\s*<div[^>]*>([^<]+)<\/div>/i,
        /<td[^>]*>Creation Date<\/td>\s*<td[^>]*>([^<]+)<\/td>/i
      ];
      
      for (const pattern of creationPatterns) {
        const match = htmlContent.match(pattern);
        if (match && match[1]) {
          creationDate = match[1].trim();
          break;
        }
      }
        // Try multiple patterns for Updated Date (based on whois.com format)
      const updatedPatterns = [
        /Updated On:\s*([^\n\r<\s]+)/i,
        /Updated Date:\s*([^\n\r<]+)/i,
        /Last Updated:\s*([^\n\r<]+)/i,
        /Modified:\s*([^\n\r<]+)/i,
        /<div[^>]*>Updated Date<\/div>\s*<div[^>]*>([^<]+)<\/div>/i,
        /<td[^>]*>Updated Date<\/td>\s*<td[^>]*>([^<]+)<\/td>/i
      ];
      
      for (const pattern of updatedPatterns) {
        const match = htmlContent.match(pattern);
        if (match && match[1]) {
          updatedDate = match[1].trim();
          console.log('Found updated date:', updatedDate);
          break;
        }
      }
      
      // Try multiple patterns for Expiration Date (based on whois.com format)
      const expirationPatterns = [
        /Expires On:\s*([^\n\r<\s]+)/i,
        /Expir(?:ation|y) Date:\s*([^\n\r<]+)/i,
        /Expires:\s*([^\n\r<]+)/i,
        /<div[^>]*>Expir(?:ation|y) Date<\/div>\s*<div[^>]*>([^<]+)<\/div>/i,
        /<td[^>]*>Expir(?:ation|y) Date<\/td>\s*<td[^>]*>([^<]+)<\/td>/i
      ];
      
      for (const pattern of expirationPatterns) {
        const match = htmlContent.match(pattern);
        if (match && match[1]) {
          expirationDate = match[1].trim();
          console.log('Found expiration date:', expirationDate);
          break;
        }
      }
        // If dates weren't found with the primary patterns, try fallback patterns
      if (!updatedDate) {
        const fallbackUpdatedMatch = htmlContent.match(/(?:updated|modified)[\s\S]*?(\d{4}-\d{2}-\d{2})/i);
        if (fallbackUpdatedMatch) {
          updatedDate = fallbackUpdatedMatch[1];
          console.log('Found updated date using fallback:', updatedDate);
        } else {
          console.log('Updated date not found with any pattern');
        }
      }
      
      if (!expirationDate) {
        const fallbackExpirationMatch = htmlContent.match(/(?:expires|expiration)[\s\S]*?(\d{4}-\d{2}-\d{2})/i);
        if (fallbackExpirationMatch) {
          expirationDate = fallbackExpirationMatch[1];
          console.log('Found expiration date using fallback:', expirationDate);
        } else {
          console.log('Expiration date not found with any pattern');
        }
      }
      
      console.log('Final extracted dates:', { creationDate, updatedDate, expirationDate });
  
      
      // Clean up extracted dates (remove HTML entities and extra whitespace)
      if (creationDate) {
        creationDate = creationDate.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
      }
      if (updatedDate) {
        updatedDate = updatedDate.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
      }
      if (expirationDate) {
        expirationDate = expirationDate.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
      }
        if (!creationDate) {
        // If we couldn't find the creation date, log the HTML for debugging
        console.log('HTML Content (first 2000 chars):', htmlContent.substring(0, 2000));
        
        // Try a more general approach - look for any date in YYYY-MM-DD format near "register" keywords
        const generalDateMatch = htmlContent.match(/(?:registered|created|registration)[\s\S]*?(\d{4}-\d{2}-\d{2})/i);
        if (generalDateMatch) {
          creationDate = generalDateMatch[1];
          console.log('Found date using general pattern:', creationDate);
        } else {
          throw new Error('Could not find creation date in WHOIS data. The domain might not exist or WHOIS data is not publicly available.');
        }
      }
      // Process the creation date and calculate age
      if (creationDate) {
        const creationDateObj = new Date(creationDate);
        
        if (!isNaN(creationDateObj.getTime())) {
          setCreationDate(creationDateObj.toDateString());
          
          // Calculate domain age
          const now = new Date();
          const ageInMilliseconds = now.getTime() - creationDateObj.getTime();
          const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
          const years = Math.floor(ageInDays / 365);
          const months = Math.floor((ageInDays % 365) / 30);
          const days = ageInDays % 30;
          setAge(`${years} years, ${months} months, and ${days} days`);
        } else {
          throw new Error('Could not parse creation date from WHOIS data.');
        }
      }      // Process updated date
      if (updatedDate) {
        console.log('Processing updated date:', updatedDate);
        const updatedDateObj = new Date(updatedDate);
        if (!isNaN(updatedDateObj.getTime())) {
          setUpdatedDate(updatedDateObj.toDateString());
          console.log('Updated date set to:', updatedDateObj.toDateString());
        } else {
          console.log('Invalid updated date format:', updatedDate);
        }
      } else {
        console.log('No updated date found');
      }

      // Process expiration date
      if (expirationDate) {
        console.log('Processing expiration date:', expirationDate);
        const expirationDateObj = new Date(expirationDate);
        if (!isNaN(expirationDateObj.getTime())) {
          setExpirationDate(expirationDateObj.toDateString());
          console.log('Expiration date set to:', expirationDateObj.toDateString());
        } else {
          console.log('Invalid expiration date format:', expirationDate);
        }
      } else {
        console.log('No expiration date found');
      }

    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while fetching WHOIS data.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Domain Age Checker</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Discover the history and authority of any domain with our precise Domain Age Checker. Instantly find out how long a website has been active, a key indicator for SEO performance, trustworthiness, and online reputation. This tool is essential for marketers, SEO analysts, and anyone considering purchasing an existing domain.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Check Domain Age</CardTitle>
          <CardDescription>Enter a domain name to find out its exact age from its creation date.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter domain name (e.g., example.com)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                className="flex-grow text-base"
              />
              <div className="flex gap-2">
                <Button 
                  onClick={() => setInputValue('anishlovo.live')} 
                  variant="outline" 
                  className="text-base px-4"
                >
                  Try Example
                </Button>
                <Button onClick={handleCheck} disabled={loading || !inputValue.trim()} className="text-base px-6">
                  {loading ? 'Checking...' : 'Check Age'}
                </Button>
              </div>
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
            {age && (
              <Card>
                <CardHeader>
                  <CardTitle>Result for {domain}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">Domain Name:</p>
                      <p>{domain}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Age:</p>
                      <p>{age}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Creation Date:</p>
                      <p>{creationDate}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Updated Date:</p>
                      <p>{updatedDate || 'Not available'}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Expiration Date:</p>
                      <p>{expirationDate || 'Not available'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>


      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">Understanding Domain Age and Its Significance</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>A domain's age refers to the length of time it has been registered and active on the internet. It's a simple metric, but it carries significant weight in the digital world. The moment a domain is first registered, its clock starts ticking. This age is a public record, accessible through a system called WHOIS, and it serves as a foundational data point for assessing a website's history, credibility, and authority.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">How Our Domain Age Checker Works</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool provides a quick and accurate way to determine this age. The process is straightforward yet powerful:</p>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li><strong>WHOIS Lookup:</strong> When you enter a domain name, our tool initiates a query to the public WHOIS database. This database is a distributed, public directory containing the registration details of all domain names.</li>
                    <li><strong>Extraction of Creation Date:</strong> The tool scans the WHOIS record for the "Creation Date" field. This specific line item indicates the exact date the domain was first registered.</li>
                    <li><strong>Age Calculation:</strong> Once the creation date is extracted, our system calculates the difference between that date and the current date.</li>
                    <li><strong>Displaying the Result:</strong> The final result is presented to you in an easy-to-understand format of years, months, and days, giving you a precise measure of the domain's age.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Why Domain Age Matters: Use Cases and Strategic Advantages</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Knowing a domain's age is crucial for various strategic activities, from SEO to domain investing.</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Search Engine Optimization (SEO):</strong> While Google has stated that domain age itself is a minor ranking factor, it's correlated with factors that are highly important. An older domain has had more time to acquire high-quality backlinks, publish content, and establish topical authority. Checking a domain's age helps you gauge the historical strength you're competing against or acquiring.</li>
                    <li><strong>Competitor Analysis:</strong> Understanding the age of your competitors' domains provides context. If a top competitor has a 15-year-old domain, you know they have a significant head start in building authority. Conversely, if a new competitor is rising quickly, it's worth analyzing their strategy.</li>
                    <li><strong>Purchasing Expired or Existing Domains:</strong> This is where our tool is most valuable. When considering the purchase of an existing domain, its age is a primary indicator of its potential value. An older domain might come with a pre-existing backlink profile and established trust, giving you a massive head start. However, it's also crucial to check its history for any penalties or spammy activity.</li>
                    <li><strong>Assessing Trust and Credibility:</strong> For end-users, a long-established website can feel more trustworthy. While subtle, the knowledge that a site has been operational for many years can positively influence a user's perception of its legitimacy and reliability, which is particularly important for e-commerce and informational sites.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Is an older domain always better for SEO?</h3>
                    <p className="text-muted-foreground mt-1">Not necessarily. While age can be an advantage, it's the quality of the domain's history that truly matters. A 10-year-old domain that was used for spam or has a history of Google penalties is far less valuable than a 2-year-old domain with a clean, high-quality backlink profile and great content. Age is a piece of the puzzle, not the whole picture.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What if the tool can't find the age?</h3>
                    <p className="text-muted-foreground mt-1">This can happen for a few reasons. The domain might be very new and its WHOIS record hasn't fully propagated. Some country-code top-level domains (ccTLDs) have stricter WHOIS policies and may not display the creation date publicly. Lastly, a typo in the domain name will also result in an error.</p>
                </div>                <div>
                    <h3 className="font-semibold">Does the age reset if a domain expires and is re-registered?</h3>
                    <p className="text-muted-foreground mt-1">No, the original creation date remains in the WHOIS record. The record will also show an "Updated Date" reflecting the new registration. So, even if a domain has changed hands, its original age is preserved, which is why expired domains can be so valuable.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What is WHOIS privacy and how does it affect this tool?</h3>
                    <p className="text-muted-foreground mt-1">WHOIS privacy is a service offered by domain registrars that hides the personal information of the domain owner (name, address, email) from the public WHOIS record. However, it does not hide the fundamental details of the domain itself, such as the creation date, expiration date, and nameservers. Therefore, our tool can still determine the age of a domain even if the owner is using WHOIS privacy.</p>
                </div>
            </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Related Tools</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/tools/domain-ip-tools/whois-domain-lookup" className="p-4 border rounded-lg transition-transform hover:scale-105">
              <h3 className="font-semibold">Whois Domain Lookup</h3>
              <p className="text-muted-foreground text-sm mt-1">Look up the registration information for a domain name.</p>
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

export default DomainAgeCheckerTool;
