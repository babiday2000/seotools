import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from './ContentDisplay';
const PaypalFeeCalculatorTool = () => {
  const [amount, setAmount] = useState('');
  const [fee, setFee] = useState<number | null>(null);

  const handleCalculate = () => {
    const numAmount = parseFloat(amount);

    if (isNaN(numAmount)) {
      toast.error('Please enter a valid amount.');
      return;
    }

    // Standard PayPal fee: 2.9% + $0.30
    const calculatedFee = numAmount * 0.029 + 0.3;
    setFee(calculatedFee);
    toast.success('PayPal fee calculated successfully!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>PayPal Fee Calculator</CardTitle>
          <CardDescription>Estimate the PayPal fee for a transaction.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="number"
            placeholder="Transaction Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button onClick={handleCalculate}>Calculate</Button>
          {fee !== null && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold">Estimated Fee:</h3>
              <p className="text-2xl font-bold">${fee.toFixed(2)}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <ContentDisplay
        title="What is a PayPal Fee Calculator?"
        content={
          <div className="space-y-4">
            <p>A PayPal Fee Calculator is a convenient tool that helps individuals and businesses estimate the fees associated with using PayPal for transactions. PayPal is a widely used online payment platform, but it charges fees for certain types of transactions, particularly for goods and services. This calculator allows you to input the transaction amount and instantly see the estimated fee, helping you understand the true cost of the transaction and plan your finances accordingly.</p>
            <p>The primary purpose of this calculator is to provide transparency and help you avoid surprises when it comes to PayPal fees. Whether you are a freelancer invoicing a client, an e-commerce store owner selling products, or simply sending money to someone, knowing the fee in advance can be crucial. It allows you to price your products or services more accurately, or decide on the most cost-effective way to transfer money. This tool is designed to be simple and user-friendly, making it accessible to everyone.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of a PayPal Fee Calculator"
        content={
          <div className="space-y-4">
            <p>To estimate the PayPal fee, the calculator uses a few key components based on PayPal's standard fee structure. Understanding these components will help you see how the fee is determined.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Transaction Amount:</strong> This is the total amount of money being sent in the transaction. You enter this value into the calculator, and it serves as the base for the fee calculation.</li>
              <li><strong>Fee Percentage:</strong> PayPal typically charges a percentage of the transaction amount as a fee. The standard rate for commercial transactions in the U.S. is 2.9%, but this can vary based on the transaction type and location.</li>
              <li><strong>Fixed Fee:</strong> In addition to the percentage-based fee, PayPal often adds a small fixed fee. For U.S. domestic transactions, this is typically $0.30. This fixed fee is applied to each transaction, regardless of the amount.</li>
              <li><strong>Calculation Formula:</strong> The calculator uses the formula: Fee = (Transaction Amount * Fee Percentage) + Fixed Fee. For example, for a $100 transaction with the standard U.S. fee, the calculation would be ($100 * 0.029) + $0.30 = $3.20.</li>
            </ul>
            <p>This calculator uses the standard U.S. fee structure for its estimation. It's important to note that fees can differ for international transactions, currency conversions, and other specific scenarios. Always check PayPal's official website for the most current and applicable fee information for your situation.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the PayPal Fee Calculator"
        content={
          <div className="space-y-4">
            <p>Using the PayPal Fee Calculator is a very simple process. Follow these steps to get your estimated fee:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Enter the Transaction Amount:</strong> In the input field, type the total amount of the transaction.</li>
              <li><strong>Click "Calculate":</strong> Press the "Calculate" button. The tool will instantly compute the estimated PayPal fee based on the standard U.S. rate.</li>
              <li><strong>View the Estimated Fee:</strong> The calculator will display the estimated fee, giving you a clear idea of how much will be deducted from the transaction.</li>
            </ol>
            <p>This tool is perfect for quick calculations, helping you manage your online payments more effectively. Whether you're a buyer or a seller, understanding the fees involved is the first step to smart financial planning.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Are PayPal fees the same for all countries?</h4>
              <p>No, PayPal fees vary by country and currency. This calculator uses the standard fee for U.S. domestic transactions. For international transactions, you should consult PayPal's official fee schedule for the specific countries involved.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Does this calculator account for currency conversion fees?</h4>
              <p>This calculator does not account for currency conversion fees, which may apply if you are sending or receiving money in a different currency. PayPal typically charges an additional fee for currency conversion, so it's important to factor that in for international transactions.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Is there a way to avoid PayPal fees?</h4>
              <p>For personal transactions, sending money to friends and family from a linked bank account or PayPal balance is often free. However, for commercial transactions (i.e., paying for goods or services), the seller is typically charged a fee. Some sellers may choose to absorb this fee, while others may pass it on to the buyer.</p>
            </div>
          </div>
        }
      />
      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that PayPal was originally established in 1998 as Confinity, a company that developed security software for handheld devices? It wasn't until 2000 that it merged with X.com, an online banking company founded by Elon Musk, and began to focus on online payment services. The platform's success was so rapid that it was acquired by eBay in 2002 for $1.5 billion, and it has since become one of the most widely used online payment systems in the world.</p>
        }
      />

    </>
  );
};

export default PaypalFeeCalculatorTool;
