import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from './ContentDisplay';
const SalesTaxCalculatorTool = () => {
  const [price, setPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [total, setTotal] = useState<number | null>(null);

  const handleCalculate = () => {
    const numPrice = parseFloat(price);
    const numTaxRate = parseFloat(taxRate);

    if (isNaN(numPrice) || isNaN(numTaxRate)) {
      toast.error('Please enter valid numbers in all fields.');
      return;
    }

    const taxAmount = numPrice * (numTaxRate / 100);
    const totalPrice = numPrice + taxAmount;
    setTotal(totalPrice);
    toast.success('Sales tax calculated successfully!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Sales Tax Calculator</CardTitle>
          <CardDescription>Calculate the total price including sales tax.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Tax Rate (%)"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
            />
          </div>
          <Button onClick={handleCalculate}>Calculate</Button>
          {total !== null && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold">Total Price:</h3>
              <p className="text-2xl font-bold">${total.toFixed(2)}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <ContentDisplay
        title="What is a Sales Tax Calculator?"
        content={
          <div className="space-y-4">
            <p>A Sales Tax Calculator is an essential tool for consumers and business owners alike, designed to quickly and accurately determine the total cost of a product or service after applying sales tax. Sales tax is a consumption tax imposed by governments on the sale of goods and services, and its rate can vary significantly depending on the state, county, and even city. This calculator simplifies the process of figuring out the final price, saving you from manual calculations and ensuring you know exactly how much you'll be paying.</p>
            <p>The primary purpose of a Sales Tax Calculator is to provide clarity and transparency in pricing. For shoppers, it helps in budgeting and avoiding surprises at the checkout counter. For businesses, it is crucial for accurate pricing, invoicing, and financial planning. By automating the calculation, the tool eliminates the potential for human error, ensuring that the correct amount of tax is always applied. This is particularly useful in e-commerce, where businesses need to handle sales tax for customers in various locations with different tax rates.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of a Sales Tax Calculator"
        content={
          <div className="space-y-4">
            <p>To calculate the total price including sales tax, the calculator uses a few key components that work together to process the input and provide an accurate result. Understanding these components will help you use the tool effectively.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Original Price:</strong> This is the pre-tax price of the item or service. You enter this value into the first input field. It serves as the base amount for the tax calculation.</li>
              <li><strong>Tax Rate (%):</strong> This is the sales tax rate applicable to the purchase, expressed as a percentage. You need to enter this rate into the second input field. Tax rates can vary by location, so it's important to use the correct rate for your area.</li>
              <li><strong>Calculation Formula:</strong> The calculator uses the standard formula to determine the sales tax amount: Tax Amount = Original Price * (Tax Rate / 100). It then adds this tax amount to the original price to get the total cost: Total Price = Original Price + Tax Amount.</li>
            </ul>
            <p>These components are integrated into a simple and intuitive interface, allowing anyone to calculate sales tax without needing to perform the calculations manually. The tool is designed for speed and accuracy, providing you with the final price in an instant.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the Sales Tax Calculator"
        content={
          <div className="space-y-4">
            <p>Using the Sales Tax Calculator is a quick and easy process. Follow these steps to get the total price:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Enter the Price:</strong> In the first input field, type the original price of the item or service.</li>
              <li><strong>Enter the Tax Rate:</strong> In the second input field, enter the applicable sales tax rate as a percentage.</li>
              <li><strong>Click "Calculate":</strong> Press the "Calculate" button. The tool will instantly compute the total price, including the sales tax.</li>
            </ol>
            <p>The calculator will display the final amount, so you know exactly how much you need to pay. This is particularly helpful when shopping online or planning a budget for your purchases.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">How do I find the sales tax rate for my area?</h4>
              <p>Sales tax rates vary by location. You can usually find the correct rate by checking your local government's revenue or finance department website. For online purchases, the e-commerce site often calculates the tax for you at checkout based on your shipping address.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Can this calculator handle tax-exempt items?</h4>
              <p>This calculator is designed to calculate sales tax on taxable goods and services. If an item is tax-exempt, you would not need to use this tool, as the price would simply be the original price.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Does this calculator work for international purchases?</h4>
              <p>The calculator can be used for any currency, as it works with the numbers you provide. However, you need to know the correct tax rate for the country and region where you are making the purchase, as value-added tax (VAT) or goods and services tax (GST) can differ significantly from U.S. sales tax.</p>
            </div>
          </div>
        }
      />
      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the concept of a sales tax dates back to ancient Egypt, over 2,000 years ago? The Pharaohs imposed a tax on the sale of goods to fund their vast empire. The modern sales tax system, however, was first implemented in the United States in the 1930s as a way to generate revenue during the Great Depression. Today, it's a common form of taxation in many countries around the world, each with its own unique rates and regulations.</p>
        }
      />

    </>
  );
};

export default SalesTaxCalculatorTool;
