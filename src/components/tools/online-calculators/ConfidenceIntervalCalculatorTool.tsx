import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from './ContentDisplay';
const ConfidenceIntervalCalculatorTool = () => {
  const [sampleMean, setSampleMean] = useState('');
  const [sampleSize, setSampleSize] = useState('');
  const [stdDev, setStdDev] = useState('');
  const [confidenceLevel, setConfidenceLevel] = useState('95');
  const [confidenceInterval, setConfidenceInterval] = useState<{ lower: number; upper: number } | null>(null);

  const handleCalculate = () => {
    const mean = parseFloat(sampleMean);
    const size = parseInt(sampleSize);
    const dev = parseFloat(stdDev);
    const level = parseFloat(confidenceLevel);

    if (isNaN(mean) || isNaN(size) || isNaN(dev) || isNaN(level)) {
      toast.error('Please enter valid numbers in all fields.');
      return;
    }

    const zScore: { [key: string]: number } = {
      '80': 1.28,
      '85': 1.44,
      '90': 1.645,
      '95': 1.96,
      '99': 2.576,
    };

    const z = zScore[confidenceLevel];
    if (!z) {
      toast.error('Please select a valid confidence level.');
      return;
    }

    const marginOfError = z * (dev / Math.sqrt(size));
    const lowerBound = mean - marginOfError;
    const upperBound = mean + marginOfError;

    setConfidenceInterval({ lower: lowerBound, upper: upperBound });
    toast.success('Confidence interval calculated successfully!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Confidence Interval Calculator</CardTitle>
          <CardDescription>Calculate the confidence interval for a sample.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              type="number"
              placeholder="Sample Mean"
              value={sampleMean}
              onChange={(e) => setSampleMean(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Sample Size"
              value={sampleSize}
              onChange={(e) => setSampleSize(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Standard Deviation"
              value={stdDev}
              onChange={(e) => setStdDev(e.target.value)}
            />
            <select
              title="Confidence Level"
              value={confidenceLevel}
              onChange={(e) => setConfidenceLevel(e.target.value)}
              className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-card"
            >
              <option value="80" className="bg-card text-card-foreground">80%</option>
              <option value="85" className="bg-card text-card-foreground">85%</option>
              <option value="90" className="bg-card text-card-foreground">90%</option>
              <option value="95" className="bg-card text-card-foreground">95%</option>
              <option value="99" className="bg-card text-card-foreground">99%</option>
            </select>
          </div>
          <Button onClick={handleCalculate}>Calculate</Button>
          {confidenceInterval && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold">Confidence Interval:</h3>
              <p className="text-2xl font-bold">
                ({confidenceInterval.lower.toFixed(2)}, {confidenceInterval.upper.toFixed(2)})
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <ContentDisplay
        title="What is a Confidence Interval Calculator?"
        content={
          <div className="space-y-4">
            <p>A Confidence Interval Calculator is a statistical tool that provides a range of values within which the true population parameter, such as the mean, is likely to lie. Instead of giving a single point estimate, a confidence interval offers a range, which acknowledges the uncertainty inherent in using a sample to estimate the characteristics of an entire population. This tool is essential for researchers, analysts, and students in fields like statistics, market research, and quality control, as it provides a more nuanced and realistic understanding of data.</p>
            <p>The primary purpose of this calculator is to quantify the level of confidence you can have in your sample data. For example, a 95% confidence interval means that if you were to take 100 different samples and compute a confidence interval for each, about 95 of those intervals would contain the true population mean. This helps in making more informed decisions, as it provides a measure of the reliability of your estimates. It is a fundamental concept in inferential statistics, allowing you to draw conclusions about a population from a smaller, more manageable sample.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of a Confidence Interval Calculator"
        content={
          <div className="space-y-4">
            <p>To calculate a confidence interval, the tool requires several key inputs that describe your sample data. Understanding these components is crucial for interpreting the results correctly.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Sample Mean (x̄):</strong> This is the average of your sample data. It serves as the center of your confidence interval and is your best point estimate for the population mean.</li>
              <li><strong>Sample Size (n):</strong> This is the number of observations in your sample. A larger sample size generally leads to a narrower, more precise confidence interval, as it reduces the uncertainty of your estimate.</li>
              <li><strong>Standard Deviation (σ):</strong> This measures the amount of variation or dispersion in your sample data. A smaller standard deviation indicates that the data points are close to the mean, resulting in a narrower confidence interval.</li>
              <li><strong>Confidence Level:</strong> This is the probability that the confidence interval will contain the true population parameter. Common confidence levels are 90%, 95%, and 99%. The choice of confidence level depends on the level of certainty required for your analysis.</li>
            </ul>
            <p>The calculator uses these components along with a Z-score, which corresponds to the chosen confidence level, to compute the margin of error. The confidence interval is then constructed by adding and subtracting this margin of error from the sample mean. This provides a lower and upper bound for your estimate of the population mean.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the Confidence Interval Calculator"
        content={
          <div className="space-y-4">
            <p>Using the Confidence Interval Calculator is a straightforward process. Follow these steps to obtain your confidence interval:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Enter the Sample Mean:</strong> In the first field, input the average of your sample data.</li>
              <li><strong>Enter the Sample Size:</strong> In the second field, provide the total number of observations in your sample.</li>
              <li><strong>Enter the Standard Deviation:</strong> In the third field, input the standard deviation of your sample.</li>
              <li><strong>Select the Confidence Level:</strong> Choose your desired confidence level from the dropdown menu. The most common choice is 95%.</li>
              <li><strong>Click "Calculate":</strong> Once all the information is entered, click the "Calculate" button. The tool will display the lower and upper bounds of the confidence interval.</li>
            </ol>
            <p>The resulting interval gives you a range of plausible values for the true population mean, based on your sample data and chosen level of confidence. This is far more informative than a single point estimate and is a cornerstone of sound statistical practice.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">What does a 95% confidence interval really mean?</h4>
              <p>It means that if you were to repeat your study or survey many times, 95% of the confidence intervals you calculate would contain the true population mean. It does not mean there is a 95% probability that the true mean lies within your specific interval.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">When should I use a t-distribution instead of a Z-distribution?</h4>
              <p>You should use a t-distribution when the population standard deviation is unknown and the sample size is small (typically n {'<'} 30). This calculator uses the Z-distribution, which is appropriate for larger sample sizes or when the population standard deviation is known.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">How can I get a narrower confidence interval?</h4>
              <p>To get a narrower, more precise confidence interval, you can either increase your sample size or decrease your confidence level. A larger sample provides more information about the population, reducing uncertainty, while a lower confidence level results in a smaller margin of error.</p>
            </div>
          </div>
        }
      />
      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the concept of confidence intervals was developed by Jerzy Neyman in the 1930s? Neyman, a Polish mathematician and statistician, introduced the idea as a way to provide a range of plausible values for an unknown parameter, rather than just a single point estimate. This was a groundbreaking development in the field of statistics, as it allowed researchers to express the uncertainty associated with their estimates in a clear and intuitive way. Today, confidence intervals are a fundamental tool in statistical inference, used in fields ranging from medicine and engineering to economics and social sciences.</p>
        }
      />

    </>
  );
};

export default ConfidenceIntervalCalculatorTool;
