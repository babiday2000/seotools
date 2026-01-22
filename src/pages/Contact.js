import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Seo } from "@/components/Seo";
import { Mail } from "lucide-react";
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});
const ContactPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  async function onSubmit(values) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        toast.success("Message Sent Successfully! ✉️", {
          description:
            "Thank you for reaching out! Our team will review your message and respond within 24-48 hours.",
        });
        form.reset();
      } else {
        toast.error("Unable to Send Message", {
          description:
            "We couldn't deliver your message. Please check your connection and try again.",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Connection Error", {
        description:
          "Something went wrong on our end. Please try again in a few moments.",
      });
    }
  }
  return _jsxs(_Fragment, {
    children: [
      _jsx(Seo, {
        title: "Contact Us | Seotooler",
        description:
          "Get in touch with the Seotooler team. Whether you have a question about our tools, pricing, or anything else, our team is ready to answer all your questions.",
      }),
      _jsxs("div", {
        className: "space-y-16",
        children: [
          _jsxs("section", {
            className: "text-center",
            children: [
              _jsx("h1", {
                className:
                  "text-4xl md:text-5xl font-extrabold tracking-tighter mb-4",
                children: "Contact Us",
              }),
              _jsx("p", {
                className: "max-w-2xl mx-auto text-lg text-muted-foreground",
                children:
                  "Have a question or want to work with us? Drop us a line!",
              }),
            ],
          }),
          _jsxs("div", {
            className: "grid md:grid-cols-2 gap-12",
            children: [
              _jsx("div", {
                className: "space-y-8",
                children: _jsxs("div", {
                  className: "flex items-start space-x-4",
                  children: [
                    _jsx("div", {
                      className: "bg-primary/10 p-3 rounded-full",
                      children: _jsx(Mail, {
                        className: "h-6 w-6 text-primary",
                      }),
                    }),
                    _jsxs("div", {
                      children: [
                        _jsx("h3", {
                          className: "text-xl font-semibold",
                          children: "Email",
                        }),
                        _jsx("p", {
                          className: "text-muted-foreground",
                          children: "Our support team is here to help.",
                        }),
                        _jsx("a", {
                          href: "mailto:support@seotooler.com",
                          className: "text-primary hover:underline",
                          children: "support@seotooler.com",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              _jsx("div", {
                children: _jsx(Form, {
                  ...form,
                  children: _jsxs("form", {
                    onSubmit: form.handleSubmit(onSubmit),
                    className: "space-y-6",
                    children: [
                      _jsx(FormField, {
                        control: form.control,
                        name: "name",
                        render: ({ field }) =>
                          _jsxs(FormItem, {
                            children: [
                              _jsx(FormLabel, { children: "Name" }),
                              _jsx(FormControl, {
                                children: _jsx(Input, {
                                  placeholder: "Your Name",
                                  ...field,
                                }),
                              }),
                              _jsx(FormMessage, {}),
                            ],
                          }),
                      }),
                      _jsx(FormField, {
                        control: form.control,
                        name: "email",
                        render: ({ field }) =>
                          _jsxs(FormItem, {
                            children: [
                              _jsx(FormLabel, { children: "Email" }),
                              _jsx(FormControl, {
                                children: _jsx(Input, {
                                  placeholder: "your.email@example.com",
                                  ...field,
                                }),
                              }),
                              _jsx(FormMessage, {}),
                            ],
                          }),
                      }),
                      _jsx(FormField, {
                        control: form.control,
                        name: "subject",
                        render: ({ field }) =>
                          _jsxs(FormItem, {
                            children: [
                              _jsx(FormLabel, { children: "Subject" }),
                              _jsx(FormControl, {
                                children: _jsx(Input, {
                                  placeholder: "How can we help?",
                                  ...field,
                                }),
                              }),
                              _jsx(FormMessage, {}),
                            ],
                          }),
                      }),
                      _jsx(FormField, {
                        control: form.control,
                        name: "message",
                        render: ({ field }) =>
                          _jsxs(FormItem, {
                            children: [
                              _jsx(FormLabel, { children: "Message" }),
                              _jsx(FormControl, {
                                children: _jsx(Textarea, {
                                  placeholder: "Your message...",
                                  rows: 5,
                                  ...field,
                                }),
                              }),
                              _jsx(FormMessage, {}),
                            ],
                          }),
                      }),
                      _jsx(Button, {
                        type: "submit",
                        className: "w-full",
                        children: "Send Message",
                      }),
                    ],
                  }),
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
export default ContactPage;
