import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck, Plus, Trash, Code2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';

interface FaqItem {
  question: string;
  answer: string;
}

const FaqSchemaGeneratorTool = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([{ question: '', answer: '' }]);
  const [generatedSchema, setGeneratedSchema] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const handleRemoveFaq = (index: number) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs);
  };

  const handleFaqChange = (index: number, field: keyof FaqItem, value: string) => {
    const newFaqs = faqs.map((faq, i) => {
      if (i === index) {
        return { ...faq, [field]: value };
      }
      return faq;
    });
    setFaqs(newFaqs);
  };

  const handleGenerate = () => {
    if (faqs.some(f => !f.question.trim() || !f.answer.trim())) {
        toast.error('Please fill out all question and answer fields.');
        return;
    }
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    setGeneratedSchema(JSON.stringify(schema, null, 2));
    toast.success('FAQ Schema generated successfully!');
  };

  const handleCopy = () => {
    if (!generatedSchema) return;
    const script = `<script type="application/ld+json">\n${generatedSchema}\n</script>`;
    navigator.clipboard.writeText(script);
    setCopied(true);
    toast.success('Schema script copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">FAQ Page Schema Generator</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Easily create JSON-LD structured data for your FAQ pages. This tool helps you generate the necessary schema markup to make your content eligible for rich results in Google Search, thereby boosting your visibility and click-through rate.
        </p>
      </div>

      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle>Generate FAQ Schema</CardTitle>
          <CardDescription>Add your question-and-answer pairs below, then generate the schema code to add to your website.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2 rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">FAQ #{index + 1}</h3>
                    {faqs.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveFaq(index)} title="Remove FAQ">
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                    )}
                  </div>
                  <Input
                    placeholder="Enter the full question here"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                  />
                  <Textarea
                    placeholder="Enter the full answer here"
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                  />
                </div>
              ))}
              <Button variant="outline" onClick={handleAddFaq}>
                <Plus className="mr-2 h-4 w-4" /> Add Another FAQ
              </Button>
            </div>
            <div className="space-y-4">
                <div className="relative">
                  <Textarea
                    placeholder="Generated FAQ Schema (JSON-LD) will appear here..."
                    className="h-full min-h-[400px] text-xs font-mono bg-muted"
                    value={generatedSchema ? `<script type="application/ld+json">\n${generatedSchema}\n</script>` : ""}
                    readOnly
                  />
                  {generatedSchema && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={handleCopy}
                      title="Copy script tag"
                    >
                      {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
                    </Button>
                  )}
                </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <Button onClick={handleGenerate} size="lg">
              <Code2 className="mr-2 h-5 w-5" />
              Generate Schema
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight">What is FAQ Schema and Why is it Important?</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>FAQ schema is a type of structured data that you can add to your website to help search engines understand your content better. It is used to mark up a list of questions and answers on a page, which can then be displayed as a rich result in Google Search.</p>
                <p>By using FAQ schema, you can increase your visibility in search results, drive more traffic to your website, and improve your click-through rate. It is a simple and effective way to enhance your SEO and provide a better user experience for your visitors.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Key Components of FAQ Schema</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>FAQ schema is made up of a few key components that you need to include in your structured data. These include:</p>
                <ul className="list-disc list-inside space-y-3 pl-4">
                    <li><strong>Question:</strong> The full text of the question.</li>
                    <li><strong>Answer:</strong> The full text of the answer.</li>
                    <li><strong>Accepted Answer:</strong> A property that contains the answer to the question.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">How to Use and Customize Your Generated FAQ Schema</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Our tool makes it easy to generate FAQ schema, but it is important to customize it to your specific needs. Here’s how:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Generate the Base Text:</strong> Enter your question-and-answer pairs in the text area above, then click "Generate."</li>
                    <li><strong>Review and Edit:</strong> Carefully review the generated schema to ensure that it accurately reflects your content.</li>
                    <li><strong>Add to Your Website:</strong> Copy the generated schema and paste it into the <code>{'<head>'}</code> section of your HTML document.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Is FAQ schema a ranking factor?</h3>
                    <p className="text-muted-foreground mt-1">While FAQ schema is not a direct ranking factor, it can help you increase your visibility in search results and improve your click-through rate, which can indirectly lead to higher rankings.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can I use FAQ schema on any page?</h3>
                    <p className="text-muted-foreground mt-1">Yes, you can use FAQ schema on any page that contains a list of questions and answers. However, it is most effective on pages that are dedicated to a specific topic and provide in-depth answers to common questions.</p>
                </div>
                <div>
                    <h3 className="font-semibold">What is a fun fact about FAQ schema?</h3>
                    <p className="text-muted-foreground mt-1">The first version of schema.org was launched in 2011 by Google, Microsoft, and Yahoo. It was created to provide a common vocabulary for structured data that could be used by all search engines.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default FaqSchemaGeneratorTool;
