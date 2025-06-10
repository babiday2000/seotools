import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
const WhatIsMyIpAddressTool = () => {
    const [ipData, setIpData] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchIp = async () => {
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
            }
            catch {
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
                                }
                                else {
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
                            catch {
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
                }
                catch {
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
                }
                catch {
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
                }
                catch {
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
                }
                catch {
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
                }
                catch {
                    console.log('httpbin.org also failed');
                }
            }
            if (ipData) {
                setIpData(ipData);
            }
            else {
                throw new Error('All IP detection services failed');
            }
        }
        catch (error) {
            console.error("IP Fetch Error:", error);
            setIpData(null);
            toast.error('Could not fetch IP address. Ad blocker may be interfering. Please try disabling your ad blocker or VPN temporarily.');
        }
        finally {
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
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "What Is My IP Address?" }), _jsx("p", { className: "mt-3 text-lg max-w-3xl mx-auto text-muted-foreground", children: "Instantly discover your public IP address\u2014your unique identifier on the internet. This tool reveals the IP that websites, online services, and other users see when you connect with them. We also provide key geolocation details associated with your IP." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Your Public IP Information" }), _jsx(CardDescription, { children: "This is the public IP address your network is currently using to access the internet." })] }), "        ", _jsx(CardContent, { className: "space-y-4 text-center", children: loading ? (_jsx("p", { className: "text-lg font-semibold", children: "Loading your IP address..." })) : ipData ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center justify-center gap-4 bg-muted p-4 rounded-lg", children: [_jsx("p", { className: "text-2xl md:text-3xl font-bold tracking-wider", children: ipData.query }), _jsx(Button, { variant: "outline", size: "icon", onClick: handleCopy, children: _jsx(Copy, { className: "h-5 w-5" }) }), _jsx(Button, { variant: "outline", size: "icon", onClick: handleRefresh, children: _jsx(RefreshCw, { className: "h-5 w-5" }) })] }), "              ", _jsxs("div", { className: "text-sm text-muted-foreground grid grid-cols-1 sm:grid-cols-3 gap-2", children: [_jsxs("p", { children: [_jsx("strong", { children: "Location:" }), " ", ipData.city !== 'Unknown' ? `${ipData.city}, ${ipData.country}` : 'Location detection blocked'] }), _jsxs("p", { children: [_jsx("strong", { children: "ISP:" }), " ", ipData.isp !== 'Unknown' ? ipData.isp : 'ISP detection blocked'] }), _jsxs("p", { children: [_jsx("strong", { children: "Coordinates:" }), " ", ipData.lat !== 0 ? `${ipData.lat.toFixed(4)}, ${ipData.lon.toFixed(4)}` : 'Coordinates unavailable'] })] }), _jsxs("div", { className: "flex items-center justify-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-200", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsxs("p", { children: [_jsx("strong", { children: "Note:" }), " ", ipData.city === 'Unknown' ? 'Ad blocker detected - only IP address available. Disable ad blocker for full geolocation data.' : 'IP geolocation is approximate and may not reflect your exact location or ISP. Different services may show varying results.'] })] })] })) : (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-lg font-semibold text-destructive", children: "Could not retrieve your IP address." }), _jsxs("div", { className: "text-sm text-muted-foreground bg-yellow-50 p-4 rounded-lg border border-yellow-200", children: [_jsx("p", { className: "font-medium text-yellow-800 mb-2", children: "Possible causes:" }), _jsxs("ul", { className: "list-disc list-inside space-y-1 text-yellow-700", children: [_jsx("li", { children: "AdGuard or other ad blocker is blocking IP detection services" }), _jsx("li", { children: "VPN or proxy is interfering with requests" }), _jsx("li", { children: "Network connectivity issues" }), _jsx("li", { children: "Firewall blocking external API calls" })] }), _jsxs("p", { className: "mt-2 text-yellow-800", children: [_jsx("strong", { children: "Solution:" }), " Try temporarily disabling your ad blocker or VPN, then click \"Try Again\"."] })] }), _jsxs(Button, { variant: "outline", onClick: handleRefresh, children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Try Again"] })] })) })] }), _jsxs("div", { className: "max-w-4xl mx-auto space-y-12 text-left", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Your Digital Address: Understanding Your Public IP" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Every device that connects to the internet is assigned an Internet Protocol (IP) address. It's a unique numerical label that serves two primary purposes: it identifies your device (or, more accurately, your network) and provides its location in the vast network of the internet. Think of it as the mailing address for your digital life. When you request data from a website, that website needs to know your IP address to send the data back to the right place." }), _jsxs("p", { children: ["The IP address you see above is your ", _jsx("strong", { children: "public IP address" }), ". This is the address that your Internet Service Provider (ISP) assigns to your home or office network. All the devices on your local network (like your computer, phone, and smart TV) share this single public IP address when communicating with the outside world. This is distinct from a ", _jsx("strong", { children: "private IP address" }), " (e.g., 192.168.1.101), which is used only within your local network to identify individual devices. Our tool automatically detects and displays the public IP that represents you on the global internet."] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "How Does This Tool Work?" }), _jsx("div", { className: "mt-4 space-y-4 text-muted-foreground", children: _jsx("p", { children: "The process of finding your IP address is elegantly simple. When you loaded this webpage, your web browser sent a request from your network to our server to fetch the page's content. This request, like all internet traffic, inherently contains the \"return address\"\u2014your public IP. Our server simply reads this IP address from the incoming connection data and displays it back to you on the page. We also pass this IP to a geolocation database to retrieve the associated location and ISP information, giving you a more complete picture." }) })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Common Reasons to Know Your IP Address" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "While it runs in the background, knowing your IP address is essential for many practical tasks:" }), _jsxs("ul", { className: "list-disc list-inside space-y-3 pl-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Technical Support:" }), " When troubleshooting internet connectivity issues, a support technician from your ISP or a service provider will often ask for your public IP to diagnose problems from their end."] }), _jsxs("li", { children: [_jsx("strong", { children: "Online Gaming:" }), " Gamers often need their IP address to host a private game server for friends to connect to directly, bypassing public matchmaking systems."] }), _jsxs("li", { children: [_jsx("strong", { children: "Remote Access:" }), " If you need to connect to your home computer or network from a remote location (e.g., using Remote Desktop), you'll need to know your home network's public IP address to establish the connection."] }), _jsxs("li", { children: [_jsx("strong", { children: "Security and Privacy Checks:" }), " Knowing your IP allows you to check if your VPN is working correctly. If the IP shown is different from your actual IP (and located in the region you selected in your VPN), your connection is secure. If it shows your real IP, your VPN has failed."] }), _jsxs("li", { children: [_jsx("strong", { children: "Allow-listing for Services:" }), " Some secure online services, databases, or work environments require you to register your IP address in a \"whitelist\" or \"allowlist\" to grant you access, preventing unauthorized users from connecting."] })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "mt-4 space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is my IP address permanent?" }), _jsxs("p", { className: "text-muted-foreground mt-1", children: ["For most residential internet users, the answer is no. Most ISPs assign ", _jsx("strong", { children: "dynamic IP addresses" }), ", which can change periodically (e.g., when you restart your router or after a set period). Businesses often pay extra for a ", _jsx("strong", { children: "static IP address" }), ", which does not change and is necessary for hosting reliable services like a website or mail server."] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is it a security risk for my IP address to be public?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Your public IP address is, by definition, public. Every website you visit sees it. This is a normal part of how the internet works. While it does reveal your general location and ISP, it doesn't expose sensitive personal information. The main risk comes from targeted attacks, where a malicious actor could use your IP to launch a Denial-of-Service (DoS) attack. This is rare for individuals but is why using a firewall and secure network practices is important." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Why is the location shown not my exact address?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "IP geolocation is not precise enough to identify a specific street address. The location shown is typically the central point of your ISP's network hub for your area, which can be in a different part of your city or even a neighboring town. It correctly identifies the general region but not your home." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "What's the difference between IPv4 and IPv6?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "IPv4 is the older, 32-bit system (e.g., 172.16.254.1) with about 4.3 billion addresses. IPv6 is the newer, 128-bit system (e.g., 2001:0db8:85a3::8a2e:0370:7334) with a virtually infinite number of addresses. As the internet grows, the world is slowly transitioning to IPv6. Your network may have both, but our tool will show the one you are currently using to connect to our server." })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Related Tools" }), _jsxs("div", { className: "mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [_jsxs(Link, { to: "/tools/domain-ip-tools/ip-address-lookup", className: "p-4 border rounded-lg transition-transform hover:scale-105", children: [_jsx("h3", { className: "font-semibold", children: "IP Address Lookup" }), _jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Look up the location and other information for an IP address." })] }), _jsxs(Link, { to: "/tools/domain-ip-tools/domain-to-ip-converter", className: "p-4 border rounded-lg transition-transform hover:scale-105", children: [_jsx("h3", { className: "font-semibold", children: "Domain to IP Converter" }), _jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Convert a domain name to its corresponding IP address." })] }), _jsxs(Link, { to: "/tools/domain-ip-tools/dns-records-checker", className: "p-4 border rounded-lg transition-transform hover:scale-105", children: [_jsx("h3", { className: "font-semibold", children: "DNS Records Checker" }), _jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Check the DNS records for a domain name." })] })] })] })] })] }));
};
export default WhatIsMyIpAddressTool;
