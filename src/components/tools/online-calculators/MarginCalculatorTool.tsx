import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from './ContentDisplay';
const MarginCalculatorTool = () => {
  const [cost, setCost] = useState('');
  const [revenue, setRevenue] = useState('');
  const [margin, setMargin] = useState<number | null>(null);

  const handleCalculate = () => {
    const numCost = parseFloat(cost);
    const numRevenue = parseFloat(revenue);

    if (isNaN(numCost) || isNaN(numRevenue)) {
      toast.error('Please enter valid numbers in all fields.');
      return;
    }

    if (numRevenue === 0) {
      toast.error('Revenue cannot be zero.');
      return;
    }

    const calculatedMargin = ((numRevenue - numCost) / numRevenue) * 100;
    setMargin(calculatedMargin);
    toast.success('Margin calculated successfully!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Margin Calculator</CardTitle>
          <CardDescription>Calculate the profit margin of a product.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              type="number"
              placeholder="Cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Revenue"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
            />
          </div>
          <Button onClick={handleCalculate}>Calculate</Button>
          {margin !== null && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold">Profit Margin:</h3>
              <p className="text-2xl font-bold">{margin.toFixed(2)}%</p>
            </div>
          )}
        </CardContent>
      </Card>
      <ContentDisplay
        title="What is a Margin Calculator?"
        content={
          <div className="space-y-4">
            <p>A Margin Calculator is a vital financial tool for businesses, entrepreneurs, and financial analysts to determine the profitability of a product, service, or entire business. The profit margin, expressed as a percentage, represents the portion of revenue that translates into profit. By calculating the margin, you can assess the financial health of your operations, make informed pricing decisions, and identify areas for cost reduction. This calculator simplifies the process, allowing you to quickly understand how changes in cost and revenue impact your bottom line.</p>
            <p>The primary purpose of a Margin Calculator is to provide a clear and immediate measure of profitability. It helps you answer critical questions such as: Is my pricing strategy effective? Are my costs too high? How much profit am I making on each sale? For retailers, it's essential for setting prices that cover costs and generate a healthy profit. For service providers, it helps in structuring fees that reflect the value of their work. Ultimately, this tool empowers you to manage your finances more effectively and drive sustainable growth.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of a Margin Calculator"
        content={
          <div className="space-y-4">
            <p>To calculate the profit margin, the tool uses two fundamental inputs that are crucial for determining profitability. Understanding these components is key to using the calculator correctly.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Cost:</strong> This is the total cost associated with producing or acquiring a product or delivering a service. It includes all direct costs, such as raw materials, labor, and manufacturing expenses. Accurate cost accounting is essential for a meaningful margin calculation.</li>
              <li><strong>Revenue:</strong> This is the total amount of income generated from the sale of the product or service. It is the price at which you sell to your customers. The difference between revenue and cost is your gross profit.</li>
              <li><strong>Calculation Formula:</strong> The calculator uses the standard formula for profit margin: Margin (%) = ((Revenue - Cost) / Revenue) * 100. This formula expresses the gross profit as a percentage of the total revenue, providing a clear indicator of how profitable each sale is.</li>
            </ul>
            <p>By inputting these values, you can instantly see your profit margin. This allows you to experiment with different pricing strategies and cost structures to find the optimal balance for your business. The calculator is designed for ease of use, making complex financial analysis accessible to everyone.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the Margin Calculator"
        content={
          <div className="space-y-4">
            <p>Using the Margin Calculator is a simple process that can be completed in just a few steps. Here’s how to do it:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Enter the Cost:</strong> In the first input field, type the total cost of the product or service.</li>
              <li><strong>Enter the Revenue:</strong> In the second input field, enter the total revenue generated from the sale.</li>
              <li><strong>Click "Calculate":</strong> Press the "Calculate" button. The tool will immediately compute and display the profit margin as a percentage.</li>
            </ol>
            <p>This calculator is perfect for quick checks on product profitability, helping you make agile decisions in a competitive market. Whether you're a small business owner or a manager in a large corporation, this tool can provide valuable insights into your financial performance.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">What is the difference between profit margin and markup?</h4>
              <p>Profit margin is the percentage of revenue that is profit (Profit / Revenue), while markup is the percentage of the cost that is added to get the selling price (Profit / Cost). They are two different ways of looking at profitability, and it's important not to confuse them.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">What is a good profit margin?</h4>
              <p>A "good" profit margin varies widely by industry. Some industries, like retail, may have lower margins but high volume, while others, like software, may have higher margins. It's best to compare your margin to the average for your specific industry to gauge your performance.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Does this calculator account for operating expenses?</h4>
              <p>This calculator determines the gross profit margin, which does not account for operating expenses like marketing, rent, or salaries. To find your net profit margin, you would need to subtract these additional expenses from your gross profit before dividing by revenue.</p>
            </div>
          </div>
        }
      />
      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the concept of profit margin is one of the oldest and most fundamental principles in commerce? Ancient merchants, from the Phoenicians to the traders on the Silk Road, intuitively understood the need to sell goods for more than their cost to sustain their businesses. While they may not have used the term "profit margin," the core idea of calculating the percentage of revenue that is profit has been a cornerstone of trade for thousands of years, driving economic growth and innovation across civilizations.</p>
        }
      />

    </>
  );
};

export default MarginCalculatorTool;
