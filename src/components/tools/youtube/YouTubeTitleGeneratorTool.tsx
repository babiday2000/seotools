import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Copy, Loader2, Lightbulb, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const YouTubeTitleGeneratorTool = () => {
  const [keyword, setKeyword] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const titleCase = (s: string) => s.toLowerCase().split(' ').map(word => capitalize(word)).join(' ');

  const generateTitles = (baseKeyword: string): string[] => {
    if (!baseKeyword.trim()) {
      toast.error('Please enter a keyword to generate titles.');
      return [];
    }

    const kw = titleCase(baseKeyword);
    const kwLower = baseKeyword.toLowerCase();
    const year = new Date().getFullYear();

    const patterns = {
      howTo: [
        `How to ${kw}: The Ultimate Guide`,
        `How to Master ${kw} in ${Math.floor(Math.random() * 10) + 5} Minutes`,
        `The Right Way to Do ${kw} (You're Probably Doing It Wrong)`,
      ],
      listicle: [
        `${Math.floor(Math.random() * 5) + 3} ${kw} Mistakes to Avoid`,
        `${Math.floor(Math.random() * 8) + 5} Must-Know Tips for ${kw}`,
        `The Top ${Math.floor(Math.random() * 3) + 3} Tools for ${kw} in ${year}`,
      ],
      question: [
        `Is ${kw} Still Worth It in ${year}?`,
        `What They Don't Tell You About ${kw}`,
        `Are You Making These ${kw} Errors?`,
      ],
      curiosity: [
        `The #1 Secret to ${kw}`,
        `This Simple Trick Will Change Your ${kw} Forever`,
        `Why Your ${kw} Strategy Is Failing (And How to Fix It)`,
      ],
      negative: [
        `Don't Try ${kw} Until You Watch This`,
        `The Biggest Lie About ${kw}`,
        `Stop Wasting Time on ${kwLower} - Do This Instead`,
      ],
    };

    const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => 0.5 - Math.random());
    
    let allTitles: string[] = [];
    Object.values(patterns).forEach(p => {
        allTitles = [...allTitles, ...shuffle(p).slice(0, 2)];
    });

    return shuffle(allTitles);
  };

  const handleGenerate = () => {
    setIsLoading(true);
    const newTitles = generateTitles(keyword);
    setTitles(newTitles);
    setIsLoading(false);
    if (newTitles.length > 0) {
      toast.success('Catchy titles generated!');
    }
  };

  const handleCopyToClipboard = (title: string) => {
    navigator.clipboard.writeText(title);
    toast.success('Title copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Title Generator</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Generate dozens of catchy, clickable, and SEO-friendly title ideas for your videos in seconds. Overcome writer's block and create headlines that demand attention, boost click-through rates, and help your content get discovered by the right audience.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Title Idea Engine</CardTitle>
          <CardDescription>Enter your main keyword or topic to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="e.g., 'sourdough baking', 'landscape photography'"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                className="flex-grow"
              />
              <Button onClick={handleGenerate} disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Titles'
                )}
              </Button>
            </div>

            {titles.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Generated Titles ({titles.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {titles.map((title, index) => (
                    <Card key={index} className="flex items-center justify-between p-4">
                      <p className="flex-grow pr-4 text-sm">{title}</p>
                      <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(title)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lightbulb className="h-6 w-6 text-primary" /> Why Your Title is Crucial</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Your video title is the single most important piece of text associated with your video. It's the primary factor, along with your thumbnail, that determines whether a viewer will click to watch.</p>
            <p>A great title makes a promise to the viewer, creates curiosity, and clearly communicates the video's value. It's your first and best chance to grab someone's attention in a crowded feed. A powerful title can be the difference between a video that gets 100 views and one that gets 100,000.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-6 w-6 text-primary" /> Common Title Mistakes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Many creators fail to maximize their potential due to weak titles. Common mistakes include:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Boring & Vague:</strong> Titles like "My Vlog Day 5" or "New Video" give no reason to click. They don't communicate value or topic.</li>
              <li><strong>Too Long:</strong> Titles get cut off after ~70 characters on most devices. The most important information must be at the beginning.</li>
              <li><strong>No Keywords:</strong> Failing to include search terms makes you invisible to the algorithm and to users searching for your topic.</li>
              <li><strong>Clickbait:</strong> Over-promising and under-delivering hurts your channel's reputation and watch time, signaling to YouTube that your content is low quality.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-6 w-6 text-primary" /> Best Practices for High-Performing Titles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-3 text-muted-foreground">
            <li><strong>Include Your Main Keyword:</strong> Place your most important keyword(s) naturally within the title, preferably near the beginning. This helps with both search ranking and user comprehension.</li>
            <li><strong>Use Numbers & Lists:</strong> Titles like "7 Ways to..." or "Top 5..." are highly clickable because they set clear expectations and promise a structured, easy-to-digest format.</li>
            <li><strong>Create Curiosity (Without Clickbaiting):</strong> Ask a question ('Are you making this mistake?'), hint at a secret, or use powerful words ('Ultimate', 'Definitive', 'Simple') to make viewers want to know the answer.</li>
            <li><strong>Keep it Concise:</strong> Aim for 60-70 characters to ensure your full title is visible in search results and on mobile devices. Front-load the most impactful words.</li>
            <li><strong>Highlight the Value:</strong> Clearly state what the viewer will learn or gain from watching. Use words like "Guide," "Tutorial," "Review," "Tips," or "Tricks" to signal the video's purpose.</li>
            <li><strong>A/B Test Your Ideas:</strong> Don't just settle on the first title you think of. Use this generator to brainstorm multiple options and pick the one that feels most compelling. You can even change titles on older videos to see if it improves performance.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeTitleGeneratorTool;
