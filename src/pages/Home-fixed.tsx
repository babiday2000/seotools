import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, BarChart, Link as LinkIcon, HelpCircle, TrendingUp, Zap } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { lazy, Suspense } from 'react';

// Lazy load non-critical components for better LCP
const Accordion = lazy(() => import('@/components/ui/accordion').then(module => ({ default: module.Accordion })));
const AccordionContent = lazy(() => import('@/components/ui/accordion').then(module => ({ default: module.AccordionContent })));
const AccordionItem = lazy(() => import('@/components/ui/accordion').then(module => ({ default: module.AccordionItem })));
const AccordionTrigger = lazy(() => import('@/components/ui/accordion').then(module => ({ default: module.AccordionTrigger })));

const features = [
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: 'YouTube Keyword Research',
    description: 'Find high-ranking keywords, analyze keyword difficulty, and get content ideas to attract more viewers to your YouTube channel.',
  },
  {
    icon: <BarChart className="h-8 w-8 text-primary" />,
    title: 'Video Rank Tracking',
    description: 'Monitor your YouTube video rankings for target keywords, track performance over time, and spy on your competitors.',
  },
  {
    icon: <LinkIcon className="h-8 w-8 text-primary" />,
    title: 'Channel Analysis',
    description: 'Get in-depth analytics of your YouTube channel, understand your audience, and discover growth opportunities.',
  },
];

const testimonials = [
  {
    name: 'AlexTube',
    title: 'YouTube Creator',
    avatar: '', // Using fallback instead of external image
    quote: "Seotooler's YouTube tools have been a game-changer for my channel. I've been able to grow my audience and increase my views by 50% in just a few months!",
  },
  {
    name: 'CreativeFlow',
    title: 'Content Creator',
    avatar: '', // Using fallback instead of external image
    quote: "I love how easy it is to use Seotooler's tools. They've helped me optimize my videos and get more subscribers. I highly recommend it to any YouTube creator.",
  },
];

// Optimized avatar component for better loading
const OptimizedAvatar = ({ src, alt, fallback }: { src: string; alt: string; fallback: string }) => (
  <Avatar className="h-12 w-12">
    {src ? (
      <AvatarImage 
        src={src} 
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    ) : null}
    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
      {fallback}
    </AvatarFallback>
  </Avatar>
);

const faqs = [
    {
        question: "What is Seotooler and how can it help my YouTube channel?",
        answer: "Seotooler is a comprehensive suite of SEO tools designed specifically for YouTube creators. It helps you with keyword research, rank tracking, channel analysis, and more, to improve your video visibility, attract more subscribers, and grow your channel."
    },
    {
        question: "Are the tools offered by Seotooler completely free?",
        answer: "Yes, all tools currently available on Seotooler are completely free to use. Our mission is to provide powerful and accessible SEO tools to help creators of all sizes succeed on YouTube."
    },
    {
        question: "How does the YouTube Keyword Research tool work?",
        answer: "Our Keyword Research tool analyzes YouTube search trends and provides you with a list of relevant keywords for your niche. It also shows you keyword difficulty and search volume, helping you choose the best topics for your videos to rank higher in search results."
    },
    {
        question: "Can I track my video rankings with Seotooler?",
        answer: "Absolutely! Our Video Rank Tracking tool allows you to monitor your video's performance for specific keywords on YouTube. This helps you understand what's working and what's not, so you can optimize your content strategy."
    }
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Seo 
        title="Free YouTube SEO Tools | Rank Higher on YouTube with Seotooler"
        description="Boost your YouTube channel's performance with our powerful and free SEO tools. Get more views, subscribers, and revenue with Seotooler's keyword research, rank tracking, and channel analysis tools."
      />
      <div className="space-y-24">
        {/* Hero Section */}
        <section className="hero-container animate-fade-in">
          <h1 className="hero-title">
            Unlock Your YouTube Potential with Top-Tier SEO Tools
          </h1>
          <p className="hero-description text-muted-foreground">
            Elevate your YouTube channel with our suite of free, powerful SEO tools. From in-depth keyword research to comprehensive video optimization, Seotooler is your partner in climbing the ranks.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/tools')} className="text-lg px-8 py-6">
              Explore Free Tools
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Everything You Need to Succeed on YouTube</h2>
            <p className="text-muted-foreground mt-3 text-lg">A complete toolkit to improve your channel's visibility and growth.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="items-center text-center">
                  {feature.icon}
                  <CardTitle className="mt-4 text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  {feature.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Seotooler Section */}
        <section className="bg-secondary/50 py-20 px-8 rounded-lg">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold">Why Seotooler is the Best Choice for YouTubers</h2>
                <p className="text-muted-foreground mt-3 text-lg">We are dedicated to your growth. Here's what makes our tools stand out.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10 text-center">
                <div className="flex flex-col items-center">
                    <TrendingUp className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">Drive Growth</h3>
                    <p className="text-muted-foreground">Our tools are designed to provide actionable insights that translate into real growth for your channel, helping you gain more subscribers and views.</p>
                </div>
                <div className="flex flex-col items-center">
                    <Zap className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">Easy to Use</h3>
                    <p className="text-muted-foreground">Get started in seconds with our intuitive, user-friendly interface. No technical expertise required to become an SEO pro.</p>
                </div>
                <div className="flex flex-col items-center">
                    <HelpCircle className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">Completely Free</h3>
                    <p className="text-muted-foreground">Access all our powerful SEO tools without any cost. We believe in empowering creators to succeed without barriers.</p>
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Loved by Creators Worldwide</h2>
            <p className="text-muted-foreground mt-3 text-lg">Don't just take our word for it. Here's what our users say.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
                <CardContent className="p-0">
                  <p className="text-muted-foreground text-lg mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <OptimizedAvatar 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      fallback={testimonial.name.charAt(0)}
                    />
                    <div className="ml-4">
                      <p className="font-semibold text-lg">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <Suspense fallback={<div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
          <section>
              <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold">Frequently Asked Questions</h2>
                  <p className="text-muted-foreground mt-3 text-lg">Have questions? We've got answers.</p>
              </div>
              <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                  {faqs.map((faq, index) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                          <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                          <AccordionContent className="text-base text-muted-foreground">
                              {faq.answer}
                          </AccordionContent>
                      </AccordionItem>
                  ))}
              </Accordion>
          </section>
        </Suspense>

        {/* Call to Action Section */}
        <section className="text-center bg-primary text-primary-foreground py-16 rounded-lg">
            <h2 className="text-4xl font-bold mb-4">Ready to Grow Your YouTube Channel?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">Start using our free SEO tools today and see the difference they can make.</p>
            <Button size="lg" onClick={() => navigate('/tools')} variant="secondary" className="text-lg px-10 py-6">
                Get Started Now
            </Button>
        </section>
      </div>
    </>
  );
};

export default HomePage;
