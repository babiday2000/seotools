import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from './ContentDisplay';
const AverageCalculatorTool = () => {
  const [numbers, setNumbers] = useState('');
  const [average, setAverage] = useState<number | null>(null);

  const handleCalculate = () => {
    const numberArray = numbers.split(',').map(num => parseFloat(num.trim()));
    const validNumbers = numberArray.filter(num => !isNaN(num));

    if (validNumbers.length === 0) {
      toast.error('Please enter a comma-separated list of numbers.');
      return;
    }

    const sum = validNumbers.reduce((acc, num) => acc + num, 0);
    const avg = sum / validNumbers.length;
    setAverage(avg);
    toast.success('Average calculated successfully!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Average Calculator</CardTitle>
          <CardDescription>Calculate the average of a list of numbers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter numbers, separated by commas"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
          />
          <Button onClick={handleCalculate}>Calculate</Button>
          {average !== null && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold">Average:</h3>
              <p className="text-2xl font-bold">{average.toFixed(2)}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <ContentDisplay
        title="What is an Average Calculator?"
        content={
          <div className="space-y-4">
            <p>An Average Calculator is a simple yet powerful tool used to find the central value of a set of numbers. The average, also known as the mean, provides a single value that represents the typical or central tendency of the data. This calculator is widely used in various fields, including education, finance, and science, to summarize data and make it more understandable. Whether you're a student calculating your grade point average, a researcher analyzing experimental data, or a business owner tracking sales figures, an average calculator is an indispensable tool for quick and accurate calculations.</p>
            <p>The primary purpose of an Average Calculator is to simplify the process of finding the mean of a list of numbers. Instead of manually summing up all the values and then dividing by the count, this tool automates the entire process, saving you time and reducing the likelihood of errors. It is particularly useful when dealing with large datasets, where manual calculations can be tedious and prone to mistakes. By providing a quick and reliable way to compute the average, this calculator empowers users to make data-driven decisions with confidence.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of an Average Calculator"
        content={
          <div className="space-y-4">
            <p>To calculate the average, the tool relies on a few basic components that work together to process the input and deliver the result. Understanding these components can help you appreciate the simplicity and effectiveness of the calculator.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Input Numbers:</strong> This is the list of numbers for which you want to find the average. You can enter them as a comma-separated list, making it easy to input multiple values at once. The calculator is designed to handle both integers and decimal numbers.</li>
              <li><strong>Summation Logic:</strong> The calculator first calculates the sum of all the numbers you've entered. This is the total value of all the data points combined.</li>
              <li><strong>Count of Numbers:</strong> The tool also determines the total count of the numbers in your list. This is the number of data points you are averaging.</li>
              <li><strong>Division Operation:</strong> Finally, the calculator divides the sum of the numbers by the total count. The result of this division is the average, or mean, of the dataset.</li>
            </ul>
            <p>These components are integrated into a user-friendly interface that makes it easy to perform calculations without any hassle. The tool is designed to be intuitive, allowing you to get the average you need with just a few clicks.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the Average Calculator"
        content={
          <div className="space-y-4">
            <p>Using the Average Calculator is a simple and straightforward process. Follow these steps to get your result:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Enter the Numbers:</strong> In the input field, type the numbers you want to average. Make sure to separate each number with a comma. For example, if you want to find the average of 10, 20, and 30, you would enter "10, 20, 30".</li>
              <li><strong>Click "Calculate":</strong> Once you have entered all the numbers, click the "Calculate" button. The tool will process the data instantly.</li>
              <li><strong>View the Average:</strong> The calculator will display the average of the numbers you entered. The result is typically shown with a few decimal places to ensure accuracy.</li>
            </ol>
            <p>You can use this calculator for a wide range of applications, from calculating your average monthly expenses to determining the average score on a test. It's a versatile tool that can handle any set of numbers you throw at it.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Can I use negative numbers?</h4>
              <p>Yes, the Average Calculator supports both positive and negative numbers. Simply enter the negative numbers with a minus sign, and the tool will include them in the calculation.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">What happens if I enter non-numeric characters?</h4>
              <p>The calculator is designed to ignore any non-numeric characters you enter. It will only consider the valid numbers in your list for the calculation, ensuring that you get an accurate result without any errors.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Is there a limit to the number of values I can enter?</h4>
              <p>While there may be a practical limit depending on the system, the calculator is designed to handle a large number of values. For most everyday calculations, you won't have to worry about exceeding any limits.</p>
            </div>
          </div>
        }
      />
      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the concept of the arithmetic mean, or average, was developed by the ancient Greeks? They used it to find a "middle ground" in various philosophical and mathematical problems. The term "average" itself, however, comes from the Arabic word "awariya," which meant "damaged goods." It was used in maritime law to describe the financial loss when goods were divided among merchants. Over time, the term evolved to mean a "mean" or "middle" value, reflecting its journey from commerce to mathematics.</p>
        }
      />

    </>
  );
};

export default AverageCalculatorTool;
