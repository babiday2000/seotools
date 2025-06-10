import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import ContentDisplay from './ContentDisplay';
const AgeCalculatorTool = () => {
  const [birthDate, setBirthDate] = useState<Date | undefined>(new Date());
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const handleCalculate = () => {
    if (!birthDate) {
      toast.error('Please enter your birth date.');
      return;
    }

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, birth.getDate());
      days = Math.floor((today.getTime() - prevMonth.getTime()) / (1000 * 60 * 60 * 24));
      months--;
    }
    
    setAge({ years, months, days });
    toast.success('Age calculated successfully!');
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Age Calculator</CardTitle>
          <CardDescription>Calculate your age based on your birth date.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'ghost'}
                  className={cn(
                    'justify-start text-left font-normal',
                    !birthDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {birthDate ? format(birthDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={birthDate}
                  onSelect={setBirthDate}
                  initialFocus
                  captionLayout="dropdown"
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  className="rounded-md border shadow-sm"
                />
              </PopoverContent>
            </Popover>
            <Button onClick={handleCalculate}>Calculate Age</Button>
          </div>
          {age && (
            <div className="pt-4">
              <h3 className="text-lg font-semibold">Your Age:</h3>
              <p className="text-2xl font-bold">{`${age.years} years, ${age.months} months, and ${age.days} days`}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <ContentDisplay
        title="What is an Age Calculator?"
        content={
          <div className="space-y-4">
            <p>An Age Calculator is a versatile digital tool designed to determine the precise age of an individual based on their date of birth. It provides a detailed breakdown of age in years, months, and days, offering a more accurate result than manual calculation. This tool is incredibly useful for a wide range of applications, from filling out official documents and planning age-specific events to simply satisfying personal curiosity. By automating the calculation process, it eliminates the risk of human error and provides instant, reliable results. Whether you need to know your exact age for a legal requirement or want to find out how many days you've been alive, an age calculator is the perfect solution.</p>
            <p>The primary function of an Age Calculator is to bridge the gap between two dates: the date of birth and the current date. It takes into account the complexities of the Gregorian calendar, including leap years and varying month lengths, to deliver a precise age. This makes it an indispensable tool for professionals in fields such as human resources, event planning, and education, where age verification is often required. For personal use, it can be a fun way to track milestones, celebrate birthdays, and gain a deeper appreciation for the passage of time. The calculator's user-friendly interface ensures that anyone can use it with ease, making it accessible to people of all ages and technical abilities.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Key Components of an Age Calculator"
        content={
          <div className="space-y-4">
            <p>To accurately calculate age, the tool relies on a few fundamental components that work together to process the input and deliver the result. Understanding these components can help you appreciate the logic behind the calculation.</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong>Date of Birth (DOB):</strong> This is the primary input required from the user. The DOB serves as the starting point for the calculation, and its accuracy is crucial for obtaining a correct result. The calculator parses this date to extract the year, month, and day of birth.</li>
              <li><strong>Current Date:</strong> The calculator automatically retrieves the current date from the system it's running on. This serves as the endpoint for the age calculation. The difference between the current date and the DOB is what determines the final age.</li>
              <li><strong>Calculation Logic:</strong> The core of the calculator is its algorithm, which computes the difference between the two dates. It subtracts the birth year, month, and day from the current year, month, and day, while also accounting for calendar rules. For example, it adjusts for borrowing days from months or months from years to ensure the final age is accurate. This logic also handles leap years, which can affect the number of days in a year.</li>
            </ul>
            <p>These components work in harmony to provide a seamless user experience. The user simply provides their date of birth, and the calculator handles the rest, performing the complex calculations in the background. The result is a clear and precise age, broken down into years, months, and days, giving you a comprehensive understanding of your age at any given moment.</p>
          </div>
        }
      />
      <ContentDisplay
        title="How to Use the Age Calculator"
        content={
          <div className="space-y-4">
            <p>Using the Age Calculator is a straightforward process that requires just a few simple steps. Here’s how to get started:</p>
            <ol className="list-decimal space-y-2 pl-6">
              <li><strong>Select Your Birth Date:</strong> Use the date picker to select your date of birth. You can navigate through the calendar to choose the correct year, month, and day.</li>
              <li><strong>Click "Calculate Age":</strong> Once you have entered your birth date, click the "Calculate Age" button. The tool will instantly perform the calculation.</li>
              <li><strong>View Your Age:</strong> The calculator will display your exact age in years, months, and days. You can use this information for any purpose, from official forms to personal interest.</li>
            </ol>
            <p>The tool is designed to be intuitive and efficient, providing you with the information you need without any unnecessary complexity. You can use it as many times as you like to calculate the age of friends, family members, or anyone else whose birth date you know.</p>
          </div>
        }
      />
      <ContentDisplay
        title="Frequently Asked Questions (FAQ)"
        content={
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Does the calculator account for leap years?</h4>
              <p>Yes, the Age Calculator is designed to account for leap years, ensuring that the calculation is accurate even for individuals born on February 29th. It correctly adjusts the number of days in a year to provide a precise result.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Can I calculate the age of someone who hasn't been born yet?</h4>
              <p>The calculator is designed to determine age based on a past date of birth. It does not support future dates, as it calculates the time that has elapsed since birth.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Is my data saved?</h4>
              <p>No, the Age Calculator does not store any personal information. Your birth date is used only for the calculation and is not saved or shared, ensuring your privacy and security.</p>
            </div>
          </div>
        }
      />
      <ContentDisplay
        title="Fun Fact"
        content={
          <p>Did you know that the concept of calculating age has been around for thousands of years? Ancient civilizations, such as the Egyptians and Romans, had their own methods for tracking age, often tied to significant events or ruling periods. The modern system of using birth certificates to officially document age became widespread in the 19th and 20th centuries, standardizing the process we use today.</p>
        }
      />

    </>
  );
};

export default AgeCalculatorTool;
