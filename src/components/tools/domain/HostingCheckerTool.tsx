import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface HostingInfo {
  domain: string;
  ipAddress: string;
  hostingProvider: string;
  organization?: string;
  country?: string;
  city?: string;
  region?: string;
}

const HostingCheckerTool = () => {
  const [inputValue, setInputValue] = useState('');
  const [hostingInfo, setHostingInfo] = useState<HostingInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    setLoading(true);
    setHostingInfo(null);
    setError(null);
    
    try {
      const domainName = inputValue.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
      
      // Step 1: Get IP address using Google DNS API
      const dnsResponse = await fetch(`https://dns.google/resolve?name=${domainName}`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!dnsResponse.ok) {
        throw new Error(`DNS lookup failed: ${dnsResponse.status}`);
      }
      
      const dnsData = await dnsResponse.json();
      
      if (!dnsData.Answer) {
        throw new Error('Could not resolve domain. The domain might not exist or DNS records are not available.');
      }
      
      const ipAddress = dnsData.Answer.find((ans: { type: number }) => ans.type === 1)?.data;
      
      if (!ipAddress) {
        throw new Error('No A record found for this domain.');      }
        // Step 2: Get hosting information with ad blocker resilience
      let ipData = null;
      
      // Method 1: Try ipapi.co directly (often not blocked)
      try {
        const directResponse = await fetch(`https://ipapi.co/${ipAddress}/json/`, {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });
        if (directResponse.ok) {
          const locationData = await directResponse.json();
          if (locationData && !locationData.error) {
            ipData = {
              status: 'success',
              country: locationData.country_name || 'Unknown',
              city: locationData.city || 'Unknown',
              isp: locationData.org || 'Unknown',
              org: locationData.org || 'Unknown',
              lat: locationData.latitude || 0,
              lon: locationData.longitude || 0,
              regionName: locationData.region || 'Unknown'
            };
          }
        }
      } catch {
        console.log('Direct ipapi.co failed, trying alternatives...');
      }
      
      // Method 2: Try ipinfo.io (often bypasses ad blockers)
      if (!ipData) {
        try {
          const response = await fetch(`https://ipinfo.io/${ipAddress}/json`, {
            headers: {
              'Accept': 'application/json',
              'Cache-Control': 'no-cache'
            }
          });
          if (response.ok) {
            const locationData = await response.json();
            if (locationData && !locationData.error) {
              ipData = {
                status: 'success',
                country: locationData.country || 'Unknown',
                city: locationData.city || 'Unknown',
                isp: locationData.org || 'Unknown',
                org: locationData.org || 'Unknown',
                lat: 0,
                lon: 0,
                regionName: locationData.region || 'Unknown'
              };
            }
          }
        } catch {
          console.log('ipinfo.io failed, trying proxy...');
        }
      }
      
      // Method 3: Fallback to CORS proxy for ip-api.com
      if (!ipData) {
        try {
          const ipApiUrl = `http://ip-api.com/json/${ipAddress}`;
          const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(ipApiUrl)}`;
          
          const ipResponse = await fetch(proxyUrl, {
            headers: {
              'Accept': 'application/json',
              'Cache-Control': 'no-cache'
            },
          });
          
          if (ipResponse.ok) {
            const proxyData = await ipResponse.json();
            const parsedData = JSON.parse(proxyData.contents);
            
            if (parsedData.status === 'success') {
              ipData = parsedData;
            }
          }
        } catch {
          console.log('AllOrigins proxy also failed, trying alternative proxy...');
        }
      }
      
      // Method 4: Try CORS Anywhere proxy as last resort
      if (!ipData) {
        try {
          const ipApiUrl = `http://ip-api.com/json/${ipAddress}`;
          const proxyUrl = `https://cors-anywhere.herokuapp.com/${ipApiUrl}`;
          
          const ipResponse = await fetch(proxyUrl, {
            headers: {
              'Accept': 'application/json',
              'X-Requested-With': 'XMLHttpRequest'
            },
          });
          
          if (ipResponse.ok) {
            const parsedData = await ipResponse.json();
            
            if (parsedData.status === 'success') {
              ipData = parsedData;
            }
          }
        } catch {
          console.log('All proxy methods failed');
        }
      }
        // Step 3: Process the data
      if (ipData && (ipData.status === 'success' || ipData.status === 'limited')) {
        const hostingDetails: HostingInfo = {
          domain: domainName,
          ipAddress: ipAddress,
          hostingProvider: ipData.isp || ipData.org || 'Unknown Provider',
          organization: ipData.org,
          country: ipData.country,
          city: ipData.city,
          region: ipData.regionName,
        };
        
        setHostingInfo(hostingDetails);
      } else {
        throw new Error('Could not determine hosting provider. This may be due to ad blocker interference or network restrictions. Please try disabling your ad blocker temporarily.');
      }
      
    } catch (err) {
      console.error('Hosting check error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. This may be due to ad blocker or network restrictions. Please try disabling your ad blocker and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Who is Hosting This Website?</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Ever wondered who powers a specific website? Our Hosting Checker tool pulls back the curtain, instantly revealing the web hosting provider for any domain. This simple-to-use tool is invaluable for competitive analysis, business development, and satisfying your own curiosity about the web's infrastructure.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Hosting Checker</CardTitle>
          <CardDescription>Enter a domain name to identify its hosting provider.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">            <div className="flex flex-col sm:flex-row gap-4">
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
                  onClick={() => setInputValue('google.com')} 
                  variant="outline" 
                  className="text-base px-4"
                >
                  Try Example
                </Button>
                <Button onClick={handleCheck} disabled={loading || !inputValue.trim()} className="text-base px-6">
                  {loading ? 'Checking...' : 'Check Hosting'}
                </Button>
              </div>
            </div>            {error && (
              <Card>
                <CardHeader>
                  <CardTitle>Unable to Check Hosting</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-red-600 font-medium">{error}</p>
                    <div className="text-sm text-muted-foreground bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="font-medium text-yellow-800 mb-2">Possible causes:</p>
                      <ul className="list-disc list-inside space-y-1 text-yellow-700">
                        <li>AdGuard or other ad blocker is blocking IP lookup services</li>
                        <li>The domain doesn't exist or has no DNS records</li>
                        <li>Network firewall is blocking external API calls</li>
                        <li>VPN or proxy interference</li>
                      </ul>
                      <p className="mt-2 text-yellow-800">
                        <strong>Solution:</strong> Try temporarily disabling your ad blocker or VPN, then click "Check Hosting" again.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}{hostingInfo && (
              <Card>
                <CardHeader>
                  <CardTitle>Hosting Information for {hostingInfo.domain}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">Domain:</p>
                      <p>{hostingInfo.domain}</p>
                    </div>
                    <div>
                      <p className="font-semibold">IP Address:</p>
                      <p>{hostingInfo.ipAddress}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Hosting Provider:</p>
                      <p className="text-lg font-semibold text-blue-600">{hostingInfo.hostingProvider}</p>
                    </div>
                    {hostingInfo.organization && hostingInfo.organization !== hostingInfo.hostingProvider && (
                      <div>
                        <p className="font-semibold">Organization:</p>
                        <p>{hostingInfo.organization}</p>
                      </div>
                    )}
                    {hostingInfo.country && (
                      <div>
                        <p className="font-semibold">Country:</p>
                        <p>{hostingInfo.country}</p>
                      </div>
                    )}
                    {hostingInfo.city && (
                      <div>
                        <p className="font-semibold">Location:</p>
                        <p>{hostingInfo.city}{hostingInfo.region ? `, ${hostingInfo.region}` : ''}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">The Engine Room of the Internet: Understanding Web Hosting</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Every website you visit, from massive social media platforms to small personal blogs, lives on a specialized computer called a server. A web hosting provider is a company that owns and manages these servers, renting out space and resources to individuals and organizations to make their websites accessible on the internet. When you buy a hosting plan, you're essentially leasing a plot of digital land where your website's files, images, and databases are stored.</p>
                <p>The hosting provider is responsible for maintaining the server's hardware, ensuring it has a fast and reliable connection to the internet, and providing the necessary software for the website to run. The choice of a hosting provider is one of the most critical decisions a website owner makes, as it directly impacts the site's speed, reliability (uptime), security, and ability to handle traffic. Our Hosting Checker helps you identify which provider a website has entrusted with this crucial task.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">How We Uncover the Host: A Two-Step Process</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Identifying a website's host isn't as simple as looking at a single public record. Our tool uses a reliable two-step method to trace the information back to its source:</p>
                <ol className="list-decimal list-inside space-y-2 pl-4">
                    <li><strong>DNS Lookup:</strong> First, we resolve the domain name you provide to its IP address. As explained in our Domain to IP Converter tool, this involves querying the Domain Name System (DNS) to find the 'A' record, which points to the specific server IP where the website is located.</li>
                    <li><strong>IP Address Geolocation and ISP Lookup:</strong> Once we have the IP address, we query a comprehensive IP intelligence database. This database contains information about which organization or Internet Service Provider (ISP) owns and operates that specific block of IP addresses. In most cases, the owner of the IP address is the hosting company itself. The tool then displays the name of this ISP, which is the hosting provider.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Strategic Insights from Hosting Information</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Knowing who hosts a website can provide significant strategic advantages:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Competitive Analysis:</strong> Are your top competitors' websites faster or more reliable than yours? Checking their hosting provider can be the first step in understanding their infrastructure. If you see a trend of successful sites in your niche using a particular host, it might be worth investigating that provider for your own projects.</li>
                    <li><strong>Business and Sales Leads:</strong> For marketing agencies, developers, or hosting companies, this tool can be a lead generation machine. If you find a website that is slow or frequently down, you can identify their current host and approach them with a proposal to migrate to a better service.</li>
                    <li><strong>Security Research:</strong> When investigating a phishing site or a source of spam, identifying the hosting provider is a critical step. It allows security professionals to submit an abuse report to the correct company, which can lead to the malicious site being taken down.</li>
                    <li><strong>Migration and Collaboration:</strong> If you're taking over the management of a client's website, this tool provides a quick way to identify the current host so you know who to contact for access and migration details.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">What if the result shows a company like Cloudflare, Google Cloud, or AWS?</h3>
                    <p className="text-muted-foreground mt-1">This is a very common and important scenario. Companies like Cloudflare are not traditional web hosts but are Content Delivery Networks (CDNs) or cloud infrastructure providers. If you see Cloudflare, it means the website is using their service to cache content and protect against attacks; the actual origin server is hidden behind Cloudflare. If you see AWS (Amazon Web Services) or Google Cloud, it means the website is hosted on their massive cloud platforms, which is common for larger applications and businesses that manage their own server infrastructure.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Is the result always 100% accurate?</h3>
                    <p className="text-muted-foreground mt-1">Our tool is highly accurate as it relies on fundamental internet records. However, the name of the ISP might sometimes be the parent company of a smaller hosting brand. For example, a site might be hosted with "Bluehost," but the ISP might show as "Endurance International Group," its parent company. It will always point you in the right direction.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can a website have more than one host?</h3>
                    <p className="text-muted-foreground mt-1">A website's core files typically reside with a single hosting provider. However, a site can use different services for different functions. For example, its main website could be on a host like SiteGround, while its email is handled by Google Workspace and its images are served from an Amazon S3 bucket. Our tool identifies the host of the main website (the server pointed to by the primary A record).</p>
                </div>
                <div>
                    <h3 className="font-semibold">Why would I want to know who hosts a website?</h3>
                    <p className="text-muted-foreground mt-1">Curiosity is a great reason! But professionally, it's about making informed decisions. If you're choosing a host, seeing what successful sites use is a form of recommendation. If you're a developer, it helps you understand a site's technical stack. If you're in marketing, it helps you understand a competitor's investment in their infrastructure.</p>
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

export default HostingCheckerTool;
