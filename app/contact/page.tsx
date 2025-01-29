import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: 'Contact Us | Panda Express Nutrition Calculator',
  description: 'Get in touch with us for any questions about Panda Express nutrition information or our calculator tool.',
  alternates: {
    canonical: 'https://panda-express-nutrition.net/contact'
  }
};

export default function ContactPage() {
  return (
    <div className="container max-w-[1400px] mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <div className="prose dark:prose-invert mx-auto">
          <p className="text-lg mb-8">
            Have questions or feedback? We&apos;d love to hear from you.
          </p>
          <div className="inline-block text-left">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">
                <a 
                  href="mailto:hello@panda-express-nutrition.net"
                  className="hover:text-primary transition-colors"
                >
                  hello@panda-express-nutrition.net
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
