'use client';

import { useState, useEffect } from 'react';
import { Calculator, Heart, Smartphone } from 'lucide-react';
import { MenuList } from '@/components/menu-list';
import { NutritionSummary } from '@/components/nutrition-summary';
import { FAQItem } from '@/components/faq-item';
import { ExpandableFeature } from '@/components/expandable-feature';
import { ScrollableContent } from '@/components/scrollable-content';
import { Button } from '@/components/ui/button';
import { Utensils, Scale, Clock, CheckCircle2, Star, ArrowRight, Trash2, Plus } from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';
import { FAQSchema } from '@/components/faq-schema';
import { isBrowser } from '@/lib/browser-utils';

interface MenuItem {
  id: string;
  servings: number;
}

interface StructuredData {
  '@context': string;
  '@type': string;
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  description: string;
  offers: {
    '@type': string;
    price: string;
    priceCurrency: string;
  };
  featureList: string[];
  browserRequirements: string;
  softwareVersion: string;
}

export default function HomePage() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only run client-side code after mounting
  if (!mounted || !isBrowser) {
    return null;
  }

  const addItem = (itemId: string): void => {
    const existingItem = selectedItems.find(item => item.id === itemId);
    if (existingItem) {
      setSelectedItems(selectedItems.map(item => 
        item.id === itemId 
          ? { ...item, servings: item.servings + 1 }
          : item
      ));
    } else {
      setSelectedItems([...selectedItems, { id: itemId, servings: 1 }]);
    }
  };

  const updateServings = (itemId: string, servings: number): void => {
    if (servings <= 0) {
      setSelectedItems(selectedItems.filter(item => item.id !== itemId));
    } else {
      setSelectedItems(selectedItems.map(item => 
        item.id === itemId ? { ...item, servings } : item
      ));
    }
  };

  const removeItem = (itemId: string): void => {
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
  };

  const resetItems = (): void => {
    setSelectedItems([]);
  };

  const structuredData: StructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Panda Express Nutrition Calculator',
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web',
    description: 'Calculate nutrition facts for Panda Express menu items. Get accurate calories, protein, carbs, fat content for entrees, sides, appetizers.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      'Real-time nutrition calculation',
      'Complete menu database',
      'Detailed macro breakdown',
      'Mobile-friendly interface'
    ],
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0.0'
  };

  return (
    <>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <FAQSchema />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-red-50 to-white dark:from-red-950/20 dark:to-background py-4 md:py-10">
          <div className="container max-w-[1400px] mx-auto px-4">
            <div className="text-center space-y-2 md:space-y-3">
              <h1 className="text-3xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600">
                Panda Express Nutrition Calculator
              </h1>
              <p className="text-sm md:text-lg text-muted-foreground max-w-4xl mx-auto">
                Calculate Panda Express macros with our easy-to-use nutrition calculator. Explore detailed nutrition facts for the entire menu, and make informed choices for your next meal
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        </section>

        {/* Calculator Section */}
        <section className="py-6" id="calculator">
          <div className="container max-w-[1400px] mx-auto px-4">
            <div className="grid md:grid-cols-[2fr,1fr] gap-6">
              <MenuList 
                onItemSelect={addItem} 
                selectedItems={selectedItems}
              />
              <NutritionSummary 
                selectedItems={selectedItems}
                onUpdateServings={updateServings}
                onRemoveItem={removeItem}
                onReset={resetItems}
              />
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 md:py-16">
          <div className="container max-w-[1400px] mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Why Choose Our Calculator?</h2>
            <div className="prose prose-red dark:prose-invert max-w-4xl mx-auto">
              <p>
                Our Panda Express nutrition calculator stands out as the most comprehensive and user-friendly tool available. Unlike other calculators, we provide:
              </p>
              <ul>
                <li><strong>Real-Time Updates:</strong> Instantly see how adding or removing items affects your total nutrition.</li>
                <li><strong>Detailed Macro Breakdown:</strong> Get complete information about calories, protein, carbs, fat, and more.</li>
                <li><strong>Visual Nutrition Charts:</strong> Understand your meal's nutritional composition at a glance.</li>
                <li><strong>Exercise Equivalents:</strong> See how much activity it takes to burn off your meal.</li>
                <li><strong>Mobile Optimization:</strong> Perfect for calculating nutrition while in line or planning ahead.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 md:py-16 bg-red-50/50 dark:bg-red-950/10">
          <div className="container max-w-[1400px] mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Your #1 Nutrition Calculator for Panda Express</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <ExpandableFeature
                title="Complete Menu Coverage"
                content="Access nutrition information for every item on the Panda Express menu, including limited-time offerings and regional specialties. Our database is regularly updated to ensure accuracy."
              />
              <ExpandableFeature
                title="Customization Options"
                content="Adjust portion sizes, mix and match items, and see how different combinations affect your nutrition totals. Perfect for planning meals that fit your dietary goals."
              />
              <ExpandableFeature
                title="Dietary Information"
                content="Get detailed insights about allergens, dietary restrictions, and nutritional content. Make informed choices based on your specific dietary needs and preferences."
              />
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16">
          <div className="container max-w-[1400px] mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Panda Express Nutrition FAQs</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <FAQItem
                question="How accurate is the nutrition information?"
                answer="Our nutrition data is based on the official information provided by Panda Express. We regularly update our database to reflect any changes in their menu or nutritional content."
              />
              <FAQItem
                question="What are the healthiest options at Panda Express?"
                answer="The healthiest options typically include Grilled Teriyaki Chicken (300 calories), String Bean Chicken Breast (190 calories), and Mixed Vegetables (80 calories). These items are lower in calories and higher in protein."
              />
              <FAQItem
                question="How can I eat low-carb at Panda Express?"
                answer="For a low-carb meal, choose protein-based entrees without sweet sauces and opt for vegetables instead of rice or noodles. Good options include Mushroom Chicken, Broccoli Beef, and String Bean Chicken Breast."
              />
              <FAQItem
                question="Does Panda Express have vegetarian options?"
                answer="Yes, Panda Express offers several vegetarian options including Eggplant Tofu, Mixed Vegetables, and Chow Mein. Use our calculator to see complete nutrition information for vegetarian choices."
              />
              <FAQItem
                question="How many calories are in a typical Panda Express meal?"
                answer="A typical plate with one entree and one side ranges from 400-800 calories, depending on your choices. Our calculator helps you plan meals that fit your calorie goals."
              />
            </div>
          </div>
        </section>

        {/* Scrollable Content */}
        <section className="py-12 md:py-16 bg-red-50/50 dark:bg-red-950/10">
          <div className="container max-w-[1400px] mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Make Your Nutrition Choices Effortless at Panda Express</h2>
            <ScrollableContent>
              <h3>Understanding Panda Express Nutrition</h3>
              <p>
                Making informed dietary choices at Panda Express becomes effortless with our comprehensive nutrition guide. Whether you're counting calories, tracking macros, or managing specific dietary requirements, our tool provides all the information you need.
              </p>

              <h3>Calorie-Smart Choices</h3>
              <p>
                Panda Express offers a range of options for calorie-conscious diners. Learn how to build a satisfying meal while staying within your calorie goals:
              </p>
              <ul>
                <li>Choose steamed vegetables as your side dish</li>
                <li>Opt for grilled or steamed proteins</li>
                <li>Be mindful of sauce portions</li>
                <li>Consider splitting larger portions</li>
              </ul>

              <h3>Protein-Rich Options</h3>
              <p>
                For fitness enthusiasts and those looking to increase their protein intake, Panda Express has several high-protein options:
              </p>
              <ul>
                <li>Grilled Teriyaki Chicken: 36g protein per serving</li>
                <li>String Bean Chicken Breast: 24g protein per serving</li>
                <li>Broccoli Beef: 21g protein per serving</li>
              </ul>

              <h3>Managing Carbohydrates</h3>
              <p>
                Whether you're following a low-carb diet or managing blood sugar, understanding the carbohydrate content of your meal is crucial. Our calculator helps you:
              </p>
              <ul>
                <li>Track total carbohydrates per serving</li>
                <li>Identify lower-carb alternatives</li>
                <li>Plan balanced meals</li>
              </ul>

              <h3>Sodium Awareness</h3>
              <p>
                For those monitoring sodium intake, we provide detailed information about the sodium content of each dish, helping you make choices that align with your dietary needs.
              </p>
            </ScrollableContent>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-12 md:py-16">
          <div className="container max-w-[1400px] mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Nutrition Guide Based on Official Data</h2>
              <div className="prose prose-red dark:prose-invert mx-auto">
                <p className="text-muted-foreground">
                  This nutrition calculator is an independent tool that uses data from Panda Express's official nutritional information. While we strive to maintain accuracy, please note that this is not an official Panda Express website or calculator. Actual nutritional values may vary by location and preparation method. For the most accurate information, please consult Panda Express directly or visit their official website.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}