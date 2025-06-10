import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';

const DisclaimerGeneratorTool = () => {
  const [websiteName, setWebsiteName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [generatedDisclaimer, setGeneratedDisclaimer] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!websiteName || !websiteUrl) {
        toast.error('Please fill in both Website Name and URL.');
        return;
    };
    const disclaimer = `
# Disclaimer for ${websiteName}

Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

## General Information
The information provided by ${websiteName} ("we," "us," or "our") on ${websiteUrl} (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.

## Limitation of Liability
UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.

## External Links Disclaimer
The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.

WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN ANY BANNER OR OTHER ADVERTISING. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.

## Professional Disclaimer
The Site cannot and does not contain legal, financial, or medical advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of professional advice.

## Affiliate Disclaimer
The Site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links.

## "Use at Your Own Risk" Disclaimer
All information in the Service is provided "as is", with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of this information, and without warranty of any kind, express or implied.

---
**IMPORTANT:** This is a generic disclaimer template. It is not a substitute for legal advice. You should consult with a legal professional to ensure this disclaimer is adequate for your specific needs and jurisdiction.
    `;
    setGeneratedDisclaimer(disclaimer.trim());
  };

  const handleCopy = () => {
    if (!generatedDisclaimer) return;
    navigator.clipboard.writeText(generatedDisclaimer);
    setCopied(true);
    toast.success('Disclaimer copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Disclaimer Generator</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Protect your website or blog by generating a clear and comprehensive disclaimer. Our tool helps you create a foundational legal notice to limit your liability and inform users about the nature of your content.
        </p>
      </div>

      <Card className="max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle>Generate Your Disclaimer</CardTitle>
          <CardDescription>Enter your website’s details to create a customized disclaimer template.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              placeholder="Your Website Name (e.g., My Awesome Blog)"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
            />
            <Input
              placeholder="Your Website URL (e.g., https://www.example.com)"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
            />
          </div>
          <div className="text-center">
            <Button onClick={handleGenerate} disabled={!websiteName || !websiteUrl}>
              <FileText className="mr-2 h-4 w-4" />
              Generate Disclaimer
            </Button>
          </div>
          {generatedDisclaimer && (
            <div className="relative mt-4">
              <Textarea
                placeholder="Generated Disclaimer will appear here..."
                className="h-96 text-sm"
                value={generatedDisclaimer}
                readOnly
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleCopy}
                title="Copy to clipboard"
              >
                {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">What is a Disclaimer and Why is it Important?</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>A disclaimer is a legal statement designed to limit a website owner's liability for the information they provide. It acts as a formal notice to visitors, clarifying the scope and limitations of the content. In short, it informs users that the information on your site is for informational purposes only and that you are not responsible for any outcomes resulting from their use of that information. A disclaimer can also be used to specify the terms of use for your website, including any warranties or guarantees that you may or may not offer.</p>
                <p>In today's digital landscape, a disclaimer serves as a critical first line of defense. It helps protect you and your business from legal claims by establishing clear expectations with your audience. Whether you operate a blog offering advice, an e-commerce store, or a simple informational site, a well-crafted disclaimer is a vital component of responsible website management. It can also help you build trust with your audience by demonstrating that you are transparent about your content and business practices.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Key Components of a Comprehensive Disclaimer</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our generator includes several standard clauses that are essential for a robust disclaimer. Understanding them is key to customizing your own. A comprehensive disclaimer should be tailored to your specific needs, but most include the following key components:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>General Information Clause:</strong> Asserts that the content is for informational purposes only and does not constitute a binding contract. This clause is important for setting the tone of your disclaimer and managing user expectations.</li>
                    <li><strong>Limitation of Liability:</strong> The core of the disclaimer, this clause explicitly states that you are not liable for any damages or losses incurred from using your site. This is a crucial component of any disclaimer, as it can help protect you from legal claims.</li>
                    <li><strong>External Links Disclaimer:</strong> If you link to other websites, this clarifies that you do not endorse and are not responsible for the content on those external sites. This is important for protecting yourself from liability for third-party content.</li>
                    <li><strong>Professional Disclaimer:</strong> This is crucial if your content touches on topics like finance, law, or health. It clarifies that your content is not professional advice and that users should consult a licensed professional. This is an important distinction to make, as it can help you avoid legal issues related to providing professional advice without a license.</li>
                    <li><strong>Affiliate Disclaimer:</strong> If you use affiliate links to earn commissions, you are legally required by the FTC and other regulatory bodies to disclose this relationship to your audience. This is an important part of being transparent with your audience and complying with the law.</li>
                    <li><strong>"Use at Your Own Risk":</strong> A concluding statement reinforcing that the user assumes all risk for acting on the information provided. This is a broad statement that can help protect you from liability for any negative outcomes that may result from the use of your website.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">How to Use and Customize Your Generated Disclaimer</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool provides a solid template, but it should be treated as a starting point. Here’s how to customize it to best fit your needs:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Generate the Base Text:</strong> Enter your website name and URL, then click "Generate." This will create a basic disclaimer that you can customize to fit your specific needs.</li>
                    <li><strong>Review and Edit:</strong> Carefully read through the entire disclaimer. Remove any sections that do not apply to your website. For instance, if you do not use affiliate links, delete the Affiliate Disclaimer section. It is important to ensure that your disclaimer is accurate and up-to-date.</li>
                    <li><strong>Add Specifics:</strong> Include any specific disclaimers relevant to your industry or content. For example, a fitness blog might add a clause advising users to consult a doctor before starting a new workout routine. This is an important step in tailoring your disclaimer to your specific needs.</li>
                    <li><strong>Consult a Professional:</strong> This is the most critical step. While our generator is a great starting point, it is not a substitute for legal advice. You should have a qualified lawyer review your disclaimer to ensure it is legally sound and provides adequate protection for your specific situation and jurisdiction. A lawyer can also help you understand the legal implications of your disclaimer and ensure that it is compliant with all applicable laws.</li>
                    <li><strong>Publish on Your Site:</strong> Create a dedicated "Disclaimer" page on your website and paste the final text there. It is also good practice to link to this page from your website's footer, alongside your Privacy Policy and Terms of Service. This will ensure that your disclaimer is easily accessible to all visitors to your site.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Is a generated disclaimer legally binding?</h3>
                    <p className="text-muted-foreground mt-1">The effectiveness of a disclaimer depends on its wording, visibility to the user, and the specific laws of your jurisdiction. While a well-written disclaimer can offer significant legal protection, it is not an ironclad guarantee against all liability. Its primary purpose is to inform users and manage their expectations, which can deter many potential legal claims. For maximum protection, legal consultation is essential.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What is the difference between a Disclaimer and a Privacy Policy?</h3>
                    <p className="text-muted-foreground mt-1">A <strong>Disclaimer</strong> seeks to limit your liability for the content you provide. A <strong>Privacy Policy</strong> is a legally mandated document that explains how you collect, use, and protect your users' personal data (e.g., names, emails, IP addresses). A disclaimer is a statement that you are not responsible for the accuracy of the information on your website, while a privacy policy is a statement that you are not responsible for the privacy of the information on your website.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Where should I place the disclaimer on my website?</h3>
                    <p className="text-muted-foreground mt-1">The best practice is to create a separate page for your disclaimer and link to it from the footer of every page on your website. This ensures it is easily accessible to all visitors. You can also include a link to your disclaimer in your website's header or sidebar.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Do I need a disclaimer for a personal blog?</h3>
                    <p className="text-muted-foreground mt-1">Yes, it is highly recommended. Even if you are not selling anything, if you provide opinions, advice, or information (e.g., product reviews, tutorials, health tips), a disclaimer helps protect you from potential claims if a reader acts on your information and experiences a negative outcome. A disclaimer can also help you build trust with your audience by demonstrating that you are transparent about your content and business practices.</p>
                </div>
                 <div>
                    <h3 className="font-semibold">What is a fun fact about disclaimers?</h3>
                    <p className="text-muted-foreground mt-1">The first known disclaimer was written by the Greek philosopher Plato in the 4th century BC. In his book, The Republic, Plato wrote, "The blame is his who chooses: God is blameless." This is a classic example of a disclaimer, as it is a statement that the author is not responsible for the actions of the reader.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default DisclaimerGeneratorTool;
