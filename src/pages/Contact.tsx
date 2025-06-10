import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { Seo } from '@/components/Seo';
import { Mail } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

const ContactPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success('Message sent!', {
          description: 'We have received your message and will get back to you shortly.',
        });
        form.reset();
      } else {
        toast.error('Something went wrong!', {
          description: 'Please try again later.',
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!', {
        description: 'Please try again later.',
      });
    }
  }

  return (
    <>
      <Seo 
        title="Contact Us | Seotooler"
        description="Get in touch with the Seotooler team. Whether you have a question about our tools, pricing, or anything else, our team is ready to answer all your questions."
      />
      <div className="space-y-16">
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">Contact Us</h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Have a question or want to work with us? Drop us a line!
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Email</h3>
                <p className="text-muted-foreground">Our support team is here to help.</p>
                <a href="mailto:support@seotooler.com" className="text-primary hover:underline">support@seotooler.com</a>
              </div>
            </div>
          </div>

          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="How can we help?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your message..." rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
