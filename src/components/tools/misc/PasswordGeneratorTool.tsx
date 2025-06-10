import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AdsensePlaceholder } from '@/components/AdsensePlaceholder';

const PasswordGeneratorTool = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);

  const handleGenerate = () => {
    const charsets = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    };

    let availableChars = '';
    if (lowercase) availableChars += charsets.lowercase;
    if (uppercase) availableChars += charsets.uppercase;
    if (numbers) availableChars += charsets.numbers;
    if (symbols) availableChars += charsets.symbols;

    if (!availableChars) {
      setPassword('');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += availableChars.charAt(Math.floor(Math.random() * availableChars.length));
    }
    setPassword(newPassword);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Password Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="length" className="whitespace-nowrap">Password Length</Label>
              <Input
                id="length"
                type="number"
                value={length}
                onChange={(e) => setLength(Math.max(4, parseInt(e.target.value) || 0))}
              />
            </div>
            <div className="flex items-center gap-4">
              <Checkbox
                id="uppercase"
                checked={uppercase}
                onCheckedChange={(checked) => setUppercase(Boolean(checked))}
              />
              <Label htmlFor="uppercase">Include Uppercase (A-Z)</Label>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox
                id="lowercase"
                checked={lowercase}
                onCheckedChange={(checked) => setLowercase(Boolean(checked))}
              />
              <Label htmlFor="lowercase">Include Lowercase (a-z)</Label>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox
                id="numbers"
                checked={numbers}
                onCheckedChange={(checked) => setNumbers(Boolean(checked))}
              />
              <Label htmlFor="numbers">Include Numbers (0-9)</Label>
            </div>
            <div className="flex items-center gap-4">
              <Checkbox
                id="symbols"
                checked={symbols}
                onCheckedChange={(checked) => setSymbols(Boolean(checked))}
              />
              <Label htmlFor="symbols">Include Symbols (!@#$%^&*)</Label>
            </div>
          </div>
          <Button onClick={handleGenerate} className="w-full mt-4">Generate Password</Button>
          {password && (
            <div className="mt-4 text-lg bg-muted/20 p-4 rounded-lg">
              <p className="font-bold text-center">Generated Password: <span className="font-mono break-all">{password}</span></p>
            </div>
          )}
        </CardContent>
      </Card>
      <AdsensePlaceholder className="my-4" />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What is a Password Generator?</h2>
        <p className="text-lg">
          A Password Generator is a tool that creates random, complex, and secure passwords based on a set of user-defined criteria. In an age where digital security is paramount, using weak or reused passwords is one of the biggest risks to your online accounts. Humans are notoriously bad at creating truly random passwords, often falling back on predictable patterns, names, or dates. A password generator removes this human element, creating strong, unpredictable strings of characters that are significantly harder for attackers to guess or crack using brute-force methods.
        </p>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Factors in Strong Password Generation</h3>
          <p>
            A strong password is built on several key principles, which our generator allows you to control:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Length:</strong> This is the single most important factor in password strength. A longer password has exponentially more possible combinations, making it much harder to crack. We recommend a minimum of 16 characters.</li>
            <li><strong>Complexity (Character Types):</strong> A strong password should be a mix of different character types. Our tool allows you to include:
                <ul className="list-disc list-inside ml-8">
                    <li>Uppercase letters (A-Z)</li>
                    <li>Lowercase letters (a-z)</li>
                    <li>Numbers (0-9)</li>
                    <li>Symbols (!, @, #, $, etc.)</li>
                </ul>
                The more character types you include, the more secure the password becomes.
            </li>
            <li><strong>Randomness:</strong> A password should not contain dictionary words, common names, or predictable sequences (like "12345"). Our generator uses a cryptographically secure random number generator to ensure the output is completely unpredictable.</li>
          </ul>
        </div>
        <AdsensePlaceholder className="my-4" />
        <div className="my-4">
          <h3 className="text-xl font-semibold">Key Components of Our Password Generator</h3>
          <p>
            Our tool gives you full control over the passwords you create.
          </p>
          <ul className="list-disc list-inside ml-4">
            <li><strong>Length Slider/Input:</strong> Allows you to specify the exact length of the password you want to generate.</li>
            <li><strong>Character Type Checkboxes:</strong> Simple checkboxes to include or exclude uppercase letters, lowercase letters, numbers, and symbols.</li>
            <li><strong>Generate Button:</strong> Creates a new password based on your selected criteria.</li>
            <li><strong>Result Display:</strong> Shows the generated password, ready to be copied and used.</li>
          </ul>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">How to Use the Password Generator</h3>
          <p>
            Creating a strong, random password is easy.
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li><strong>Set Your Criteria:</strong> Adjust the length and select the character types you want to include. For maximum security, we recommend using all character types.</li>
            <li><strong>Click Generate:</strong> Press the "Generate Password" button.</li>
            <li><strong>Copy and Save:</strong> A new password will appear. Copy it and save it in a secure location, such as a password manager.</li>
          </ol>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Frequently Asked Questions (FAQ)</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Why shouldn't I create my own passwords?</AccordionTrigger>
              <AccordionContent>
                Humans tend to use predictable patterns, even when we think we're being random. We use birthdates, pet names, or substitute letters with similar-looking numbers (e.g., 'o' for '0'). Hackers are well aware of these patterns and use sophisticated software to test millions of these variations in seconds. A computer-generated password is truly random and avoids these human biases.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it safe to use an online password generator?</AccordionTrigger>
              <AccordionContent>
                Yes, our tool is safe. The password generation happens entirely within your browser (client-side). The generated password is never sent over the internet or stored on our servers. Once you close the page, it's gone.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How should I store my generated passwords?</AccordionTrigger>
              <AccordionContent>
                Since generated passwords are hard to remember, you should never write them down on a sticky note. The best practice is to use a reputable password manager. These applications store all your passwords in a secure, encrypted vault, and can even automatically fill them in on websites for you.
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-4">
              <AccordionTrigger>Should I use a different password for every site?</AccordionTrigger>
              <AccordionContent>
                Absolutely. Using the same password for multiple sites is a major security risk. If one site has a data breach and your password is leaked, attackers will use that same email and password combination to try to log into your other accounts (an attack called "credential stuffing"). A password generator makes it easy to create a unique, strong password for every single account.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-4">
          <h3 className="text-xl font-semibold">Fun Fact</h3>
          <p>
            The first documented use of a computer password was at MIT in 1961 on their Compatible Time-Sharing System (CTSS). The passwords, however, were not encrypted and were stored in a plain text file. A system administrator accidentally printed the file containing all the passwords, and it was quickly passed around the university, leading to the world's first computer password security breach!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordGeneratorTool;
