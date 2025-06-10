import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as cardValidator from 'card-validator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

const CreditCardValidatorTool = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [validationResult, setValidationResult] = useState<any | null>(null);

  const handleValidate = () => {
    const result = cardValidator.number(cardNumber);
    setValidationResult(result);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Credit Card Validator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Input
              type="text"
              placeholder="Enter credit card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <Button onClick={handleValidate}>Validate</Button>
          </div>
          {validationResult && (
            <div className="text-lg bg-muted/20 p-4 rounded-lg">
              <p>Is Valid: <span className={validationResult.isValid ? 'text-green-500' : 'text-red-500'}>{validationResult.isValid ? 'Yes' : 'No'}</span></p>
              {validationResult.card && <p>Card Type: {validationResult.card.type}</p>}
            </div>
          )}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is a Credit Card Validator?</h2>
        <p className="text-lg">
          A Credit Card Validator is a tool that checks if a credit card number is formatted correctly according to industry standards. It does not check if the card is active or has sufficient funds. Instead, it performs a mathematical check using the Luhn algorithm to determine if the sequence of digits is plausible for a credit card number. It can also identify the card issuer (like Visa, Mastercard, or American Express) based on the number's prefix. This tool is primarily used by developers and testers to validate user input in forms and to ensure that their payment processing systems are correctly handling different card types before sending a transaction to a payment gateway.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors in Credit Card Validation</h3>
          <p>
            The validation process relies on a few key factors that are standard across the credit card industry:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>The Luhn Algorithm:</strong> This is the core of the validation process. The Luhn algorithm (also known as the "modulus 10" or "mod 10" algorithm) is a simple checksum formula used to validate a variety of identification numbers, including credit card numbers. It was designed to protect against accidental errors, not malicious attacks. Our tool runs this check to determine if the number is mathematically valid.</li>
            <li><strong>Issuer Identification Number (IIN):</strong> The first 1-6 digits of a credit card number identify the card network. For example, Visa numbers start with a 4, Mastercard with numbers from 51-55, and American Express with 34 or 37. The validator uses this prefix to identify the potential card type.</li>
            <li><strong>Card Number Length:</strong> Different card networks have specific lengths for their card numbers. For instance, Visa and Mastercard typically have 16 digits, while American Express has 15. The validator checks if the number's length matches the expected length for the identified card type.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of Our Validator</h3>
          <p>
            Our validator is designed for clarity and ease of use.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Card Number Input:</strong> A field where you can enter the credit card number you want to validate.</li>
            <li><strong>Validate Button:</strong> This button initiates the validation check.</li>
            <li><strong>Results Display:</strong> This area shows the outcome of the validation, including whether the number is valid according to the Luhn algorithm and the identified card type.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use the Credit Card Validator</h3>
          <p>
            Validating a credit card number is a quick and easy process.
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Enter the Card Number:</strong> Type or paste the credit card number into the input field.</li>
            <li><strong>Click Validate:</strong> Press the "Validate" button.</li>
            <li><strong>Review the Results:</strong> The tool will immediately tell you if the number is valid and what type of card it is.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Does this tool check if a credit card is real or has money?</AccordionTrigger>
              <AccordionContent>
                No. This tool only performs a mathematical check on the number itself. It cannot connect to any financial network to verify if a card is active, has been issued by a bank, or has a balance. It is strictly for format validation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Why is credit card validation important for a website?</AccordionTrigger>
              <AccordionContent>
                Validating the card number format on your website before sending it to a payment gateway is a good practice. It can catch simple user typos (like a mistyped digit) early, providing a better user experience by giving immediate feedback. It also reduces the number of invalid requests sent to your payment processor, which can sometimes save on transaction fees.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it safe to enter a real credit card number here?</AccordionTrigger>
              <AccordionContent>
                While our tool performs all calculations directly in your browser and does not store or transmit the numbers you enter, we strongly recommend against entering your real credit card numbers into any online tool. This tool is intended for use with test numbers, such as those generated by our Credit Card Generator.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>What does it mean if a card is "valid" but the card type is unknown?</AccordionTrigger>
              <AccordionContent>
                This means the number passes the Luhn algorithm check, so it's a mathematically plausible identification number. However, its prefix (the IIN) does not match the known patterns for major credit card brands like Visa or Mastercard. This could mean it's a card from a smaller, regional network, a non-financial card that uses the Luhn algorithm, or simply a made-up number that happens to pass the check.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            The Luhn algorithm was created by IBM scientist Hans Peter Luhn in 1954. He never intended it to be a security feature. Its purpose was to be a simple error-detection method for systems where data was transcribed by hand, like on punch cards. It's effective at catching any single-digit error, as well as most transpositions of adjacent digits, which are the most common human data entry mistakes. Its simplicity and effectiveness are why it's still used over 60 years later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreditCardValidatorTool;
