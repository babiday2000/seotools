import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Wand2, Loader2, X, HelpCircle, CheckCircle } from 'lucide-react';
import { toast } from "sonner";
import { relatedKeywords, tagModifiers } from '@/lib/youtube-keyword-data';

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const YouTubeTagGeneratorTool = () => {
  const [keyword, setKeyword] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateTags = (baseKeyword: string) => {
    if (!baseKeyword.trim()) {
      toast.error('Please enter a keyword to generate tags.');
      return [];
    }

    const sanitizedKeyword = baseKeyword.toLowerCase().trim();
    const generated = new Set<string>();

    // 1. Add the core keyword itself
    generated.add(sanitizedKeyword);

    // 2. Find related keywords from our knowledge base
    const related = relatedKeywords[sanitizedKeyword] || [];
    if (related.length > 0) {
      related.forEach(tag => generated.add(tag));
    } else {
      // Fallback for keywords not in our DB
      Object.keys(relatedKeywords).forEach(key => {
        if (sanitizedKeyword.includes(key)) {
          relatedKeywords[key].forEach(tag => generated.add(tag));
        }
      });
    }

    // 3. Generate variations using modifiers and formats
    const allRelated = [sanitizedKeyword, ...related];
    
    tagModifiers.formats.forEach(format => {
      if (format.includes('{prefix}')) {
        shuffleArray(tagModifiers.prefixes).slice(0, 2).forEach(prefix => {
          generated.add(format.replace('{prefix}', prefix).replace('{kw}', sanitizedKeyword));
        });
      }
      if (format.includes('{suffix}')) {
        shuffleArray(tagModifiers.suffixes).slice(0, 3).forEach(suffix => {
          generated.add(format.replace('{suffix}', suffix).replace('{kw}', sanitizedKeyword));
        });
      }
      if (format.includes('{related}') && allRelated.length > 1) {
         const randomRelated = shuffleArray(allRelated.filter(k => k !== sanitizedKeyword))[0];
         if(randomRelated) {
            generated.add(format.replace('{kw}', sanitizedKeyword).replace('{related}', randomRelated));
         }
      }
    });

    // 4. Add channel/brand specific tags (example)
    generated.add('seotooler');

    return shuffleArray(Array.from(generated)).slice(0, 30);
  };

  const handleGenerate = () => {
    setIsLoading(true);
    setTags([]);
    
    // No more artificial delay
    const newTags = generateTags(keyword);
    setTags(newTags);
    setIsLoading(false);
    
    if (newTags.length > 0) {
      toast.success('Tags generated successfully!');
    }
  };

  const handleCopy = async (tag: string) => {
    try {
      await navigator.clipboard.writeText(tag);
      toast.success("Copied!", {
        description: `Tag "${tag}" copied to clipboard.`,
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
      toast.error("Copy failed", {
        description: "Could not copy to clipboard. Please check browser permissions.",
      });
    }
  };
  
  const handleCopyAll = async () => {
    if (tags.length === 0) return;
    const allTags = tags.join(', ');
    try {
      await navigator.clipboard.writeText(allTags);
      toast.success("All Copied!", {
        description: "All generated tags copied to clipboard.",
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
      toast.error("Copy failed", {
        description: "Could not copy to clipboard. Please check browser permissions.",
      });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Tag Generator</h1>
        <p className="mt-3 text-lg max-w-3xl mx-auto text-muted-foreground">
          Supercharge your YouTube SEO with our intelligent Tag Generator. Stop the guesswork and instantly create dozens of highly relevant, performance-driven tags based on a single keyword. Our tool analyzes your topic to suggest a powerful mix of long-tail keywords, semantic variations, and related terms, maximizing your video's discoverability. Reach a wider audience, rank higher in search results, and let the YouTube algorithm know exactly who to show your content to.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Tag Generator Tool</CardTitle>
          <CardDescription>Enter a primary keyword or topic to generate a list of suggested tags.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter a primary keyword (e.g., 'react')"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                className="flex-grow text-base"
              />
              <Button onClick={handleGenerate} disabled={isLoading || !keyword.trim()} className="text-base px-6">
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Wand2 className="h-4 w-4 mr-2" />}
                {isLoading ? 'Generating...' : 'Generate Tags'}
              </Button>
            </div>
            
            {tags.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Generated Tags ({tags.length})</CardTitle>
                    <Button variant="outline" size="sm" onClick={handleCopyAll}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-base font-medium p-2 group">
                        <span className="cursor-pointer" onClick={() => handleCopy(tag)}>{tag}</span>
                        <button title="Remove tag" onClick={() => removeTag(tag)} className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5 opacity-50 group-hover:opacity-100 transition-opacity">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2"><Wand2 className="h-7 w-7 text-primary" />The Magic of Automated Tag Generation</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>A YouTube Tag Generator is a creator's secret weapon for mastering video SEO. At its core, the tool automates the complex and time-consuming process of keyword research for your video tags. Video tags are hidden keywords that you add to your video upload, and they serve as a critical signal to the YouTube algorithm. They provide essential context about your video's topic, style, and intended audience, directly influencing who sees your content.</p>
                <p>Instead of spending hours brainstorming every possible keyword variation, our generator does the heavy lifting. By providing a single 'seed' keyword that represents your video's main topic, the tool intelligently expands upon it. It delves into a vast database of related terms, common search queries, and effective keyword patterns to produce a comprehensive list of suggested tags. This ensures you cover all your bases, from broad category terms to highly specific long-tail keywords that capture motivated viewers.</p>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2"><HelpCircle className="h-7 w-7 text-primary" />How to Generate Tags That Drive Results</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>The effectiveness of your generated tags hinges entirely on the quality of your initial input. A well-chosen seed keyword acts as a blueprint for the generator, guiding it to produce relevant and powerful suggestions. To get the best results, your primary keyword should be a concise and accurate representation of your video's core subject matter.</p>
                <p>Follow these principles for optimal tag generation:</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                    <li><strong>Start with Specificity:</strong> Avoid overly broad, single-word inputs. Instead of "cooking," try "how to make carbonara." Instead of "cars," use "Tesla Model 3 review." This level of detail provides the necessary context for the generator to find niche, targeted keywords that are less competitive and have higher search intent.</li>
                    <li><strong>Adopt the Viewer's Mindset:</strong> Put yourself in the shoes of your ideal viewer. What phrases would they type into the YouTube search bar if they were looking for your video? Use these natural language queries as your seed keywords. For example, a user is more likely to search "best budget gaming laptop 2025" than just "laptop."</li>
                    <li><strong>Generate, Curate, and Refine:</strong> The generated list is a powerful starting point, not a final answer. Your expertise as the creator is invaluable. Review the list and critically assess each tag. Remove any that are not a perfect match for your specific video content. The goal is to build a highly relevant, focused list that accurately describes your video.</li>
                    <li><strong>Iterate and Experiment:</strong> Don't be afraid to run the generator a few times with different seed keywords. Try a primary topic, then a secondary one. For a video on "iPhone photography tips," you could generate tags for that phrase, and then also for "how to edit photos on iPhone." Blending the results can create an even more robust tag list.</li>
                </ul>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2"><CheckCircle className="h-7 w-7 text-primary" />From Generation to Implementation: Best Practices</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
                <p>Once you have your curated list of tags, applying them correctly is key. Simply having good tags isn't enough; they need to be structured strategically within the 500-character limit YouTube provides. Here’s how to make your tags work for you:</p>
                <ol className="list-decimal list-inside space-y-3 pl-4">
                    <li><strong>Prioritize Your Primary Keyword:</strong> The first tag you list should always be your main target keyword—the most important search term you want to rank for. The YouTube algorithm places more emphasis on the initial tags, so this signals its importance.</li>
                    <li><strong>Balance Broad and Niche:</strong> A winning strategy involves a mix of tag types. Include 2-3 broad tags (e.g., "fitness," "workout") to establish the general category. Then, dedicate the majority of your tags to specific, long-tail phrases (e.g., "15 minute at home HIIT workout no equipment"). The broad tags help with overall content association, while the long-tail tags help you win less competitive, high-intent searches.</li>
                    <li><strong>Maintain Unwavering Relevance:</strong> Never use a tag that isn't directly related to your video, no matter how popular it is. Using misleading tags (e.g., adding a celebrity's name to a video they're not in) is a practice known as "tag stuffing." It violates YouTube's community guidelines and can lead to penalties, including reduced visibility or even video removal.</li>
                    <li><strong>Embrace Your Brand:</strong> Consistently include your channel name or a unique brand identifier as a tag in every video. This simple action helps the algorithm understand that your content is related, significantly increasing the chances that your other videos will be recommended in the "Up Next" sidebar when someone is watching your content.</li>
                    <li><strong>Spy on the Competition (Ethically):</strong> Use our companion <a href="/tools/youtube-tools/youtube-tag-extractor" className="text-primary underline">YouTube Tag Extractor</a> tool. Look at the tags of the top 3-5 videos ranking for your target keyword. This isn't about copying them verbatim, but about identifying keyword patterns and discovering effective tags you may have missed.</li>
                </ol>
            </div>
        </section>

        <section>
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="font-semibold">Are generated tags as good as manually researched ones?</h3>
                    <p className="text-muted-foreground mt-1">They can be even better. Our generator leverages a massive dataset of keyword relationships that would be impossible for a human to process manually. It identifies patterns and connections you might miss. The best approach is a hybrid one: use the generator for speed and breadth, then use your human expertise to refine the list for perfect relevance.</p>
                </div>
                <div>
                    <h3 className="font-semibold">How many tags should I generate and use?</h3>
                    <p className="text-muted-foreground mt-1">While our tool can generate up to 30 tags, you don't have to use all of them. The sweet spot for most videos is between 15 and 30 tags. This provides enough data for the algorithm without diluting the focus. Always prioritize the quality and relevance of your tags over hitting a specific number.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can I get my channel in trouble for using a tag generator?</h3>
                    <p className="text-muted-foreground mt-1">Not at all. Using a tag generator is a completely safe and legitimate SEO strategy. The tool is designed to help you brainstorm and find relevant keywords more efficiently. Trouble only arises if you use the generated tags irresponsibly, such as by using misleading tags that don't match your video's content.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Should I put tags in my video description?</h3>
                    <p className="text-muted-foreground mt-1">You should focus on two things: <strong>tags</strong> in the dedicated tag box and <strong>hashtags</strong> in the description. Don't paste a block of comma-separated keywords in your description; this is an outdated practice called "keyword stuffing" and is penalized by YouTube. Instead, you can use up to 15 relevant #hashtags in your description to aid discovery. Three of these may be shown above your video title.</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default YouTubeTagGeneratorTool;
