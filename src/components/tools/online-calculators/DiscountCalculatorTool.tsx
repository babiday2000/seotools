import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from './ContentDisplay';
const DiscountCalculatorTool = () => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  const handleCalculate = () => {
    const numOriginalPrice = parseFloat(originalPrice);
    const numDiscountPercentage = parseFloat(discountPercentage);

    if (isNaN(numOriginalPrice) || isNaN(numDiscountPercentage)) {
      toast.error('Please enter valid numbers in all fields.');
      return;
    }

    const discountAmount = numOriginalPrice * (numDiscountPercentage / 100);
    const calculatedFinalPrice = numOriginalPrice - discountAmount;
    setFinalPrice(calculatedFinalPrice);
    toast.success('Discount calculated successfully!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Discount Calculator</CardTitle>
          <CardDescription>Calculate the final price after a discount.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              type="number"
              placeholder="Original Price"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Discount Percentage (%)"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
            />
          </div>
          <Button onClick={handleCalculate}>Calculate</Button>
          {finalPrice !== null && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold">Final Price:</h3>
              <p className="text-2xl font-bold">${finalPrice.toFixed(2)}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <ContentDisplay
        title="What is a Discount Calculator?"
        content={
          <div className="space-y-4">
            <p>A Discount Calculator is a handy tool for shoppers and retailers to quickly determine the final price of an item after a discount has been applied. Whether you're a savvy shopper looking to find the best deals or a business owner running a promotion, this calculator simplifies the process of calculating price reductions. It allows you to see the immediate impact of a discount, helping you make informed purchasing decisions and manage your sales strategies effectively.</p>
            <p>The primary purpose of a Discount Calculator is to provide a clear and accurate calculation of the final price you will pay. It takes the guesswork out of sale shopping, ensuring you know exactly how much you are saving. For retailers, it is an essential tool for pricing strategies, allowing them to easily set and communicate promotional offers to customers. By automating the calculation, the tool saves time and reduces the risk of errors, making it a valuable asset for both personal and professional use.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of a Discount Calculator"
        content={
          <div className="space-y-4">
            <p>To calculate the final price after a discount, the tool uses two main inputs. Understanding these components will help you use the calculator effectively.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Original Price:</strong> This is the initial price of the item before any discounts are applied. You enter this value into the first input field.</li>
              <li><strong>Discount Percentage (%):</strong> This is the percentage of the original price that is being discounted. For example, if an item is 25% off, you would enter "25" in this field.</li>
              <li><strong>Calculation Formula:</strong> The calculator first determines the discount amount using the formula: Discount Amount = Original Price * (Discount Percentage / 100). It then subtracts this amount from the original price to find the final price: Final Price = Original Price - Discount Amount.</li>
            </ul>
            <p>These components are integrated into a user-friendly interface that makes it easy to calculate discounts without any manual math. The tool is designed for quick and accurate results, so you can shop smarter and manage your sales with confidence.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the Discount Calculator"
        content={
          <div className="space-y-4">
            <p>Using the Discount Calculator is a simple and straightforward process. Follow these steps to find the final price:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Enter the Original Price:</strong> In the first input field, type the original price of the item.</li>
              <li><strong>Enter the Discount Percentage:</strong> In the second input field, enter the discount percentage.</li>
              <li><strong>Click "Calculate":</strong> Press the "Calculate" button. The tool will instantly compute and display the final price after the discount.</li>
            </ol>
            <p>This calculator is perfect for on-the-go calculations while shopping, helping you stick to your budget and make the most of sales. It's also a great tool for retailers to quickly determine promotional pricing.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Can I calculate a double discount?</h4>
              <p>This calculator is designed for a single discount percentage. To calculate a double discount (e.g., an additional 10% off an already discounted item), you would first calculate the price after the initial discount, and then use that new price as the "Original Price" to calculate the second discount.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Does this calculator include sales tax?</h4>
              <p>No, this calculator only determines the price after the discount. Sales tax is typically calculated on the discounted price, so you would need to use a sales tax calculator to find the final total cost including tax.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">What if the discount is a fixed amount instead of a percentage?</h4>
              <p>This calculator is designed for percentage-based discounts. If you have a fixed amount discount (e.g., $10 off), you would simply subtract that amount from the original price to find the final price.</p>
            </div>
          </div>
        }
      />
      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the concept of a discount is as old as trade itself? In ancient marketplaces, haggling and bargaining were common practices, which are essentially forms of on-the-spot discounting. The modern concept of a fixed-percentage discount, however, became popular with the rise of department stores in the 19th century. These stores used discounts as a marketing strategy to attract customers and clear out old inventory, a practice that is still widely used today.</p>
        }
      />

    </>
  );
};

export default DiscountCalculatorTool;
