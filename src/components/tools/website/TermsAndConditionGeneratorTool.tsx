import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';

const TermsAndConditionGeneratorTool = () => {
  const [companyName, setCompanyName] = useState('');
  const [websiteName, setWebsiteName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [generatedTerms, setGeneratedTerms] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!companyName || !websiteName || !websiteUrl) return;
    const terms = `
Terms and Conditions for ${websiteName}

Last updated: ${new Date().toLocaleDateString()}

Please read these terms and conditions carefully before using Our Service.

Interpretation and Definitions
==============================

Interpretation
--------------

The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.

Definitions
-----------

For the purposes of this Terms and Conditions:

*   **Affiliate** means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.

*   **Country** refers to: India

*   **Company** (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to ${companyName}.

*   **Device** means any device that can access the Service such as a computer, a cellphone or a digital tablet.

*   **Service** refers to the Website.

*   **Terms and Conditions** (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.

*   **Third-party Social Media Service** means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.

*   **Website** refers to ${websiteName}, accessible from ${websiteUrl}

*   **You** means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.

Acknowledgment
==============

These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.

Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.

By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.

You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.

Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.

Links to Other Websites
=======================

Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.

The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.

We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.

Termination
===========

We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.

Upon termination, Your right to use the Service will cease immediately.

Limitation of Liability
=======================

Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.

To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, for loss of data or other information, for business interruption, for personal injury, for loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.

Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.

"AS IS" and "AS AVAILABLE" Disclaimer
=====================================

The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice.

Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.

Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.

Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.

Governing Law
=============

The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.

Disputes Resolution
===================

If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.

For European Union (EU) Users
=============================

If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.

United States Legal Compliance
================================

You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a "terrorist supporting" country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.

Severability and Waiver
=======================

Severability
------------

If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.

Waiver
------

Except as provided herein, the failure to exercise a right or to require performance of an obligation under this Terms shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall be the waiver of a breach constitute a waiver of any subsequent breach.

Translation Interpretation
==========================

These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.

Changes to These Terms and Conditions
=====================================

We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.

By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.

Contact Us
==========

If you have any questions about these Terms and Conditions, You can contact us:

*   By visiting this page on our website: [Your Contact Page URL]
*   By sending us an email: [Your Contact Email]
    `;
    setGeneratedTerms(terms.trim());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTerms);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Input
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <Input
            placeholder="Website Name"
            value={websiteName}
            onChange={(e) => setWebsiteName(e.target.value)}
          />
          <Input
            placeholder="Website URL"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
          />
        </div>
        <div className="relative">
          <Textarea
            placeholder="Generated Terms and Conditions will appear here..."
            className="h-96 text-base"
            value={generatedTerms}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            disabled={!generatedTerms}
          >
            {copied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <Button onClick={handleGenerate} disabled={!companyName || !websiteName || !websiteUrl}>
        Generate Terms
      </Button>

      <div className="max-w-4xl mx-auto space-y-12 text-left">
        <section>
          <h2 className="text-2xl font-bold tracking-tight">What Are Terms and Conditions?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Terms and Conditions (also known as Terms of Service or Terms of Use) are a set of legally binding rules and guidelines that a user must agree to in order to use your website, app, or service. This document forms a contract between you (the service provider) and your users, outlining the rights and responsibilities of both parties. It's the foundational legal framework that governs the use of your service.</p>
            <p>Unlike a Privacy Policy, which focuses on data handling, the Terms and Conditions define the rules of engagement. They cover a wide range of topics, including user conduct, intellectual property rights, payment terms, and limitations of liability. Having a clear and robust Terms and Conditions agreement is crucial for protecting your business, managing user expectations, and providing a legal basis for resolving disputes or terminating access for users who violate the rules.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Factors to Consider for Your Terms and Conditions</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A one-size-fits-all approach doesn't work for Terms and Conditions. Your agreement must be tailored to the specific nature of your business and services. Key factors to consider include:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Business Model:</strong> The rules for an e-commerce store will be very different from those for a SaaS application, a blog, or a social media platform.</li>
              <li><strong>User-Generated Content:</strong> If users can post content (comments, reviews, images), your terms must define ownership, grant you a license to use the content, and set rules for acceptable content.</li>
              <li><strong>User Accounts:</strong> If users can create accounts, you need to specify the rules for account creation, security, and termination.</li>
              <li><strong>Payments and Subscriptions:</strong> For paid services, your terms must clearly outline pricing, payment methods, billing cycles, and refund policies.</li>
              <li><strong>Geographic Jurisdiction:</strong> The laws of your country or state will govern the agreement. This is important for dispute resolution.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Key Components of a Terms and Conditions Agreement</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>A comprehensive Terms and Conditions document should include several essential clauses to protect your business:</p>
            <ul className="list-disc list-inside space-y-3 pl-4">
              <li><strong>Acceptance of Terms:</strong> A statement that by using the service, the user agrees to be bound by the terms.</li>
              <li><strong>Intellectual Property Rights:</strong> A clause clarifying that you own the content, logos, and trademarks on your site.</li>
              <li><strong>User Obligations and Prohibited Conduct:</strong> Rules about what users are not allowed to do on your service (e.g., spamming, hacking, posting illegal content).</li>
              <li><strong>Termination Clause:</strong> Your right to terminate a user's account or access to the service for violations of the terms.</li>
              <li><strong>Limitation of Liability:</strong> A disclaimer that limits your legal liability for any damages that may arise from the use of your service.</li>
              <li><strong>Disclaimer of Warranties:</strong> A statement that your service is provided "as is" and without any warranties.</li>
              <li><strong>Governing Law and Dispute Resolution:</strong> The jurisdiction whose laws will govern the agreement and how disputes will be handled (e.g., through arbitration).</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">How to Use Our Terms and Conditions Generator</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>Our generator simplifies the creation of a foundational Terms and Conditions document. Here’s how to use it effectively:</p>
            <ol className="list-decimal list-inside space-y-3 pl-4">
              <li><strong>Enter Your Information:</strong> Provide your company name, website name, and website URL in the designated fields.</li>
              <li><strong>Generate the Document:</strong> Click the "Generate Terms" button to create a template based on your details.</li>
              <li><strong>Review and Customize:</strong> This is a critical step. The generated text is a template, not a finished legal document. You must read it carefully and customize it to fit your specific business practices. Remove clauses that don't apply and add any that are unique to your service.</li>
              <li><strong>Consult a Professional:</strong> We strongly recommend that you have your final Terms and Conditions reviewed by a lawyer to ensure it is legally sound and provides adequate protection for your business.</li>
              <li><strong>Publish on Your Website:</strong> Place the final agreement on a dedicated page on your site and link to it from your footer and other relevant areas, such as during user registration.</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions (FAQ)</h2>
          <div className="mt-4 space-y-6">
            <div>
              <h3 className="font-semibold">Are Terms and Conditions legally required?</h3>
              <p className="text-muted-foreground mt-1">While not always mandated by a specific law in the same way a Privacy Policy is, Terms and Conditions are practically essential. They form a legal contract between you and your users. Without them, your intellectual property is not protected, and you have no legal grounds to terminate abusive user accounts.</p>
            </div>
            <div>
              <h3 className="font-semibold">How do I make my Terms and Conditions enforceable?</h3>
              <p className="text-muted-foreground mt-1">To make your terms enforceable, you need to obtain clear agreement from your users. This is typically done using a "clickwrap" method, where users must tick a box that says "I agree to the Terms and Conditions" before they can sign up or use your service.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I copy someone else's Terms and Conditions?</h3>
              <p className="text-muted-foreground mt-1">No. Terms and Conditions are a legal document that is protected by copyright. Copying another company's terms is copyright infringement. Furthermore, another company's terms will be tailored to their specific business and will not accurately reflect your own practices, leaving you unprotected.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight">Fun Fact</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>In 2010, a UK-based video game retailer, GameStation, added a clause to its online terms and conditions stating that customers who placed an order on April 1st agreed to grant the company "a non-transferable option to claim, for now and for ever more, your immortal soul." Over 7,500 customers unknowingly agreed to this "immortal soul clause" before the company revealed it was an April Fools' joke, highlighting how few people actually read the terms they agree to.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default TermsAndConditionGeneratorTool;
