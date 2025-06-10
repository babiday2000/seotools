import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';
const IpAddressLookupTool = () => {
    const [ip, setIp] = useState('');
    const [ipData, setIpData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleLookup = async () => {
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
            }
            catch {
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
                }
                catch {
                    console.log('Proxy method also failed');
                }
            }
            if (data) {
                setIpData(data);
            }
            else {
                setError('Could not retrieve IP information. The IP address may be invalid, or geolocation services are being blocked by your ad blocker.');
            }
        }
        catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError('An error occurred.');
            }
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "IP Address Lookup" }), _jsx("p", { className: "mt-3 text-lg max-w-3xl mx-auto text-muted-foreground", children: "Pinpoint the geographical location and uncover key details of any public IP address. Our tool provides instant data, including the country, city, region, ISP, and latitude/longitude. This is an essential utility for cybersecurity experts, network administrators, and marketers to trace, verify, and analyze IP origins." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "IP Geolocation Tool" }), _jsx(CardDescription, { children: "Enter an IP address to find its geographical location and network details." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { placeholder: "Enter IP address (e.g., 8.8.8.8)", value: ip, onChange: (e) => setIp(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleLookup(), className: "flex-grow text-base" }), _jsx(Button, { onClick: handleLookup, disabled: loading || !ip.trim(), className: "text-base px-6", children: loading ? 'Looking up...' : 'Lookup IP' })] }), error && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Error" }) }), _jsx(CardContent, { children: _jsx("p", { className: "text-red-500", children: error }) })] })), "            ", ipData && (_jsxs(_Fragment, { children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { children: ["IP Information for ", ip] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("strong", { children: "Country:" }), " ", ipData.country, " (", ipData.countryCode, ")"] }), _jsxs("div", { children: [_jsx("strong", { children: "City:" }), " ", ipData.city] }), _jsxs("div", { children: [_jsx("strong", { children: "Region:" }), " ", ipData.regionName, " (", ipData.region, ")"] }), _jsxs("div", { children: [_jsx("strong", { children: "ZIP Code:" }), " ", ipData.zip] }), _jsxs("div", { children: [_jsx("strong", { children: "Coordinates:" }), " ", ipData.lat, ", ", ipData.lon] }), _jsxs("div", { children: [_jsx("strong", { children: "Timezone:" }), " ", ipData.timezone] }), _jsxs("div", { className: "col-span-2", children: [_jsx("strong", { children: "ISP:" }), " ", ipData.isp] }), _jsxs("div", { className: "col-span-2", children: [_jsx("strong", { children: "Organization:" }), " ", ipData.org] }), _jsxs("div", { className: "col-span-2", children: [_jsx("strong", { children: "ASN:" }), " ", ipData.as] })] }) })] }), _jsxs("div", { className: "flex items-start gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200", children: [_jsx("div", { className: "text-amber-600 mt-0.5", children: "\u26A0\uFE0F" }), _jsx("div", { children: _jsxs("p", { children: [_jsx("strong", { children: "Accuracy Notice:" }), " IP geolocation data is approximate and may not reflect the exact location. Results can vary between different geolocation services and may show the ISP's server location rather than the actual user's location. This information should be used as a general reference only."] }) })] })] }))] }) })] }), _jsxs("div", { className: "max-w-4xl mx-auto space-y-12 text-left", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Demystifying IP Geolocation" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "IP geolocation is the science of mapping an IP address\u2014the unique numerical label assigned to devices on the internet\u2014to its real-world geographic location. It's the technology that allows services to know, with a reasonable degree of accuracy, where a user or server is physically located. This isn't magic; it's a process of data correlation. Companies that specialize in IP intelligence maintain massive, constantly updated databases that link blocks of IP addresses to the Internet Service Providers (ISPs) that own them, and in turn, to the cities, regions, and countries where those ISPs operate." }), _jsx("p", { children: "When you enter an IP address into our tool, we query one of these extensive databases. The tool retrieves key information associated with that IP, such as the country, city, postal code, and the ISP that controls it. It's important to understand that this technology identifies the location of the network hub or ISP, not the exact street address of a specific user. The accuracy can vary, being very precise in major metropolitan areas and less so in rural regions, but it provides a powerful and actionable snapshot of an IP's origin." })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "The Power of Knowing \"Where\": Key Use Cases" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "The data provided by an IP lookup is far more than just a point on a map. It's a critical piece of intelligence used across various industries." }), _jsxs("ul", { className: "list-disc list-inside space-y-3 pl-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Cybersecurity and Threat Intelligence:" }), " This is a primary use case. When a company detects a cyberattack or suspicious activity, security analysts use IP lookup to determine the origin of the threat. This helps in blocking traffic from malicious regions, reporting the activity to the relevant ISP, and understanding the global landscape of potential threats."] }), _jsxs("li", { children: [_jsx("strong", { children: "Content Personalization and Geotargeting:" }), " Websites and applications use IP geolocation to tailor the user experience. This can include displaying content in the local language, showing prices in the local currency, or promoting region-specific events. It ensures that users see the most relevant information without having to specify their location manually."] }), _jsxs("li", { children: [_jsx("strong", { children: "Fraud Detection:" }), " In e-commerce and banking, IP lookup is a vital tool for preventing fraud. If a customer places an order with a credit card billed to a New York address, but their IP address originates from a different continent, it raises a red flag that can trigger additional verification steps, protecting both the customer and the business."] }), _jsxs("li", { children: [_jsx("strong", { children: "Digital Rights Management:" }), " Streaming services and content distributors use geolocation to enforce licensing agreements. This is why a movie or TV show might be available on a platform in one country but not in another. IP lookup is how they determine which library of content to show you."] }), _jsxs("li", { children: [_jsx("strong", { children: "Network Troubleshooting:" }), " For network administrators, tracing an IP can help diagnose routing issues, identify unexpected traffic sources, and verify that network configurations are directing traffic as intended."] })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Interpreting the Results: What the Data Means" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Our tool provides several key data points. Here's what they signify:" }), _jsxs("ol", { className: "list-decimal list-inside space-y-3 pl-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Geographical Data (Country, City, Region):" }), " This tells you the physical location of the network's access point."] }), _jsxs("li", { children: [_jsx("strong", { children: "ISP (Internet Service Provider):" }), " This is the company that owns the IP address and provides internet access. It could be a major telecom company (like Comcast or AT&T) or a web hosting provider (like DigitalOcean or AWS)."] }), _jsxs("li", { children: [_jsx("strong", { children: "Organization:" }), " This field often specifies the name of the business or institution that has registered the block of IP addresses."] }), _jsxs("li", { children: [_jsx("strong", { children: "ASN (Autonomous System Number):" }), " An ASN is a unique global identifier for a network controlled by a single administrative entity. It's a more technical way to identify the network operator, often used by network engineers."] }), _jsxs("li", { children: [_jsx("strong", { children: "Latitude & Longitude:" }), " These are the geographic coordinates, useful for plotting the location on a map or integrating with other location-based services."] })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "mt-4 space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "How accurate is IP geolocation?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Accuracy varies. It's generally very accurate at the country level (over 99%) and quite accurate at the city level, especially in well-developed areas. However, it should not be relied upon to find a specific street address. The location identified is that of the ISP's server or routing center, which could be miles away from the actual user." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Can I look up my own IP address?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Yes, and we have a dedicated \"What Is My IP Address?\" tool for that. It will automatically detect and show you the public IP address your device is currently using to access the internet, along with its geolocation data." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Does using a VPN change the result?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Absolutely. That's the primary purpose of a VPN (Virtual Private Network). When you use a VPN, your internet traffic is routed through a server in a different location. An IP lookup will show the location and ISP of the VPN server, not your actual location, effectively masking your digital footprint." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "What's the difference between a public and a private IP address?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "A public IP address is a globally unique address assigned by your ISP, which you use to communicate on the internet. A private IP address is used within a local network (like your home Wi-Fi) and is not reachable from the public internet. Our tool can only look up public IP addresses, as private IPs (like 192.168.1.1 or 10.0.0.1) are not unique and have no global location data." })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Related Tools" }), _jsxs("div", { className: "mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [_jsxs(Link, { to: "/tools/domain-ip-tools/domain-to-ip-converter", className: "p-4 border rounded-lg transition-transform hover:scale-105", children: [_jsx("h3", { className: "font-semibold", children: "Domain to IP Converter" }), _jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Convert a domain name to its corresponding IP address." })] }), _jsxs(Link, { to: "/tools/domain-ip-tools/what-is-my-ip-address", className: "p-4 border rounded-lg transition-transform hover:scale-105", children: [_jsx("h3", { className: "font-semibold", children: "What Is My IP Address" }), _jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Find out your public IP address." })] }), _jsxs(Link, { to: "/tools/domain-ip-tools/dns-records-checker", className: "p-4 border rounded-lg transition-transform hover:scale-105", children: [_jsx("h3", { className: "font-semibold", children: "DNS Records Checker" }), _jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Check the DNS records for a domain name." })] })] })] })] })] }));
};
export default IpAddressLookupTool;
