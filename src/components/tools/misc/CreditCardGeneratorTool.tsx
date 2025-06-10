import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

interface CardDetails {
  number: string;
  cvv: string;
  exp: string;
}

const CreditCardGeneratorTool = () => {
  const [cardType, setCardType] = useState('visa');
  const [generatedCard, setGeneratedCard] = useState<CardDetails | null>(null);

  const generateCard = (type: string) => {
    const create = (bin: string, length: number) => {
      let cardNumber = bin;
      while (cardNumber.length < length - 1) {
        cardNumber += Math.floor(Math.random() * 10);
      }
      let sum = 0;
      for (let i = 0; i < cardNumber.length; i++) {
        let digit = parseInt(cardNumber[i]);
        if ((i + length) % 2 === 0) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        sum += digit;
      }
      const checkDigit = (10 - (sum % 10)) % 10;
      cardNumber += checkDigit;
      return cardNumber;
    };

    let number;
    if (type === 'visa') {
      number = create('4', 16);
    } else if (type === 'mastercard') {
      number = create('5', 16);
    } else {
      number = create('37', 15);
    }

    const cvv = type === 'amex'
      ? Math.floor(1000 + Math.random() * 9000).toString()
      : Math.floor(100 + Math.random() * 900).toString();
    const expMonth = Math.floor(Math.random() * 12) + 1;
    const expYear = new Date().getFullYear() + Math.floor(Math.random() * 5) + 2;
    const exp = `${expMonth.toString().padStart(2, '0')}/${expYear.toString().slice(-2)}`;

    setGeneratedCard({ number, cvv, exp });
  };

  useEffect(() => {
    generateCard(cardType);
  }, []);

  const handleGenerate = () => {
    generateCard(cardType);
  };
  
  const handleCardTypeChange = (type: string) => {
    setCardType(type);
    generateCard(type);
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Credit Card Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Select onValueChange={handleCardTypeChange} defaultValue={cardType}>
              <SelectTrigger>
                <SelectValue placeholder="Select card type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visa">Visa</SelectItem>
                <SelectItem value="mastercard">Mastercard</SelectItem>
                <SelectItem value="amex">American Express</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleGenerate}>Generate</Button>
          </div>
          {generatedCard && (
            <div className="mt-4 space-y-2">
              <div className="text-lg bg-muted/20 p-4 rounded-lg flex items-center justify-between">
                <span className="font-mono">{generatedCard.number}</span>
                <Button
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(generatedCard.number)}
                >
                  Copy
                </Button>
              </div>
              <div className="text-md bg-muted/20 p-2 rounded-lg flex justify-between">
                <span>Expires: <span className="font-mono">{generatedCard.exp}</span></span>
                <span>CVV: <span className="font-mono">{generatedCard.cvv}</span></span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is a Credit Card Generator?</h2>
        <p className="text-lg">
          A Credit Card Generator is a tool that creates valid, but fake, credit card numbers for testing and verification purposes. These generated numbers adhere to the formatting rules of real credit card numbers, including the Luhn algorithm, which is a checksum formula used to validate a variety of identification numbers. It's crucial to understand that these are not real credit card numbers and have no actual value. They cannot be used to make purchases. Their primary purpose is to provide developers, testers, and educators with a reliable way to test payment gateways, e-commerce websites, and other systems that require credit card input, without using real financial data.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors Behind Credit Card Number Generation</h3>
          <p>
            The generation of a valid credit card number isn't random; it's based on a set of well-defined rules and industry standards:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Issuer Identification Number (IIN):</strong> The first six digits of a credit card number are the IIN (also known as the Bank Identification Number or BIN). This prefix identifies the institution that issued the card. For example, Visa cards typically start with a 4, Mastercard with a 5, and American Express with a 34 or 37.</li>
            <li><strong>Luhn Algorithm:</strong> This is the most critical factor. The Luhn algorithm is a simple checksum formula used to validate the credit card number. The generator creates a sequence of digits and then calculates the final digit (the "check digit") to ensure the entire number passes the Luhn check. This is why the generated numbers are considered "valid" in format.</li>
            <li><strong>Card Number Length:</strong> Different card issuers have different number lengths. For example, Visa and Mastercard numbers are typically 16 digits long, while American Express numbers are 15 digits.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of Our Generator</h3>
          <p>
            Our tool is designed to be both powerful and easy to use.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Card Type Selector:</strong> A dropdown menu that allows you to choose the type of credit card you want to generate, such as Visa, Mastercard, or American Express.</li>
            <li><strong>Generate Button:</strong> The button that initiates the generation process based on the selected card type.</li>
            <li><strong>Result Display:</strong> A clear display area where the newly generated, valid, fake credit card number appears.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use the Credit Card Generator</h3>
          <p>
            Generating a test credit card number takes just two simple steps:
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Select Card Type:</strong> Choose the desired card brand (e.g., Visa) from the dropdown list.</li>
            <li><strong>Click Generate:</strong> Press the "Generate" button. A valid, fake credit card number will instantly appear in the result box. You can copy this number to use in your testing environment.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Can I use these credit card numbers to buy things?</AccordionTrigger>
              <AccordionContent>
                Absolutely not. The generated numbers are mathematically valid according to the Luhn algorithm, but they are not associated with any real bank account, do not have real funds, and will be declined by any real payment processor. They are for testing and validation purposes only.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it legal to generate and use these numbers?</AccordionTrigger>
              <AccordionContent>
                Yes, it is perfectly legal to generate and use these numbers for their intended purpose, which is software testing and development. Since they are not real credit card numbers and cannot be used for fraudulent transactions, there are no legal issues with using them for testing.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Why do developers need fake credit card numbers?</AccordionTrigger>
              <AccordionContent>
                When building an e-commerce site or any application that processes payments, developers need to test the payment form and validation logic thoroughly. Using real credit card numbers for this is risky and impractical. Fake numbers that pass the initial format validation (like the Luhn check) allow them to test the system's functionality without involving real money or sensitive data.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>Do these numbers come with an expiration date and CVV?</AccordionTrigger>
              <AccordionContent>
                Our basic generator provides just the card number. For testing purposes, developers can typically use any future date as the expiration date (e.g., 12/25) and any 3 or 4-digit number as the CVV (e.g., 123). Many online test environments are configured to accept these generic values when using test card numbers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            The Luhn algorithm, used to validate credit card numbers, was developed by an IBM scientist named Hans Peter Luhn in 1954. It was designed to protect against accidental errors, such as a mistyped digit, not to be a cryptographically secure system. Its patent was granted in 1960, and it has since been adopted for a wide variety of uses beyond credit cards, including for validating IMEI numbers on mobile phones and National Provider Identifier numbers in the US healthcare system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreditCardGeneratorTool;
