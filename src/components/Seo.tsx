import { Helmet } from 'react-helmet-async';

type SeoProps = {
  title: string;
  description: string;
  keywords?: string;
  name?: string;
  type?: string;
};

export function Seo({ title, description, keywords, name, type }: SeoProps) {
  return (
    <Helmet>
      { /* Standard metadata tags */ }
      <title>{title}</title>
      <meta name='description' content={description} />
      {keywords && <meta name='keywords' content={keywords} />}
      { /* End standard metadata tags */ }
      
      { /* Facebook tags */ }
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      { /* End Facebook tags */ }
      
      { /* Twitter tags */ }
      <meta name="twitter:creator" content={name || 'Seotooler'} />
      <meta name="twitter:card" content={type || 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      { /* End Twitter tags */ }
    </Helmet>
  );
}
