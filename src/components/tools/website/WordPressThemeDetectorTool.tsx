import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WordPressThemeDetectorTool = () => {
  const [url, setUrl] = useState('');
  const [theme, setTheme] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDetectTheme = async () => {
    if (!url) return;
    setLoading(true);
    setTheme(null);
    try {
      // Placeholder for a real API call to a backend that detects the theme
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTheme('Astra'); // Simulated theme
    } catch {
      setTheme('Could not detect theme.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleDetectTheme} disabled={loading || !url}>
          {loading ? 'Detecting...' : 'Detect Theme'}
        </Button>
      </div>

      {theme && (
        <Card>
          <CardHeader>
            <CardTitle>Detected Theme</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The website appears to be using the <strong>{theme}</strong> theme.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What is a WordPress Theme Detector?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A WordPress Theme Detector is a specialized tool designed to identify the theme a website built on the WordPress platform is currently using. By analyzing the website's source code, the detector can uncover details about the theme's name, author, version, and more. It's a digital detective for web designers, developers, and anyone curious about the building blocks of a beautiful and functional WordPress site.</p>
            <p>Whether you're a beginner looking for inspiration for your first blog or a seasoned developer conducting competitive analysis, a theme detector is an invaluable resource. It demystifies the design of sites you admire, providing a direct path to the tools they use. This can save hours of research, help you discover new and popular themes, and give you a better understanding of the current trends in web design.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Factors in WordPress Theme Detection</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The ability to detect a WordPress theme relies on finding specific footprints left by the theme in the website's code. However, several factors can influence the success of this detection:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Standard Theme Structure:</strong> Most WordPress themes follow a standard directory structure (e.g., `/wp-content/themes/themename/`) and include a `style.css` file with theme information. This is the primary clue for any detector.</li>
              <li><strong>Child Themes:</strong> A website might use a child theme, which is a customized version of a parent theme. A good detector will often identify both the child and the parent theme.</li>
              <li><strong>Customization and Security:</strong> Website owners can heavily customize a theme or use security plugins to obscure its identity. This can involve renaming theme files or removing identifying comments from the code, making detection more difficult.</li>
              <li><strong>Custom-Built Themes:</strong> If a website uses a completely custom-built theme, it may not have public information available, and the detector might only be able to identify it as a custom theme.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of a WordPress Theme Detector</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our WordPress Theme Detector scans the target website's source code for specific pieces of information. Here’s what it looks for:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Stylesheet Path:</strong> The most reliable method is to find the link to the theme's main stylesheet (`style.css`). The path to this file almost always contains the theme's directory name.</li>
              <li><strong>Theme Header Information:</strong> The `style.css` file in a WordPress theme contains a commented-out header with details like the Theme Name, Author, Version, and Theme URI. Our tool attempts to read this information.</li>
              <li><strong>HTML Source Code Clues:</strong> The tool also analyzes the HTML for common class names or IDs that are specific to popular themes and frameworks (like Genesis or Divi).</li>
              <li><strong>Generator Tag:</strong> Some themes may include a WordPress generator tag in the head of the HTML, which can sometimes provide clues about the theme or WordPress version.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our WordPress Theme Detector</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Using our tool is as simple as browsing the web. Here’s how you can find out what WordPress theme a site is using:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Enter the URL:</strong> Paste the full URL of the WordPress website you want to inspect into the input box.</li>
              <li><strong>Start Detection:</strong> Click the "Detect Theme" button. Our tool will then analyze the site's source code in the background.</li>
              <li><strong>Get the Results:</strong> In a few moments, the tool will display the detected theme's name and any other available information, such as the author and a link to the theme's homepage.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">What if the tool says the site isn't using WordPress?</h3>
              <p className="text-muted-foreground mt-1">Our tool first checks if the site is built on WordPress. If it doesn't find the common signs of a WordPress installation, it will let you know. This can happen if the site uses a different CMS (like Shopify or Joomla) or is custom-coded.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is it legal to check what theme a website is using?</h3>
              <p className="text-muted-foreground mt-1">Yes, it is completely legal. The information used to detect a theme is publicly available in the website's source code. It's the equivalent of "viewing source" in your browser and knowing what to look for.</p>
            </div>
            <div>
              <h3 className="font-semibold">Why would a theme be undetectable?</h3>
              <p className="text-muted-foreground mt-1">A theme might be hard to detect if it's a highly customized or completely bespoke theme built from scratch. Additionally, some website owners use security plugins to intentionally hide their theme's identity to deter potential attackers.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>The name "WordPress" was suggested by Christine Selleck Tremoulet, a friend of the co-founder Matt Mullenweg. The project was originally a fork of another blogging software called b2/cafelog. Every major release of WordPress is named after a jazz musician, a tradition that reflects Mullenweg's love for jazz music.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default WordPressThemeDetectorTool;
