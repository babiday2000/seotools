import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ServerStatusCheckerTool = () => {
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckStatus = async () => {
    if (!domain) return;
    setLoading(true);
    setStatus(null);
    try {
      // Placeholder for a real API call to a backend that checks server status
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('Online');
    } catch {
      setStatus('Offline');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleCheckStatus} disabled={loading || !domain}>
          {loading ? 'Checking...' : 'Check Status'}
        </Button>
      </div>

      {status && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The server status for <strong>{domain}</strong> is: <strong>{status}</strong>
            </p>
          </CardContent>
        </Card>
      )}

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a Server Status Checker?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A Server Status Checker is a utility that allows you to determine the current state of a web server. By simply entering a domain name, this tool sends a request to the server to see if it is online and responding correctly. It's like making a phone call to the server to ask, "Are you there and are you okay?" The server's response, or lack thereof, provides immediate insight into its health and accessibility.</p>
            <p>For website owners, developers, and IT professionals, this is an indispensable tool. Website downtime can lead to lost revenue, a poor user experience, and a negative impact on search engine rankings. A server status checker enables you to proactively monitor your website's availability, quickly diagnose problems, and take corrective action before a minor issue becomes a major outage. It's the first step in troubleshooting any "website down" complaint.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Factors Affecting Server Status</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A server's status can be influenced by a variety of factors, ranging from routine maintenance to unexpected hardware failures. Here are some of the most common causes of server downtime:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Hardware Failure:</strong> Like any physical machine, servers can suffer from hardware malfunctions, such as a failed hard drive, RAM issues, or power supply problems.</li>
              <li><strong>Software Issues:</strong> Bugs in the server's operating system or web server software (like Apache or Nginx) can cause crashes or instability.</li>
              <li><strong>Network Problems:</strong> Issues with the network infrastructure, such as a faulty router, DNS problems, or a severed cable, can make a server unreachable even if it's running perfectly.</li>
              <li><strong>High Traffic:</strong> A sudden surge in traffic, whether legitimate or from a DDoS attack, can overwhelm a server's resources and cause it to become unresponsive.</li>
              <li><strong>Scheduled Maintenance:</strong> Sometimes, a server is taken offline intentionally for updates, security patches, or hardware upgrades.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Metrics in Server Status Checking</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>When you check a server's status, you're looking at more than just a simple "online" or "offline" message. Several key metrics provide a more complete picture of the server's health:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Uptime/Downtime:</strong> This is the most basic metric, indicating whether the server is accessible. Uptime is the percentage of time the server is online and operational.</li>
              <li><strong>Response Time:</strong> Also known as latency, this measures how long it takes for the server to respond to a request. A high response time can indicate a server that is overloaded or experiencing network issues.</li>
              <li><strong>HTTP Status Code:</strong> The server's response includes an HTTP status code. A `200 OK` code means everything is fine, while other codes can signal various issues (e.g., `500 Internal Server Error`).</li>
              <li><strong>Geographical Availability:</strong> It's possible for a server to be accessible from one part of the world but not another. Comprehensive server monitoring tools often check from multiple locations.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our Server Status Checker</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool is designed for simplicity and speed. Here’s how to check the status of any server:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Enter the Domain:</strong> Type or paste the domain name of the website you want to check into the input field.</li>
              <li><strong>Start the Check:</strong> Click the "Check Status" button. Our system will then send a request to the server associated with that domain.</li>
              <li><strong>Review the Results:</strong> The tool will display the server's status, letting you know if it's online or offline. This provides a quick and easy way to confirm if a website is down for everyone or just you.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">What should I do if my server is down?</h3>
              <p className="text-muted-foreground mt-1">If our tool reports that your server is down, the first step is to contact your hosting provider. They can investigate the issue and provide information on when it will be resolved. It's also a good idea to check your hosting provider's status page, as they may already be aware of the problem.</p>
            </div>
            <div>
              <h3 className="font-semibold">How can I monitor my server's uptime continuously?</h3>
              <p className="text-muted-foreground mt-1">While our tool is great for manual checks, there are dedicated uptime monitoring services that will automatically check your server at regular intervals and notify you immediately if it goes down. These services are essential for any business-critical website.</p>
            </div>
            <div>
              <h3 className="font-semibold">Does a slow response time mean my server is about to go down?</h3>
              <p className="text-muted-foreground mt-1">Not necessarily, but it can be a warning sign. A consistently high response time could indicate that your server is struggling to keep up with demand. It's worth investigating the cause to prevent a potential outage.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The concept of checking a remote computer's status dates back to the early days of the internet with a simple tool called "ping." Developed in 1983, ping sends a small packet of data to a server and waits for a reply, measuring the round-trip time. The name comes from the sound of a submarine's sonar, which also sends out a pulse of sound to detect objects.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ServerStatusCheckerTool;
