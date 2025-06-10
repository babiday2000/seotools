import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from './ContentDisplay';
const LoanCalculatorTool = () => {
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [term, setTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const handleCalculate = () => {
    const principal = parseFloat(amount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = parseInt(term);

    if (isNaN(principal) || isNaN(rate) || isNaN(months)) {
      toast.error('Please enter valid numbers in all fields.');
      return;
    }

    const payment = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    setMonthlyPayment(payment);
    toast.success('Loan payment calculated successfully!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Loan Calculator</CardTitle>
          <CardDescription>Estimate your monthly loan payments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              type="number"
              placeholder="Loan Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Annual Interest Rate (%)"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Loan Term (months)"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleCalculate}>Calculate</Button>
          {monthlyPayment !== null && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold">Monthly Payment:</h3>
              <p className="text-2xl font-bold">${monthlyPayment.toFixed(2)}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <ContentDisplay
        title="What is a Loan Calculator?"
        content={
          <div className="space-y-4">
            <p>A Loan Calculator is an essential financial tool that helps you estimate the monthly payments for a loan, such as a mortgage, auto loan, or personal loan. By inputting the loan amount, interest rate, and loan term, you can get a clear picture of your financial commitment, making it easier to budget and plan for the future. This calculator is invaluable for anyone considering taking out a loan, as it provides a realistic preview of the repayment schedule and total cost of borrowing.</p>
            <p>The primary purpose of a Loan Calculator is to empower you to make informed financial decisions. It demystifies the complexities of loan amortization, showing you how the principal and interest are paid off over time. Whether you are a first-time homebuyer trying to understand your mortgage options or a student looking to finance your education, this tool provides the clarity you need to choose a loan that fits your budget and financial goals. By seeing how different loan terms and interest rates affect your monthly payments, you can find the most affordable option for your situation.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of a Loan Calculator"
        content={
          <div className="space-y-4">
            <p>To estimate your monthly loan payments, the calculator uses three key inputs that define the terms of the loan. Understanding these components is crucial for getting an accurate result.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Loan Amount (Principal):</strong> This is the total amount of money you are borrowing. You enter this value into the first input field.</li>
              <li><strong>Annual Interest Rate (%):</strong> This is the annual percentage rate (APR) charged on the loan. The calculator converts this annual rate into a monthly rate for the calculation.</li>
              <li><strong>Loan Term (Months):</strong> This is the total number of months over which you will repay the loan. A longer term will result in lower monthly payments but higher total interest paid over the life of the loan.</li>
              <li><strong>Calculation Formula:</strong> The calculator uses the standard amortization formula to determine the monthly payment: M = P [r(1+r)^n] / [(1+r)^n – 1], where M is the monthly payment, P is the principal loan amount, r is the monthly interest rate, and n is the number of months.</li>
            </ul>
            <p>These components are integrated into a user-friendly interface that allows you to experiment with different scenarios. You can adjust the loan amount, interest rate, and term to see how each variable impacts your monthly payment, helping you find a loan that you can comfortably afford.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the Loan Calculator"
        content={
          <div className="space-y-4">
            <p>Using the Loan Calculator is a simple process. Follow these steps to estimate your monthly payments:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Enter the Loan Amount:</strong> In the first input field, type the total amount you plan to borrow.</li>
              <li><strong>Enter the Annual Interest Rate:</strong> In the second field, enter the annual interest rate for the loan.</li>
              <li><strong>Enter the Loan Term:</strong> In the third field, enter the total number of months for the loan repayment period.</li>
              <li><strong>Click "Calculate":</strong> Press the "Calculate" button. The tool will instantly compute and display your estimated monthly payment.</li>
            </ol>
            <p>This calculator is a powerful tool for financial planning, allowing you to compare different loan offers and make a decision that aligns with your long-term financial health.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Does this calculator include taxes and insurance?</h4>
              <p>No, this calculator only estimates the principal and interest portion of your monthly payment. For mortgages, your total payment will likely be higher as it often includes property taxes and homeowners' insurance (PITI). You should consult with your lender for a more comprehensive estimate.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">What is the difference between a fixed-rate and a variable-rate loan?</h4>
              <p>A fixed-rate loan has an interest rate that remains the same for the entire term of the loan, so your monthly payments are predictable. A variable-rate loan has an interest rate that can change over time, meaning your monthly payments may increase or decrease. This calculator is designed for fixed-rate loans.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">How can I lower my monthly loan payment?</h4>
              <p>You can lower your monthly payment by choosing a longer loan term, finding a loan with a lower interest rate, or borrowing a smaller amount. However, keep in mind that a longer loan term usually means you will pay more in total interest over the life of the loan.</p>
            </div>
          </div>
        }
      />
      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the concept of lending and borrowing money dates back to ancient civilizations? The first recorded loans were made in ancient Mesopotamia around 3500 BC, where farmers would borrow seeds and return a portion of their harvest as repayment. The modern concept of interest was also developed in this era, with the "interest" being the natural growth of the seeds. This ancient practice laid the groundwork for the complex financial systems we have today, where loans are a fundamental part of economic growth.</p>
        }
      />

    </>
  );
};

export default LoanCalculatorTool;
