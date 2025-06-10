import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface IpData {
  query: string;
  country: string;
  city: string;
  isp: string;
  lat: number;
  lon: number;
  timezone?: string;
  org?: string;
  as?: string;
}

const WhatIsMyIpAddressTool = () => {
  const [ipData, setIpData] = useState<IpData | null>(null);
  const [loading, setLoading] = useState(true);  const fetchIp = async () => {
    setLoading(true);
    try {
      // Try multiple services to work around ad blockers
      let ipData = null;
      
      // Method 1: Try ipapi.co directly (often not blocked and includes location)
      try {
        const response = await fetch('https://ipapi.co/json/', {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.ip && data.ip !== 'undefined') {
            ipData = {
              query: data.ip,
              country: data.country_name || 'Unknown',
              city: data.city || 'Unknown',
              isp: data.org || 'Unknown',
              lat: data.latitude || 0,
              lon: data.longitude || 0,
              timezone: data.timezone || 'Unknown'
            };
          }
        }
      } catch {
        console.log('ipapi.co failed, trying alternatives...');
      }
      
      // Method 2: Try ipify.org with location lookup
      if (!ipData) {
        try {
          const response = await fetch('https://api.ipify.org?format=json', {
            headers: {
              'Accept': 'application/json',
              'Cache-Control': 'no-cache'
            }
          });
          if (response.ok) {
            const data = await response.json();
            if (data.ip) {
              // Try to get additional info from ipapi.co
              try {
                const locationResponse = await fetch(`https://ipapi.co/${data.ip}/json/`);
                if (locationResponse.ok) {
                  const locationData = await locationResponse.json();
                  ipData = {
                    query: data.ip,
                    country: locationData.country_name || 'Unknown',
                    city: locationData.city || 'Unknown',
                    isp: locationData.org || 'Unknown',
                    lat: locationData.latitude || 0,
                    lon: locationData.longitude || 0,
                    timezone: locationData.timezone || 'Unknown'
                  };
                } else {
                  // If location lookup fails, just use IP
                  ipData = {
                    query: data.ip,
                    country: 'Unknown',
                    city: 'Unknown',
                    isp: 'Unknown',
                    lat: 0,
                    lon: 0
                  };
                }
              } catch {
                // If location lookup fails, just use IP
                ipData = {
                  query: data.ip,
                  country: 'Unknown',
                  city: 'Unknown',
                  isp: 'Unknown',
                  lat: 0,
                  lon: 0
                };
              }
            }
          }
        } catch {
          console.log('ipify.org failed, trying alternatives...');
        }
      }
      
      // Method 3: Try icanhazip.com (simple text response)
      if (!ipData) {
        try {
          const response = await fetch('https://icanhazip.com', {
            headers: {
              'Accept': 'text/plain',
              'Cache-Control': 'no-cache'
            }
          });
          if (response.ok) {
            const ip = (await response.text()).trim();
            if (ip && ip.match(/^\d+\.\d+\.\d+\.\d+$/)) {
              ipData = {
                query: ip,
                country: 'Unknown',
                city: 'Unknown',
                isp: 'Unknown',
                lat: 0,
                lon: 0
              };
            }
          }
        } catch {
          console.log('icanhazip.com failed');
        }
      }
      
      // Method 4: Try ifconfig.me
      if (!ipData) {
        try {
          const response = await fetch('https://ifconfig.me/ip', {
            headers: {
              'Accept': 'text/plain',
              'Cache-Control': 'no-cache'
            }
          });
          if (response.ok) {
            const ip = (await response.text()).trim();
            if (ip && ip.match(/^\d+\.\d+\.\d+\.\d+$/)) {
              ipData = {
                query: ip,
                country: 'Unknown',
                city: 'Unknown',
                isp: 'Unknown',
                lat: 0,
                lon: 0
              };
            }
          }
        } catch {
          console.log('ifconfig.me failed');
        }
      }
      
      // Method 5: Try seeip.org
      if (!ipData) {
        try {
          const response = await fetch('https://api.seeip.org/jsonip?', {
            headers: {
              'Accept': 'application/json',
              'Cache-Control': 'no-cache'
            }
          });
          if (response.ok) {
            const data = await response.json();
            if (data.ip) {
              ipData = {
                query: data.ip,
                country: 'Unknown',
                city: 'Unknown',
                isp: 'Unknown',
                lat: 0,
                lon: 0
              };
            }
          }
        } catch {
          console.log('seeip.org failed');
        }
      }
      
      // Method 6: Last resort - try httpbin
      if (!ipData) {
        try {
          const response = await fetch('https://httpbin.org/ip', {
            headers: {
              'Accept': 'application/json',
              'Cache-Control': 'no-cache'
            }
          });
          if (response.ok) {
            const data = await response.json();
            if (data.origin) {
              ipData = {
                query: data.origin.split(',')[0].trim(), // Handle case where multiple IPs are returned
                country: 'Unknown',
                city: 'Unknown',
                isp: 'Unknown',
                lat: 0,
                lon: 0
              };
            }
          }
        } catch {
          console.log('httpbin.org also failed');
        }
      }
      
      if (ipData) {
        setIpData(ipData);
      } else {
        throw new Error('All IP detection services failed');
      }
    } catch (error) {
      console.error("IP Fetch Error:", error);
      setIpData(null);
      toast.error('Could not fetch IP address. Ad blocker may be interfering. Please try disabling your ad blocker or VPN temporarily.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIp();
  }, []);

  const handleRefresh = () => {
    fetchIp();
    toast.info('Refreshing IP information...');
  };

  const handleCopy = () => {
    if (ipData?.query) {
      navigator.clipboard.writeText(ipData.query);
      toast.success('IP Address copied to clipboard!');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">What Is My IP Address?</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Instantly discover your public IP address—your unique identifier on the internet. This tool reveals the IP that websites, online services, and other users see when you connect with them. We also provide key geolocation details associated with your IP.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Your Public IP Information</CardTitle>
          <CardDescription>This is the public IP address your network is currently using to access the internet.</CardDescription>
        </CardHeader>        <CardContent className="space-y-4 text-center">
          {loading ? (
            <p className="text-lg font-semibold">Loading your IP address...</p>
          ) : ipData ? (
            <>
              <div className="flex items-center justify-center gap-4 bg-muted p-4 rounded-lg">
                <p className="text-2xl md:text-3xl font-bold tracking-wider">{ipData.query}</p>
                <Button variant="outline" size="icon" onClick={handleCopy}>
                  <Copy className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleRefresh}>
                  <RefreshCw className="h-5 w-5" />
                </Button>
              </div>              <div className="text-sm text-muted-foreground grid grid-cols-1 sm:grid-cols-3 gap-2">
                <p><strong>Location:</strong> {ipData.city !== 'Unknown' ? `${ipData.city}, ${ipData.country}` : 'Location detection blocked'}</p>
                <p><strong>ISP:</strong> {ipData.isp !== 'Unknown' ? ipData.isp : 'ISP detection blocked'}</p>
                <p><strong>Coordinates:</strong> {ipData.lat !== 0 ? `${ipData.lat.toFixed(4)}, ${ipData.lon.toFixed(4)}` : 'Coordinates unavailable'}</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200">
                <AlertCircle className="h-4 w-4" />
                <p><strong>Note:</strong> {ipData.city === 'Unknown' ? 'Ad blocker detected - only IP address available. Disable ad blocker for full geolocation data.' : 'IP geolocation is approximate and may not reflect your exact location or ISP. Different services may show varying results.'}</p>
              </div>
            </>          ) : (
            <div className="space-y-4">
              <p className="text-lg font-semibold text-destructive">Could not retrieve your IP address.</p>
              <div className="text-sm text-muted-foreground bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="font-medium text-yellow-800 mb-2">Possible causes:</p>
                <ul className="list-disc list-inside space-y-1 text-yellow-700">
                  <li>AdGuard or other ad blocker is blocking IP detection services</li>
                  <li>VPN or proxy is interfering with requests</li>
                  <li>Network connectivity issues</li>
                  <li>Firewall blocking external API calls</li>
                </ul>
                <p className="mt-2 text-yellow-800">
                  <strong>Solution:</strong> Try temporarily disabling your ad blocker or VPN, then click "Try Again".
                </p>
              </div>
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">Your Digital Address: Understanding Your Public IP</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Every device that connects to the internet is assigned an Internet Protocol (IP) address. It's a unique numerical label that serves two primary purposes: it identifies your device (or, more accurately, your network) and provides its location in the vast network of the internet. Think of it as the mailing address for your digital life. When you request data from a website, that website needs to know your IP address to send the data back to the right place.</p>
                <p>The IP address you see above is your <strong>public IP address</strong>. This is the address that your Internet Service Provider (ISP) assigns to your home or office network. All the devices on your local network (like your computer, phone, and smart TV) share this single public IP address when communicating with the outside world. This is distinct from a <strong>private IP address</strong> (e.g., 192.168.1.101), which is used only within your local network to identify individual devices. Our tool automatically detects and displays the public IP that represents you on the global internet.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">How Does This Tool Work?</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>The process of finding your IP address is elegantly simple. When you loaded this webpage, your web browser sent a request from your network to our server to fetch the page's content. This request, like all internet traffic, inherently contains the "return address"—your public IP. Our server simply reads this IP address from the incoming connection data and displays it back to you on the page. We also pass this IP to a geolocation database to retrieve the associated location and ISP information, giving you a more complete picture.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Common Reasons to Know Your IP Address</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>While it runs in the background, knowing your IP address is essential for many practical tasks:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Technical Support:</strong> When troubleshooting internet connectivity issues, a support technician from your ISP or a service provider will often ask for your public IP to diagnose problems from their end.</li>
                    <li><strong>Online Gaming:</strong> Gamers often need their IP address to host a private game server for friends to connect to directly, bypassing public matchmaking systems.</li>
                    <li><strong>Remote Access:</strong> If you need to connect to your home computer or network from a remote location (e.g., using Remote Desktop), you'll need to know your home network's public IP address to establish the connection.</li>
                    <li><strong>Security and Privacy Checks:</strong> Knowing your IP allows you to check if your VPN is working correctly. If the IP shown is different from your actual IP (and located in the region you selected in your VPN), your connection is secure. If it shows your real IP, your VPN has failed.</li>
                    <li><strong>Allow-listing for Services:</strong> Some secure online services, databases, or work environments require you to register your IP address in a "whitelist" or "allowlist" to grant you access, preventing unauthorized users from connecting.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Is my IP address permanent?</h3>
                    <p className="text-muted-foreground mt-1">For most residential internet users, the answer is no. Most ISPs assign <strong>dynamic IP addresses</strong>, which can change periodically (e.g., when you restart your router or after a set period). Businesses often pay extra for a <strong>static IP address</strong>, which does not change and is necessary for hosting reliable services like a website or mail server.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Is it a security risk for my IP address to be public?</h3>
                    <p className="text-muted-foreground mt-1">Your public IP address is, by definition, public. Every website you visit sees it. This is a normal part of how the internet works. While it does reveal your general location and ISP, it doesn't expose sensitive personal information. The main risk comes from targeted attacks, where a malicious actor could use your IP to launch a Denial-of-Service (DoS) attack. This is rare for individuals but is why using a firewall and secure network practices is important.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Why is the location shown not my exact address?</h3>
                    <p className="text-muted-foreground mt-1">IP geolocation is not precise enough to identify a specific street address. The location shown is typically the central point of your ISP's network hub for your area, which can be in a different part of your city or even a neighboring town. It correctly identifies the general region but not your home.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What's the difference between IPv4 and IPv6?</h3>
                    <p className="text-muted-foreground mt-1">IPv4 is the older, 32-bit system (e.g., 172.16.254.1) with about 4.3 billion addresses. IPv6 is the newer, 128-bit system (e.g., 2001:0db8:85a3::8a2e:0370:7334) with a virtually infinite number of addresses. As the internet grows, the world is slowly transitioning to IPv6. Your network may have both, but our tool will show the one you are currently using to connect to our server.</p>
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
            <Link to="/tools/domain-ip-tools/domain-to-ip-converter" className="p-4 border rounded-lg transition-transform hover:scale-105">
              <h3 className="font-semibold">Domain to IP Converter</h3>
              <p className="text-muted-foreground text-sm mt-1">Convert a domain name to its corresponding IP address.</p>
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

export default WhatIsMyIpAddressTool;
