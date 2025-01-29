import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Panda Express Nutrition Calculator',
  description: 'Our privacy policy explains how we handle your data when you use our Panda Express nutrition calculator.',
  alternates: {
    canonical: 'https://panda-express-nutrition.net/privacy'
  }
};

export default function PrivacyPage() {
  return (
    <div className="container max-w-[1400px] mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-4">
          Last updated: January 24, 2024
        </p>
        <div className="text-lg text-muted-foreground mb-6">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our Panda Express Nutrition service.
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
        <p className="mb-4">We collect information that you provide directly to us, including:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Usage data and preferences</li>
          <li>Device information</li>
          <li>Contact information (when provided)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Provide and improve our services</li>
          <li>Respond to your requests and inquiries</li>
          <li>Analyze usage patterns and optimize user experience</li>
          <li>Send important updates about our service</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
        <p className="mb-6">
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies and Tracking</h2>
        <p className="mb-6">
          We use cookies and similar tracking technologies to improve your experience and analyze how our service is used. You can control cookie settings through your browser preferences.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Services</h2>
        <p className="mb-6">
          Our service may include links to third-party websites or services. We are not responsible for the privacy practices of these external sites.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
        <p className="mb-6">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at privacy@pandanutrition.com
        </p>
      </div>
    </div>
  );
}
