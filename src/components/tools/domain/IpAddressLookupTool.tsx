import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface IpData {
  country: string;
  countryCode: string;
  city: string;
  regionName: string;
  region: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
}

const IpAddressLookupTool = () => {
  const [ip, setIp] = useState('');
  const [ipData, setIpData] = useState<IpData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);  const handleLookup = async () => {
    setLoading(true);
    setIpData(null);
    setError(null);
    try {
      // Try multiple methods to work around ad blockers
      let data = null;
      
      // Method 1: Try ipapi.co directly (often not blocked by ad blockers)
      try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        if (response.ok) {
          const locationData = await response.json();
          if (locationData && !locationData.error) {
            data = {
              query: ip,
              country: locationData.country_name || 'Unknown',
              countryCode: locationData.country || 'Unknown',
              city: locationData.city || 'Unknown',
              regionName: locationData.region || 'Unknown',
              region: locationData.region_code || 'Unknown',
              zip: locationData.postal || 'Unknown',
              lat: locationData.latitude || 0,
              lon: locationData.longitude || 0,
              timezone: locationData.timezone || 'Unknown',
              isp: locationData.org || 'Unknown',
              org: locationData.org || 'Unknown',
              as: locationData.asn || 'Unknown'
            };
          }
        }
      } catch {
        console.log('ipapi.co failed, trying proxy method...');
      }
      
      // Method 2: Fallback to CORS proxy if direct method fails
      if (!data) {
        try {
          const ipApiUrl = `http://ip-api.com/json/${ip}?fields=status,message,country,city,isp,org,as,query,lat,lon,timezone,countryCode,regionName,region,zip`;
          const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(ipApiUrl)}`;
          
          const response = await fetch(proxyUrl, {
            headers: { 'Accept': 'application/json' }
          });
          
          if (response.ok) {
            const proxyData = await response.json();
            const ipApiData = JSON.parse(proxyData.contents);
            
            if (ipApiData.status === 'success') {
              data = ipApiData;
            }
          }
        } catch {
          console.log('Proxy method also failed');
        }
      }
      
      if (data) {
        setIpData(data);
      } else {
        setError('Could not retrieve IP information. The IP address may be invalid, or geolocation services are being blocked by your ad blocker.');
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
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">IP Address Lookup</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Pinpoint the geographical location and uncover key details of any public IP address. Our tool provides instant data, including the country, city, region, ISP, and latitude/longitude. This is an essential utility for cybersecurity experts, network administrators, and marketers to trace, verify, and analyze IP origins.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>IP Geolocation Tool</CardTitle>
          <CardDescription>Enter an IP address to find its geographical location and network details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Enter IP address (e.g., 8.8.8.8)"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                className="flex-grow text-base"
              />
              <Button onClick={handleLookup} disabled={loading || !ip.trim()} className="text-base px-6">
                {loading ? 'Looking up...' : 'Lookup IP'}
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
            )}            {ipData && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>IP Information for {ip}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><strong>Country:</strong> {ipData.country} ({ipData.countryCode})</div>
                      <div><strong>City:</strong> {ipData.city}</div>
                      <div><strong>Region:</strong> {ipData.regionName} ({ipData.region})</div>
                      <div><strong>ZIP Code:</strong> {ipData.zip}</div>
                      <div><strong>Coordinates:</strong> {ipData.lat}, {ipData.lon}</div>
                      <div><strong>Timezone:</strong> {ipData.timezone}</div>
                      <div className="col-span-2"><strong>ISP:</strong> {ipData.isp}</div>
                      <div className="col-span-2"><strong>Organization:</strong> {ipData.org}</div>
                      <div className="col-span-2"><strong>ASN:</strong> {ipData.as}</div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex items-start gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <div className="text-amber-600 mt-0.5">⚠️</div>
                  <div>
                    <p><strong>Accuracy Notice:</strong> IP geolocation data is approximate and may not reflect the exact location. Results can vary between different geolocation services and may show the ISP's server location rather than the actual user's location. This information should be used as a general reference only.</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">Demystifying IP Geolocation</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>IP geolocation is the science of mapping an IP address—the unique numerical label assigned to devices on the internet—to its real-world geographic location. It's the technology that allows services to know, with a reasonable degree of accuracy, where a user or server is physically located. This isn't magic; it's a process of data correlation. Companies that specialize in IP intelligence maintain massive, constantly updated databases that link blocks of IP addresses to the Internet Service Providers (ISPs) that own them, and in turn, to the cities, regions, and countries where those ISPs operate.</p>
                <p>When you enter an IP address into our tool, we query one of these extensive databases. The tool retrieves key information associated with that IP, such as the country, city, postal code, and the ISP that controls it. It's important to understand that this technology identifies the location of the network hub or ISP, not the exact street address of a specific user. The accuracy can vary, being very precise in major metropolitan areas and less so in rural regions, but it provides a powerful and actionable snapshot of an IP's origin.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">The Power of Knowing "Where": Key Use Cases</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>The data provided by an IP lookup is far more than just a point on a map. It's a critical piece of intelligence used across various industries.</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Cybersecurity and Threat Intelligence:</strong> This is a primary use case. When a company detects a cyberattack or suspicious activity, security analysts use IP lookup to determine the origin of the threat. This helps in blocking traffic from malicious regions, reporting the activity to the relevant ISP, and understanding the global landscape of potential threats.</li>
                    <li><strong>Content Personalization and Geotargeting:</strong> Websites and applications use IP geolocation to tailor the user experience. This can include displaying content in the local language, showing prices in the local currency, or promoting region-specific events. It ensures that users see the most relevant information without having to specify their location manually.</li>
                    <li><strong>Fraud Detection:</strong> In e-commerce and banking, IP lookup is a vital tool for preventing fraud. If a customer places an order with a credit card billed to a New York address, but their IP address originates from a different continent, it raises a red flag that can trigger additional verification steps, protecting both the customer and the business.</li>
                    <li><strong>Digital Rights Management:</strong> Streaming services and content distributors use geolocation to enforce licensing agreements. This is why a movie or TV show might be available on a platform in one country but not in another. IP lookup is how they determine which library of content to show you.</li>
                    <li><strong>Network Troubleshooting:</strong> For network administrators, tracing an IP can help diagnose routing issues, identify unexpected traffic sources, and verify that network configurations are directing traffic as intended.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Interpreting the Results: What the Data Means</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool provides several key data points. Here's what they signify:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Geographical Data (Country, City, Region):</strong> This tells you the physical location of the network's access point.</li>
                    <li><strong>ISP (Internet Service Provider):</strong> This is the company that owns the IP address and provides internet access. It could be a major telecom company (like Comcast or AT&T) or a web hosting provider (like DigitalOcean or AWS).</li>
                    <li><strong>Organization:</strong> This field often specifies the name of the business or institution that has registered the block of IP addresses.</li>
                    <li><strong>ASN (Autonomous System Number):</strong> An ASN is a unique global identifier for a network controlled by a single administrative entity. It's a more technical way to identify the network operator, often used by network engineers.</li>
                    <li><strong>Latitude & Longitude:</strong> These are the geographic coordinates, useful for plotting the location on a map or integrating with other location-based services.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">How accurate is IP geolocation?</h3>
                    <p className="text-muted-foreground mt-1">Accuracy varies. It's generally very accurate at the country level (over 99%) and quite accurate at the city level, especially in well-developed areas. However, it should not be relied upon to find a specific street address. The location identified is that of the ISP's server or routing center, which could be miles away from the actual user.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can I look up my own IP address?</h3>
                    <p className="text-muted-foreground mt-1">Yes, and we have a dedicated "What Is My IP Address?" tool for that. It will automatically detect and show you the public IP address your device is currently using to access the internet, along with its geolocation data.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Does using a VPN change the result?</h3>
                    <p className="text-muted-foreground mt-1">Absolutely. That's the primary purpose of a VPN (Virtual Private Network). When you use a VPN, your internet traffic is routed through a server in a different location. An IP lookup will show the location and ISP of the VPN server, not your actual location, effectively masking your digital footprint.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What's the difference between a public and a private IP address?</h3>
                    <p className="text-muted-foreground mt-1">A public IP address is a globally unique address assigned by your ISP, which you use to communicate on the internet. A private IP address is used within a local network (like your home Wi-Fi) and is not reachable from the public internet. Our tool can only look up public IP addresses, as private IPs (like 192.168.1.1 or 10.0.0.1) are not unique and have no global location data.</p>
                </div>
            </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Related Tools</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/tools/domain-ip-tools/domain-to-ip-converter" className="p-4 border rounded-lg transition-transform hover:scale-105">
              <h3 className="font-semibold">Domain to IP Converter</h3>
              <p className="text-muted-foreground text-sm mt-1">Convert a domain name to its corresponding IP address.</p>
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

export default IpAddressLookupTool;
