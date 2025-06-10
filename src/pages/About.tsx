import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Target, Lightbulb, BarChart, Zap, Heart, Star } from 'lucide-react';
import { Seo } from '@/components/Seo';

const testimonials = [
  {
    name: 'Sarah L.',
    role: 'Digital Marketer',
    avatar: 'https://i.pravatar.cc/150?img=1',
    text: 'Seotooler has become my go-to for quick and reliable SEO checks. The sheer number of tools available for free is incredible. It has streamlined my workflow and saved me hours of work.'
  },
  {
    name: 'David Chen',
    role: 'Web Developer',
    avatar: 'https://i.pravatar.cc/150?img=2',
    text: 'As a developer, I appreciate the wide range of web development tools. The JSON and CSS tools are fantastic, and the UI is clean and easy to navigate. Highly recommended for any dev toolkit.'
  },
  {
    name: 'Jessica P.',
    role: 'Content Creator',
    avatar: 'https://i.pravatar.cc/150?img=7',
    text: 'The content and YouTube tools are a lifesaver! I use the hashtag generator and title extractor daily. It’s amazing that a platform this powerful is completely free.'
  }
];

const AboutPage = () => {
  return (
    <>
      <Seo 
        title="About Seotooler | Our Mission, Story, and Team"
        description="Discover the story behind Seotooler. Learn about our mission, values, and the dedicated team committed to creating the best free SEO and web tools for your success."
      />
      <div className="space-y-20">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">About Seotooler</h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            We are a passionate team of developers, marketers, and data scientists on a mission to democratize SEO and web development. We believe everyone, from small business owners to seasoned developers, should have access to high-quality tools and the knowledge needed to succeed online.
          </p>
        </section>

        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">From a simple idea to a comprehensive toolkit.</p>
          </div>
          <div className="max-w-4xl mx-auto text-lg text-muted-foreground space-y-6 text-justify">
            <p>
              Seotooler began as a small, internal project. As digital marketers and developers, we found ourselves constantly switching between dozens of different tools to handle our daily tasks—keyword research, site audits, content optimization, and technical checks. The process was inefficient, expensive, and often frustrating. We knew there had to be a better way.
            </p>
            <p>
              We started building a unified platform that brought together all the essential tools we needed into one accessible interface. What started as a solution for our own problems quickly grew into something more. We realized that countless other creators, marketers, and developers were facing the same challenges. That’s when Seotooler was born—with the mission to provide a comprehensive, user-friendly, and completely free suite of tools for everyone.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 text-center">
          <Card>
            <CardHeader className="items-center">
              <Target className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              To provide powerful, intuitive, and free SEO and web tools that empower businesses, creators, and individuals of all sizes to increase their online visibility, improve their workflow, and achieve their digital goals.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="items-center">
              <Lightbulb className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              To be the most trusted and user-centric platform for web and SEO tools, renowned for our accurate data, actionable insights, and unwavering commitment to our community's success.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="items-center">
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Our Values</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              We are driven by a customer-first approach, transparency in what we do, a passion for innovation, and a commitment to simplicity. We build tools we are proud to use ourselves every day.
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose Seotooler?</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">The advantages of using our comprehensive toolkit.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <BarChart className="h-10 w-10 text-primary mb-4" />
              <h4 className="font-semibold text-xl mb-2">Comprehensive Toolset</h4>
              <p className="text-muted-foreground">From SEO analysis and content creation to web development and data conversion, we offer over 200 free tools to cover all your needs.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Zap className="h-10 w-10 text-primary mb-4" />
              <h4 className="font-semibold text-xl mb-2">Fast, Reliable & Free</h4>
              <p className="text-muted-foreground">Our tools are designed for speed and accuracy. Best of all, they are completely free to use, with no hidden charges or limitations.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Heart className="h-10 w-10 text-primary mb-4" />
              <h4 className="font-semibold text-xl mb-2">User-Centric Design</h4>
              <p className="text-muted-foreground">We prioritize a clean, intuitive user experience. Our tools are easy to use for beginners while being powerful enough for experts.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Our Users Say</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Real feedback from our amazing community.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center">
            <h2 className="text-3xl font-bold">Join Our Community</h2>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground mt-4">
                We are constantly working to improve and expand our toolset. If you have any feedback, questions, or suggestions, please don't hesitate to reach out. Let's build a better web together.
            </p>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
