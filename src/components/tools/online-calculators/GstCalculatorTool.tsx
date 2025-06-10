import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from './ContentDisplay';
const GstCalculatorTool = () => {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('');
  const [total, setTotal] = useState<number | null>(null);
  const [currency, setCurrency] = useState('$');

  const handleCalculate = () => {
    const numAmount = parseFloat(amount);
    const numGstRate = parseFloat(gstRate);

    if (isNaN(numAmount) || isNaN(numGstRate)) {
      toast.error('Please enter valid numbers in all fields.');
      return;
    }

    const gstAmount = numAmount * (numGstRate / 100);
    const totalPrice = numAmount + gstAmount;
    setTotal(totalPrice);
    toast.success('GST calculated successfully!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>GST Calculator</CardTitle>
          <CardDescription>Calculate the total price including GST.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Input
              type="number"
              placeholder="GST Rate (%)"
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
            />
            <select
              title="Currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="$" className="text-black">USD ($)</option>
              <option value="₹" className="text-black">INR (₹)</option>
            </select>
          </div>
          <Button onClick={handleCalculate}>Calculate</Button>
          {total !== null && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold">Total Price (including GST):</h3>
              <p className="text-2xl font-bold">{currency}{total.toFixed(2)}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <ContentDisplay
        title="What is a GST Calculator?"
        content={
          <div className="space-y-4">
            <p>A GST Calculator is a tool designed to help businesses and consumers calculate the Goods and Services Tax (GST) on products and services. GST is a value-added tax levied on most goods and services sold for domestic consumption. The calculator simplifies the process of determining the total price of a product after including the GST amount, making it an essential tool for financial planning, invoicing, and budgeting in countries where GST is implemented.</p>
            <p>The primary purpose of a GST Calculator is to provide a quick and accurate way to compute the GST amount and the final price of a product. For businesses, it is crucial for ensuring compliance with tax regulations and for transparent pricing. For consumers, it helps in understanding the tax component of their purchases. By automating the calculation, the tool eliminates the risk of manual errors and provides instant clarity on the total cost.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of a GST Calculator"
        content={
          <div className="space-y-4">
            <p>To calculate the total price including GST, the calculator uses two main inputs. Understanding these components is key to using the tool effectively.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Original Amount:</strong> This is the base price of the goods or services before the GST is applied. You enter this value into the first input field.</li>
              <li><strong>GST Rate (%):</strong> This is the applicable GST rate for the product or service, expressed as a percentage. GST rates can vary depending on the category of the goods or services, so it's important to use the correct rate.</li>
              <li><strong>Calculation Formula:</strong> The calculator uses the formula: GST Amount = Original Amount * (GST Rate / 100). The total price is then calculated as: Total Price = Original Amount + GST Amount.</li>
            </ul>
            <p>These components are integrated into a user-friendly interface that makes it easy to perform GST calculations without needing to do the math manually. The tool is designed for accuracy and speed, helping you manage your finances with confidence.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the GST Calculator"
        content={
          <div className="space-y-4">
            <p>Using the GST Calculator is a simple and straightforward process. Follow these steps to find the total price:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Enter the Amount:</strong> In the first input field, type the original price of the goods or service.</li>
              <li><strong>Enter the GST Rate:</strong> In the second input field, enter the applicable GST rate as a percentage.</li>
              <li><strong>Click "Calculate":</strong> Press the "Calculate" button. The tool will instantly compute and display the total price, including the GST.</li>
            </ol>
            <p>This calculator is perfect for businesses that need to issue invoices with GST, as well as for consumers who want to verify the tax component of their purchases. It's a practical tool for ensuring financial accuracy.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Are GST rates the same for all products and services?</h4>
              <p>No, GST rates can vary significantly depending on the country and the category of goods or services. Most countries with a GST system have multiple tax slabs, with essential items often having a lower rate and luxury items having a higher rate. It's important to know the correct rate for the specific product you are dealing with.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Can this calculator be used for different countries?</h4>
              <p>Yes, the calculator can be used for any country that has a GST system. You simply need to input the correct GST rate for your country and the specific product or service. The calculation logic remains the same regardless of the location.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">How is GST different from sales tax?</h4>
              <p>GST is a value-added tax that is levied at each stage of the supply chain, from production to final sale. In contrast, a sales tax is typically only levied at the final point of sale to the consumer. While both are consumption taxes, their implementation and structure can be quite different.</p>
            </div>
          </div>
        }
      />
      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the Goods and Services Tax (GST) is a relatively new form of taxation in many countries? It was first introduced in France in 1954 and has since been adopted by over 160 countries around the world. The main idea behind GST is to simplify the tax system by replacing a multitude of indirect taxes with a single, comprehensive tax. This makes it easier for businesses to comply with tax laws and for governments to administer them.</p>
        }
      />

    </>
  );
};

export default GstCalculatorTool;
