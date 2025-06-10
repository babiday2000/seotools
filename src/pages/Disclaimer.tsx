import { Seo } from '@/components/Seo';

const DisclaimerPage = () => {
  return (
    <>
      <Seo 
        title="Disclaimer | Seotooler"
        description="Read the disclaimer for Seotooler. Understand the terms of use, limitations of liability, and important information regarding the tools and content provided on our website."
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Disclaimer for Seotooler</h1>
        <br />
        <div className="prose max-w-none">
          <p>Last updated: June 10, 2025</p>
          
          <p>If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at support@seotooler.com.</p>

          <h2>Disclaimers for Seotooler</h2>
          <br />
          <p>All the information on this website - seotooler.com - is published in good faith and for general information purpose only. Seotooler does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (Seotooler), is strictly at your own risk. Seotooler will not be liable for any losses and/or damages in connection with the use of our website.</p>

          <h2>External Links Disclaimer</h2>
          <br />
          <p>From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone 'bad'.</p>
          <p>Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their "Terms of Service" before engaging in any business or uploading any information.</p>

          <h2>Professional Disclaimer</h2>
          <br />
          <p>The Site cannot and does not contain professional advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of professional advice. The use or reliance of any information contained on this site is solely at your own risk.</p>

          <h2>Affiliates Disclaimer</h2>
          <br />
          <p>This Site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links. Our affiliates include the following: ...</p>

          <h2>Consent</h2>
          <br />
          <p>By using our website, you hereby consent to our disclaimer and agree to its terms.</p>

          <h2>Update</h2>
          <br />
          <p>Should we update, amend or make any changes to this document, those changes will be prominently posted here.</p>
          
          <h2>Contact Us</h2>
          <br />
          <p>If you have any questions about this Disclaimer, You can contact us:</p>
          <ul>
            <li>By email: support@seotooler.com</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DisclaimerPage;
