import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HtaccessRedirectGeneratorTool = () => {
  const [oldUrl, setOldUrl] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [redirectType, setRedirectType] = useState('301');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!oldUrl || !newUrl) return;
    const code = `Redirect ${redirectType} ${oldUrl} ${newUrl}`;
    setGeneratedCode(code);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Input
            placeholder="Old URL (e.g., /old-page.html)"
            value={oldUrl}
            onChange={(e) => setOldUrl(e.target.value)}
          />
          <Input
            placeholder="New URL (e.g., /new-page.html)"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <Select value={redirectType} onValueChange={setRedirectType}>
            <SelectTrigger>
              <SelectValue placeholder="Redirect Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="301">Permanent (301)</SelectItem>
              <SelectItem value="302">Temporary (302)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative">
          <Textarea
            placeholder="Generated .htaccess code will appear here..."
            className="h-48 text-base"
            value={generatedCode}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!generatedCode}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleGenerate} disabled={!oldUrl || !newUrl}>
        Generate Redirect
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is an .htaccess Redirect?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>An `.htaccess` redirect is a method of forwarding a user from one URL to another using rules defined in a special configuration file on an Apache web server. The `.htaccess` file (the name stands for "hypertext access") is a powerful tool that allows you to manage your server configuration on a per-directory basis. One of its most common uses is to create URL redirects, which are essential for website maintenance, SEO, and providing a seamless user experience.</p>
            <p>When a user or a search engine bot requests a URL that has a redirect rule in the `.htaccess` file, the server automatically sends them to the new destination. This is crucial when you've moved a page, changed your site structure, or want to consolidate multiple domains. Properly implemented redirects ensure that visitors don't encounter "404 Not Found" errors and that search engines transfer the SEO value (or "link juice") from the old URL to the new one.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Factors to Consider When Creating .htaccess Redirects</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Before generating and implementing `.htaccess` redirects, it's important to consider several factors to avoid common pitfalls:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Server Type:</strong> `.htaccess` files are specific to Apache web servers. If your website is hosted on a different type of server, such as Nginx or IIS, you will need to use a different method for creating redirects.</li>
              <li><strong>Redirect Type (301 vs. 302):</strong> Choosing the correct type of redirect is critical. A `301` redirect signifies a permanent move and is the best choice for SEO in most cases. A `302` redirect is temporary and should be used when you plan to bring the old URL back online.</li>
              <li><strong>URL Structure:</strong> Be precise with your old and new URLs. A small typo can lead to a broken redirect or an infinite loop. Ensure you are using the correct relative or absolute paths.</li>
              <li><strong>Impact on SEO:</strong> Redirects are a powerful SEO tool. Use them to consolidate duplicate content, fix broken links, and guide search engines through site migrations. Misusing them can lead to a loss of rankings.</li>
              <li><strong>File Location:</strong> The `.htaccess` file must be placed in the correct directory on your server, usually the root directory of your website. Incorrect placement will render the rules ineffective.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of an .htaccess Redirect</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The syntax for a basic redirect in an `.htaccess` file is relatively simple. Here are the key components:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>The `Redirect` Directive:</strong> This is the command that tells the Apache server to perform a redirect.</li>
              <li><strong>Status Code:</strong> This is a three-digit number that indicates the type of redirect. The most common are `301` (Permanent) and `302` (Temporary).</li>
              <li><strong>Old URL Path:</strong> This is the path of the URL you want to redirect from. It should be the path relative to the root of your domain (e.g., `/old-page.html`).</li>
              <li><strong>New URL:</strong> This is the full URL of the destination page (e.g., `https://www.yourdomain.com/new-page.html`).</li>
            </ul>
            <p>A complete redirect rule looks like this: `Redirect 301 /old-page.html https://www.yourdomain.com/new-page.html`</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our .htaccess Redirect Generator</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our tool makes it easy to generate the correct syntax for your `.htaccess` redirects. Here’s a step-by-step guide:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Enter the Old URL Path:</strong> In the "Old URL" field, enter the path of the page you want to redirect. Do not include the domain name (e.g., `/about-us.php`).</li>
              <li><strong>Enter the New URL:</strong> In the "New URL" field, enter the full destination URL, including `https://` (e.g., `https://www.yourdomain.com/about`).</li>
              <li><strong>Choose the Redirect Type:</strong> Select either "Permanent (301)" or "Temporary (302)" from the dropdown menu, depending on your needs.</li>
              <li><strong>Generate the Code:</strong> Click the "Generate Redirect" button. The tool will create the correctly formatted `.htaccess` rule.</li>
              <li><strong>Implement the Redirect:</strong> Copy the generated code and paste it into your `.htaccess` file. If you don't have one, you can create a new file named `.htaccess` in your site's root directory.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Where do I find my `.htaccess` file?</h3>
              <p className="text-muted-foreground mt-1">The `.htaccess` file is typically located in the root directory of your website (often `public_html` or `www`). It's a hidden file, so you may need to enable the "Show Hidden Files" option in your file manager or FTP client to see it.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I have multiple redirects in one `.htaccess` file?</h3>
              <p className="text-muted-foreground mt-1">Yes, you can have as many redirect rules as you need in a single `.htaccess` file. Simply place each rule on a new line.</p>
            </div>
            <div>
              <h3 className="font-semibold">Will editing my `.htaccess` file break my site?</h3>
              <p className="text-muted-foreground mt-1">It's possible. A small syntax error in your `.htaccess` file can cause a "500 Internal Server Error" and make your site inaccessible. Always back up your `.htaccess` file before making any changes.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The dot at the beginning of the `.htaccess` filename is not just for decoration. In Unix-based operating systems (which power most web servers), files that start with a dot are treated as "hidden" files. This is a convention to keep configuration files from cluttering up directory listings.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HtaccessRedirectGeneratorTool;
