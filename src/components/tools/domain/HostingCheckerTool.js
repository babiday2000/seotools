import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';
const HostingCheckerTool = () => {
    const [inputValue, setInputValue] = useState('');
    const [hostingInfo, setHostingInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
            const ipAddress = dnsData.Answer.find((ans) => ans.type === 1)?.data;
            if (!ipAddress) {
                throw new Error('No A record found for this domain.');
            }
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
            }
            catch {
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
                }
                catch {
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
                }
                catch {
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
                }
                catch {
                    console.log('All proxy methods failed');
                }
            }
            // Step 3: Process the data
            if (ipData && (ipData.status === 'success' || ipData.status === 'limited')) {
                const hostingDetails = {
                    domain: domainName,
                    ipAddress: ipAddress,
                    hostingProvider: ipData.isp || ipData.org || 'Unknown Provider',
                    organization: ipData.org,
                    country: ipData.country,
                    city: ipData.city,
                    region: ipData.regionName,
                };
                setHostingInfo(hostingDetails);
            }
            else {
                throw new Error('Could not determine hosting provider. This may be due to ad blocker interference or network restrictions. Please try disabling your ad blocker temporarily.');
            }
        }
        catch (err) {
            console.error('Hosting check error:', err);
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError('An unexpected error occurred. This may be due to ad blocker or network restrictions. Please try disabling your ad blocker and try again.');
            }
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "text-center px-4", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold tracking-tight", children: "Who is Hosting This Website?" }), _jsx("p", { className: "mt-3 text-lg max-w-3xl mx-auto text-muted-foreground", children: "Ever wondered who powers a specific website? Our Hosting Checker tool pulls back the curtain, instantly revealing the web hosting provider for any domain. This simple-to-use tool is invaluable for competitive analysis, business development, and satisfying your own curiosity about the web's infrastructure." })] }), _jsxs(Card, { className: "max-w-4xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Hosting Checker" }), _jsx(CardDescription, { children: "Enter a domain name to identify its hosting provider." })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: ["            ", _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx(Input, { type: "text", placeholder: "Enter domain name (e.g., example.com)", value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleCheck(), className: "flex-grow text-base" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { onClick: () => setInputValue('google.com'), variant: "outline", className: "text-base px-4", children: "Try Example" }), _jsx(Button, { onClick: handleCheck, disabled: loading || !inputValue.trim(), className: "text-base px-6", children: loading ? 'Checking...' : 'Check Hosting' })] })] }), "            ", error && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Unable to Check Hosting" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [_jsx("p", { className: "text-red-600 font-medium", children: error }), _jsxs("div", { className: "text-sm text-muted-foreground bg-yellow-50 p-4 rounded-lg border border-yellow-200", children: [_jsx("p", { className: "font-medium text-yellow-800 mb-2", children: "Possible causes:" }), _jsxs("ul", { className: "list-disc list-inside space-y-1 text-yellow-700", children: [_jsx("li", { children: "AdGuard or other ad blocker is blocking IP lookup services" }), _jsx("li", { children: "The domain doesn't exist or has no DNS records" }), _jsx("li", { children: "Network firewall is blocking external API calls" }), _jsx("li", { children: "VPN or proxy interference" })] }), _jsxs("p", { className: "mt-2 text-yellow-800", children: [_jsx("strong", { children: "Solution:" }), " Try temporarily disabling your ad blocker or VPN, then click \"Check Hosting\" again."] })] })] }) })] })), hostingInfo && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { children: ["Hosting Information for ", hostingInfo.domain] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: "Domain:" }), _jsx("p", { children: hostingInfo.domain })] }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: "IP Address:" }), _jsx("p", { children: hostingInfo.ipAddress })] }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: "Hosting Provider:" }), _jsx("p", { className: "text-lg font-semibold text-blue-600", children: hostingInfo.hostingProvider })] }), hostingInfo.organization && hostingInfo.organization !== hostingInfo.hostingProvider && (_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: "Organization:" }), _jsx("p", { children: hostingInfo.organization })] })), hostingInfo.country && (_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: "Country:" }), _jsx("p", { children: hostingInfo.country })] })), hostingInfo.city && (_jsxs("div", { children: [_jsx("p", { className: "font-semibold", children: "Location:" }), _jsxs("p", { children: [hostingInfo.city, hostingInfo.region ? `, ${hostingInfo.region}` : ''] })] }))] }) })] }))] }) })] }), _jsxs("div", { className: "max-w-4xl mx-auto space-y-12 text-left", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "The Engine Room of the Internet: Understanding Web Hosting" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Every website you visit, from massive social media platforms to small personal blogs, lives on a specialized computer called a server. A web hosting provider is a company that owns and manages these servers, renting out space and resources to individuals and organizations to make their websites accessible on the internet. When you buy a hosting plan, you're essentially leasing a plot of digital land where your website's files, images, and databases are stored." }), _jsx("p", { children: "The hosting provider is responsible for maintaining the server's hardware, ensuring it has a fast and reliable connection to the internet, and providing the necessary software for the website to run. The choice of a hosting provider is one of the most critical decisions a website owner makes, as it directly impacts the site's speed, reliability (uptime), security, and ability to handle traffic. Our Hosting Checker helps you identify which provider a website has entrusted with this crucial task." })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "How We Uncover the Host: A Two-Step Process" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Identifying a website's host isn't as simple as looking at a single public record. Our tool uses a reliable two-step method to trace the information back to its source:" }), _jsxs("ol", { className: "list-decimal list-inside space-y-2 pl-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "DNS Lookup:" }), " First, we resolve the domain name you provide to its IP address. As explained in our Domain to IP Converter tool, this involves querying the Domain Name System (DNS) to find the 'A' record, which points to the specific server IP where the website is located."] }), _jsxs("li", { children: [_jsx("strong", { children: "IP Address Geolocation and ISP Lookup:" }), " Once we have the IP address, we query a comprehensive IP intelligence database. This database contains information about which organization or Internet Service Provider (ISP) owns and operates that specific block of IP addresses. In most cases, the owner of the IP address is the hosting company itself. The tool then displays the name of this ISP, which is the hosting provider."] })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Strategic Insights from Hosting Information" }), _jsxs("div", { className: "mt-4 space-y-4 text-muted-foreground", children: [_jsx("p", { children: "Knowing who hosts a website can provide significant strategic advantages:" }), _jsxs("ul", { className: "list-disc list-inside space-y-3 pl-4", children: [_jsxs("li", { children: [_jsx("strong", { children: "Competitive Analysis:" }), " Are your top competitors' websites faster or more reliable than yours? Checking their hosting provider can be the first step in understanding their infrastructure. If you see a trend of successful sites in your niche using a particular host, it might be worth investigating that provider for your own projects."] }), _jsxs("li", { children: [_jsx("strong", { children: "Business and Sales Leads:" }), " For marketing agencies, developers, or hosting companies, this tool can be a lead generation machine. If you find a website that is slow or frequently down, you can identify their current host and approach them with a proposal to migrate to a better service."] }), _jsxs("li", { children: [_jsx("strong", { children: "Security Research:" }), " When investigating a phishing site or a source of spam, identifying the hosting provider is a critical step. It allows security professionals to submit an abuse report to the correct company, which can lead to the malicious site being taken down."] }), _jsxs("li", { children: [_jsx("strong", { children: "Migration and Collaboration:" }), " If you're taking over the management of a client's website, this tool provides a quick way to identify the current host so you know who to contact for access and migration details."] })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Frequently Asked Questions (FAQ)" }), _jsxs("div", { className: "mt-4 space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "What if the result shows a company like Cloudflare, Google Cloud, or AWS?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "This is a very common and important scenario. Companies like Cloudflare are not traditional web hosts but are Content Delivery Networks (CDNs) or cloud infrastructure providers. If you see Cloudflare, it means the website is using their service to cache content and protect against attacks; the actual origin server is hidden behind Cloudflare. If you see AWS (Amazon Web Services) or Google Cloud, it means the website is hosted on their massive cloud platforms, which is common for larger applications and businesses that manage their own server infrastructure." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Is the result always 100% accurate?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Our tool is highly accurate as it relies on fundamental internet records. However, the name of the ISP might sometimes be the parent company of a smaller hosting brand. For example, a site might be hosted with \"Bluehost,\" but the ISP might show as \"Endurance International Group,\" its parent company. It will always point you in the right direction." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Can a website have more than one host?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "A website's core files typically reside with a single hosting provider. However, a site can use different services for different functions. For example, its main website could be on a host like SiteGround, while its email is handled by Google Workspace and its images are served from an Amazon S3 bucket. Our tool identifies the host of the main website (the server pointed to by the primary A record)." })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: "Why would I want to know who hosts a website?" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Curiosity is a great reason! But professionally, it's about making informed decisions. If you're choosing a host, seeing what successful sites use is a form of recommendation. If you're a developer, it helps you understand a site's technical stack. If you're in marketing, it helps you understand a competitor's investment in their infrastructure." })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Related Tools" }), _jsxs("div", { className: "mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [_jsxs(Link, { to: "/tools/domain-ip-tools/domain-age-checker", className: "p-4 border rounded-lg transition-transform hover:scale-105", children: [_jsx("h3", { className: "font-semibold", children: "Domain Age Checker" }), _jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Check the age of a domain name." })] }), _jsxs(Link, { to: "/tools/domain-ip-tools/whois-domain-lookup", className: "p-4 border rounded-lg transition-transform hover:scale-105", children: [_jsx("h3", { className: "font-semibold", children: "Whois Domain Lookup" }), _jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Look up the registration information for a domain name." })] }), _jsxs(Link, { to: "/tools/domain-ip-tools/dns-records-checker", className: "p-4 border rounded-lg transition-transform hover:scale-105", children: [_jsx("h3", { className: "font-semibold", children: "DNS Records Checker" }), _jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Check the DNS records for a domain name." })] })] })] })] })] }));
};
export default HostingCheckerTool;
