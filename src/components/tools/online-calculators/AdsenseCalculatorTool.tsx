import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from './ContentDisplay';
const AdsenseCalculatorTool = () => {
  const [pageViews, setPageViews] = useState('');
  const [ctr, setCtr] = useState('');
  const [cpc, setCpc] = useState('');
  const [estimatedEarnings, setEstimatedEarnings] = useState<number | null>(null);

  const handleCalculate = () => {
    const numPageViews = parseFloat(pageViews);
    const numCtr = parseFloat(ctr);
    const numCpc = parseFloat(cpc);

    if (isNaN(numPageViews) || isNaN(numCtr) || isNaN(numCpc)) {
      toast.error('Please enter valid numbers in all fields.');
      return;
    }

    const clicks = (numPageViews * numCtr) / 100;
    const earnings = clicks * numCpc;
    setEstimatedEarnings(earnings);
    toast.success('Calculation successful!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>AdSense Calculator</CardTitle>
          <CardDescription>Estimate your potential AdSense earnings based on page views, CTR, and CPC.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              type="number"
              placeholder="Daily Page Views"
              value={pageViews}
              onChange={(e) => setPageViews(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Click-Through Rate (%)"
              value={ctr}
              onChange={(e) => setCtr(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Cost Per Click ($)"
              value={cpc}
              onChange={(e) => setCpc(e.target.value)}
            />
          </div>
          <Button onClick={handleCalculate}>Calculate</Button>
          {estimatedEarnings !== null && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold">Estimated Earnings:</h3>
              <p className="text-2xl font-bold">${estimatedEarnings.toFixed(2)}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <ContentDisplay
        title="What is an AdSense Calculator?"
        content={
          <div className="space-y-4">
            <p>An AdSense Calculator is an essential tool for website owners, bloggers, and digital marketers who monetize their content through Google AdSense. It provides a straightforward way to estimate potential earnings based on key advertising metrics. By inputting data such as daily page views, click-through rate (CTR), and cost per click (CPC), users can get a clear projection of their daily, monthly, and annual revenue. This helps in setting realistic financial goals, evaluating the effectiveness of content strategies, and making informed decisions to optimize ad performance. Whether you're a seasoned publisher or just starting, this calculator simplifies the complexities of ad revenue forecasting, allowing you to focus on creating high-quality content that engages your audience.</p>
            <p>The primary purpose of an AdSense Calculator is to offer a reliable forecast of your advertising income. It demystifies the process of calculating earnings by breaking it down into simple, understandable components. Instead of manually crunching numbers or relying on guesswork, you can use this tool to see how changes in traffic, user engagement, and ad performance can impact your bottom line. This is particularly useful for planning content calendars, allocating resources for marketing campaigns, and understanding the monetization potential of new website features. By providing a clear and concise overview of your potential earnings, the calculator empowers you to take control of your advertising strategy and maximize your revenue.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of an AdSense Calculator"
        content={
          <div className="space-y-4">
            <p>To accurately estimate your AdSense earnings, it's crucial to understand the key components that drive the calculation. These metrics are the foundation of your advertising revenue and provide insights into how users interact with the ads on your site.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Daily Page Views:</strong> This represents the total number of pages viewed on your website each day. Higher page views generally translate to more ad impressions, which increases the likelihood of clicks and, consequently, higher earnings. Tracking your page views over time can help you identify content that resonates with your audience and attracts more traffic.</li>
              <li><strong>Click-Through Rate (CTR):</strong> The CTR is the percentage of page views that result in a click on an ad. It's a critical indicator of how engaging your ads are to your audience. A higher CTR suggests that your ads are relevant and well-placed, encouraging users to interact with them. To improve your CTR, you can experiment with different ad formats, placements, and color schemes to see what works best for your site.</li>
              <li><strong>Cost Per Click (CPC):</strong> The CPC is the amount you earn each time a user clicks on an ad. This value is determined by advertisers in a competitive bidding process and can vary significantly based on factors like the advertiser's budget, the niche of your content, and the geographic location of your audience. A higher CPC means that advertisers are willing to pay more to reach your audience, which can significantly boost your earnings.</li>
            </ul>
            <p>By understanding and optimizing these three components, you can create a more effective monetization strategy. For instance, focusing on SEO to increase page views, improving user experience to boost CTR, and creating content in high-CPC niches are all effective ways to enhance your AdSense revenue. The calculator allows you to model how improvements in each of these areas can lead to substantial growth in your overall earnings.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the AdSense Calculator"
        content={
          <div className="space-y-4">
            <p>Using the AdSense Calculator is a simple and intuitive process. Follow these steps to get an estimate of your potential earnings:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Enter Daily Page Views:</strong> In the first input field, type in the average number of page views your website receives per day. You can find this data in your Google Analytics account under the "Audience Overview" section.</li>
              <li><strong>Enter Click-Through Rate (CTR):</strong> In the second field, enter your estimated CTR as a percentage. If you're unsure, the industry average is typically between 1% and 2%, but this can vary. You can find your actual CTR in your Google AdSense account.</li>
              <li><strong>Enter Cost Per Click (CPC):</strong> In the third field, provide the average CPC in dollars. This figure can also be found in your AdSense account and is influenced by your content's niche and audience demographics.</li>
              <li><strong>Click "Calculate":</strong> Once you've entered all the required information, click the "Calculate" button. The tool will instantly process the data and display your estimated daily, monthly, and annual earnings.</li>
            </ol>
            <p>By experimenting with different values, you can see how changes in your website's performance can affect your revenue. For example, you can simulate the impact of a successful marketing campaign that doubles your page views or an optimization strategy that increases your CTR. This allows you to set clear, data-driven goals and track your progress over time.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Is the AdSense Calculator 100% accurate?</h4>
              <p>The calculator provides an estimate based on the data you provide. Actual earnings can vary due to factors like ad competition, seasonal trends, and changes in your audience's behavior. However, it offers a reliable projection to help you with financial planning.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Where can I find my CTR and CPC?</h4>
              <p>You can find your CTR and CPC in your Google AdSense account dashboard. These metrics are updated regularly and provide a clear picture of your ad performance.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">How can I improve my AdSense earnings?</h4>
              <p>To increase your earnings, focus on creating high-quality content to attract more page views, optimizing ad placement to improve CTR, and targeting keywords with a higher CPC. A/B testing different ad formats and placements can also help you find the most effective strategy for your site.</p>
            </div>
          </div>
        }
      />
      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the first-ever ad displayed on a website was for AT&T in 1994? It appeared on HotWired.com, the first commercial web magazine, and had a CTR of 44%! This groundbreaking moment paved the way for the online advertising industry we know today and demonstrated the immense potential of monetizing web content.</p>
        }
      />

    </>
  );
};

export default AdsenseCalculatorTool;
