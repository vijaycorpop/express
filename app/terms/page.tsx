import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Panda Express Nutrition Calculator',
  description: 'Read our terms of service to understand the conditions for using our Panda Express nutrition calculator.',
  alternates: {
    canonical: 'https://panda-express-nutrition.net/terms'
  }
};

export default function TermsPage() {
  return (
    <div className="container max-w-[1400px] mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-4">
          Last updated: January 24, 2024
        </p>
        <div className="text-lg text-muted-foreground mb-6">
          Please read these Terms of Service carefully before using Panda Express Nutrition.
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-6">
          By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
        <p className="mb-6">
          We grant you a limited, non-exclusive, non-transferable license to use our service for personal, non-commercial purposes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
        <p className="mb-6">
          The nutritional information provided is for reference purposes only. While we strive for accuracy, we cannot guarantee that the information is error-free or complete.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitations</h2>
        <p className="mb-6">
          You may not:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Use our service for commercial purposes</li>
          <li>Modify, copy, or create derivative works</li>
          <li>Attempt to reverse engineer any portion of the service</li>
          <li>Remove any copyright or other proprietary notices</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. User Content</h2>
        <p className="mb-6">
          Any content you submit to our service must be accurate and comply with applicable laws.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Termination</h2>
        <p className="mb-6">
          We may terminate or suspend your access to our service immediately, without prior notice, for any reason.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to Terms</h2>
        <p className="mb-6">
          We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at terms@pandanutrition.com
        </p>
      </div>
    </div>
  );
}
