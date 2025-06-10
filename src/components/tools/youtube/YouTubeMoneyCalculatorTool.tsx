import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DollarSign, TrendingUp, HelpCircle } from 'lucide-react';

const YouTubeMoneyCalculatorTool = () => {
  const [dailyViews, setDailyViews] = useState(50000);
  const [rpm, setRpm] = useState(4);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  };

  const calculations = useMemo(() => {
    const dailyEarnings = (dailyViews / 1000) * rpm;
    const monthlyEarnings = dailyEarnings * 30;
    const yearlyEarnings = dailyEarnings * 365;
    return { dailyEarnings, monthlyEarnings, yearlyEarnings };
  }, [dailyViews, rpm]);

  return (
    <div className="space-y-8">
      <div className="text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">YouTube Money Calculator</h1>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Ever wondered how much top YouTubers earn? Use our estimator to calculate the potential ad revenue of a channel. Adjust the daily views and average RPM to understand how earnings can scale. This tool provides a transparent look into the business side of content creation.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Earnings Estimator</CardTitle>
          <CardDescription>This tool provides an estimate for ad revenue only. Actual earnings can vary based on many factors.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium">Daily Video Views</label>
              <span className="text-lg font-bold text-primary">{formatNumber(dailyViews)}</span>
            </div>
            <Slider
              value={[dailyViews]}
              onValueChange={(value) => setDailyViews(value[0])}
              min={1000}
              max={1000000}
              step={1000}
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium">Average RPM (Revenue Per 1,000 Views)</label>
              <span className="text-lg font-bold text-primary">{formatCurrency(rpm)}</span>
            </div>
            <Slider
              value={[rpm]}
              onValueChange={(value) => setRpm(value[0])}
              min={0.5}
              max={20}
              step={0.1}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center pt-6">
            <div className="bg-card border p-6 rounded-lg">
              <p className="text-sm text-muted-foreground">Estimated Daily Earnings</p>
              <p className="text-3xl font-bold tracking-tight">{formatCurrency(calculations.dailyEarnings)}</p>
            </div>
            <div className="bg-card border p-6 rounded-lg">
              <p className="text-sm text-muted-foreground">Estimated Monthly Earnings</p>
              <p className="text-3xl font-bold tracking-tight">{formatCurrency(calculations.monthlyEarnings)}</p>
            </div>
            <div className="bg-card border p-6 rounded-lg">
              <p className="text-sm text-muted-foreground">Estimated Yearly Earnings</p>
              <p className="text-3xl font-bold tracking-tight">{formatCurrency(calculations.yearlyEarnings)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><DollarSign className="h-6 w-6 text-primary" /> How YouTube Earnings Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>Creators primarily earn money through the YouTube Partner Program (YPP), which places ads on their videos via Google AdSense. To be eligible, a channel must have at least 1,000 subscribers and 4,000 watch hours in the past 12 months.</p>
            <p>Revenue is not based on subscribers, but on monetized views of ads. It's important to note that this calculator only estimates ad revenue. Many creators have additional income streams like sponsorships, affiliate marketing, merchandise sales, and channel memberships, which can often surpass ad revenue.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><HelpCircle className="h-6 w-6 text-primary" /> What is RPM?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p><strong>RPM (Revenue Per Mille)</strong> is the most important creator-centric metric. It represents your total revenue (from ads, YouTube Premium, memberships, etc.) for every 1,000 video views. It's the effective rate you earn from all sources combined, divided by your total views.</p>
            <p>This differs from <strong>CPM (Cost Per Mille)</strong>, which is the cost an advertiser pays for 1,000 ad impressions before YouTube takes its share. Your RPM will always be lower than the CPM because it accounts for YouTube's revenue cut (typically 45% for ads) and the fact that not every view gets an ad.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><TrendingUp className="h-6 w-6 text-primary" /> Factors That Influence Your RPM</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-3 text-muted-foreground">
            <li><strong>Audience Location:</strong> Advertisers pay a premium to reach viewers in Tier 1 countries (USA, UK, Canada, Australia) due to higher purchasing power, resulting in a much higher RPM.</li>
            <li><strong>Video Niche:</strong> Content about finance, technology, real estate, and business commands the highest ad rates because the products being advertised have high value. Entertainment, gaming, and lifestyle niches typically have lower RPMs.</li>
            <li><strong>Time of Year (Seasonality):</strong> Ad spending skyrockets in Q4 (October-December) for the holidays, significantly boosting RPMs. Conversely, Q1 (January-March) often sees the lowest rates as marketing budgets reset.</li>
            <li><strong>Video Length:</strong> Videos over 8 minutes long are eligible for mid-roll ads (ads placed in the middle of the video). This can dramatically increase the number of ad impressions and therefore the RPM for that video.</li>
            <li><strong>Audience Demographics:</strong> Advertisers often target specific age groups and genders (e.g., 25-44 year olds with high disposable income), which can influence the value of your channel's ad inventory.</li>
          </ul>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto space-y-8 px-4 mt-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">How to Use the YouTube Money Calculator</h2>
          <p className="text-muted-foreground">
            Our tool is designed to be simple and intuitive. Here’s how you can get an estimate of a channel's potential earnings:
          </p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-2">
            <li><strong>Adjust Daily Views:</strong> Use the slider to set the estimated number of daily views the channel receives. You can often find this information on social media analytics sites or by observing the channel's recent performance.</li>
            <li><strong>Set the RPM:</strong> Adjust the RPM (Revenue Per 1,000 Views) slider. This is a crucial factor that varies greatly by niche and audience location. An RPM of $2-$5 is common for entertainment channels, while finance and tech channels can have RPMs of $10-$20 or even higher.</li>
            <li><strong>Review the Estimates:</strong> The tool will instantly calculate the estimated daily, monthly, and yearly earnings based on your inputs.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Is this calculator 100% accurate?</h3>
              <p className="text-muted-foreground">No, this is an estimator tool. Actual earnings depend on a wide variety of factors that cannot be accounted for in a simple calculator, such as the specific ads shown, audience demographics, and seasonality. However, it provides a reasonable ballpark estimate.</p>
            </div>
            <div>
              <h3 className="font-semibold">Does this include other income sources?</h3>
              <p className="text-muted-foreground">This calculator estimates AdSense revenue only. Top YouTubers often have multiple income streams, including sponsorships, merchandise, affiliate marketing, and channel memberships, which are not included in this calculation.</p>
            </div>
            <div>
              <h3 className="font-semibold">What's a typical RPM for a YouTube channel?</h3>
              <p className="text-muted-foreground">RPMs can range from as low as $0.50 to over $20. It depends heavily on the channel's niche, the geographic location of its viewers, and the time of year. Gaming and entertainment channels are typically on the lower end, while finance and business channels are on the higher end.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Fun Fact</h2>
          <p className="text-muted-foreground">
            The highest-earning YouTuber, MrBeast, reportedly makes over $50 million a year from his YouTube ad revenue alone. His massive view counts and highly engaged, US-based audience give him an incredibly high RPM, demonstrating the massive earning potential of the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="/tools/youtube-tools/youtube-channel-statistics" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Channel Statistics</h3>
              <p className="text-sm text-muted-foreground">Analyze the performance and growth of any YouTube channel.</p>
            </a>
            <a href="/tools/youtube-tools/youtube-views-ratio-calculator" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">YouTube Views Ratio Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate the views-to-subscriber ratio for any channel.</p>
            </a>
            <a href="/tools/online-calculators/cpm-calculator" className="block p-4 border rounded-lg hover:bg-muted">
              <h3 className="font-semibold">CPM Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate the Cost Per Mille for your advertising campaigns.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default YouTubeMoneyCalculatorTool;
