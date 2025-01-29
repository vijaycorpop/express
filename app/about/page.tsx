import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Panda Express Nutrition Calculator',
  description: 'Learn about our mission to help you make informed dining choices at Panda Express with accurate nutritional information and easy-to-use calculator.',
  alternates: {
    canonical: 'https://panda-express-nutrition.net/about'
  }
};

export default function AboutPage() {
  return (
    <div className="container max-w-[1400px] mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <div className="prose dark:prose-invert max-w-none">
        <div className="text-lg text-muted-foreground">
          Welcome to Panda Express Nutrition, your trusted companion for making informed dining choices at Panda Express.
        </div>
        <p className="mb-4">
          Our mission is to empower you with accurate nutritional information, helping you make choices that align with your dietary goals while enjoying your favorite Panda Express dishes.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Comprehensive nutritional information for all Panda Express menu items</li>
          <li>Easy-to-use calculator for tracking calories and macronutrients</li>
          <li>Detailed breakdown of ingredients and allergens</li>
          <li>Customizable portion sizes and combinations</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Commitment</h2>
        <p className="mb-4">
          We are committed to providing accurate, up-to-date nutritional information to help you make informed decisions about your meals at Panda Express. Our data is regularly updated to reflect the latest menu offerings and nutritional content.
        </p>
        <p>
          Whether you&apos;re counting calories, tracking macros, or just curious about what&apos;s in your favorite dishes, we&apos;re here to help you make the best choices for your dietary needs.
        </p>
      </div>
    </div>
  );
}
