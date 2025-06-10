import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from './ContentDisplay';
const ProbabilityCalculatorTool = () => {
  const [favorableOutcomes, setFavorableOutcomes] = useState('');
  const [totalOutcomes, setTotalOutcomes] = useState('');
  const [probability, setProbability] = useState<number | null>(null);

  const handleCalculate = () => {
    const numFavorable = parseInt(favorableOutcomes);
    const numTotal = parseInt(totalOutcomes);

    if (isNaN(numFavorable) || isNaN(numTotal)) {
      toast.error('Please enter valid numbers in all fields.');
      return;
    }

    if (numTotal === 0) {
      toast.error('Total outcomes cannot be zero.');
      return;
    }

    if (numFavorable > numTotal) {
      toast.error('Favorable outcomes cannot be greater than total outcomes.');
      return;
    }

    const calculatedProbability = (numFavorable / numTotal) * 100;
    setProbability(calculatedProbability);
    toast.success('Probability calculated successfully!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Probability Calculator</CardTitle>
          <CardDescription>Calculate the probability of an event.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              type="number"
              placeholder="Number of Favorable Outcomes"
              value={favorableOutcomes}
              onChange={(e) => setFavorableOutcomes(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Total Number of Outcomes"
              value={totalOutcomes}
              onChange={(e) => setTotalOutcomes(e.target.value)}
            />
          </div>
          <Button onClick={handleCalculate}>Calculate</Button>
          {probability !== null && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold">Probability:</h3>
              <p className="text-2xl font-bold">{probability.toFixed(2)}%</p>
            </div>
          )}
        </CardContent>
      </Card>
      <ContentDisplay
        title="What is a Probability Calculator?"
        content={
          <div className="space-y-4">
            <p>A Probability Calculator is a tool that helps you determine the likelihood of a specific event occurring. Probability is a fundamental concept in mathematics and statistics, and it is used to quantify uncertainty. This calculator allows you to compute the probability of an event by inputting the number of favorable outcomes and the total number of possible outcomes. It is an invaluable tool for students, researchers, and anyone interested in understanding the chances of a particular result in a given scenario.</p>
            <p>The primary purpose of a Probability Calculator is to make it easy to calculate the likelihood of an event without having to perform the division manually. It is widely used in various fields, including gaming, finance, and science, to assess risk and make informed decisions. Whether you're trying to determine the odds of winning a lottery, the chance of a particular outcome in a game, or the likelihood of a specific result in a scientific experiment, this calculator provides a quick and accurate way to find the answer.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of a Probability Calculator"
        content={
          <div className="space-y-4">
            <p>To calculate the probability of an event, the tool relies on two key inputs that define the scenario. Understanding these components is essential for using the calculator correctly.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Number of Favorable Outcomes:</strong> This is the number of outcomes that you are interested in. For example, if you are rolling a six-sided die and want to know the probability of rolling a 3, the number of favorable outcomes is 1.</li>
              <li><strong>Total Number of Outcomes:</strong> This is the total number of possible outcomes in the scenario. In the case of a six-sided die, the total number of outcomes is 6, as there are six possible faces the die can land on.</li>
              <li><strong>Calculation Formula:</strong> The calculator uses the basic probability formula: Probability = (Number of Favorable Outcomes / Total Number of Outcomes) * 100. The result is expressed as a percentage, making it easy to understand.</li>
            </ul>
            <p>By providing these two values, you can quickly determine the probability of any event. The calculator is designed to be intuitive and user-friendly, allowing you to get the information you need with minimal effort.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the Probability Calculator"
        content={
          <div className="space-y-4">
            <p>Using the Probability Calculator is a simple and straightforward process. Follow these steps to get your result:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Enter the Number of Favorable Outcomes:</strong> In the first input field, type the number of outcomes that you consider a success.</li>
              <li><strong>Enter the Total Number of Outcomes:</strong> In the second input field, enter the total number of possible outcomes.</li>
              <li><strong>Click "Calculate":</strong> Press the "Calculate" button. The tool will instantly compute and display the probability as a percentage.</li>
            </ol>
            <p>This calculator can be used for a wide range of applications, from simple coin flips to more complex scenarios involving multiple variables. It's a versatile tool that can help you understand the likelihood of various events in your daily life.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">What is the range of probability values?</h4>
              <p>The probability of an event is always a number between 0 and 1, inclusive. A probability of 0 means the event is impossible, while a probability of 1 means the event is certain. This calculator expresses the probability as a percentage, so the range is from 0% to 100%.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Can I calculate the probability of multiple events?</h4>
              <p>This calculator is designed to compute the probability of a single event. To find the probability of multiple events (e.g., the probability of two independent events both occurring), you would typically need to perform additional calculations, such as multiplying their individual probabilities.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">What if the number of favorable outcomes is greater than the total outcomes?</h4>
              <p>The number of favorable outcomes cannot be greater than the total number of possible outcomes. If you enter such values, the calculator will display an error message, as this is a logical impossibility in probability theory.</p>
            </div>
          </div>
        }
      />
      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the formal study of probability began in the 17th century through a series of letters between two of the greatest mathematicians of the time, Blaise Pascal and Pierre de Fermat? Their correspondence was initially about a gambling problem, specifically how to divide the stakes in a game of chance that was interrupted. Their work laid the foundation for modern probability theory, which is now a fundamental branch of mathematics with applications in countless fields, from insurance and finance to quantum mechanics.</p>
        }
      />

    </>
  );
};

export default ProbabilityCalculatorTool;
