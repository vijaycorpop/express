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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <div className="space-y-4">
                <FAQItem
                  question="What is the Panda Express Nutrition Calculator?"
                  answer="The Nutrition Calculator is an easy-to-use tool that helps you customize meals while understanding their nutritional content, so you can make informed food choices that match your goals."
                />
                <FAQItem
                  question="How do I use the Nutrition Calculator?"
                  answer="Simply select the menu items you want to include in your meal, and the calculator will provide a breakdown of calories, protein, fat, carbs, and more."
                />
                <FAQItem
                  question="Can the Nutrition Calculator be used on mobile devices?"
                  answer="Yes, the Nutrition Calculator is optimized for both desktop and mobile devices, making it accessible wherever you are."
                />
                <FAQItem
                  question="Does the Nutrition Calculator include all menu items?"
                  answer="Absolutely! The calculator includes all available menu items and sides, giving you a complete overview of the nutritional values."
                />
                <FAQItem
                  question="Is the nutrition information accurate?"
                  answer="The nutrition information is based on Panda Express's official data and is regularly updated to ensure accuracy, but please note slight variations could occur."
                />
                <FAQItem
                  question="Can I save custom meal combinations I create?"
                  answer="Currently, the Nutrition Calculator does not offer a save feature, but you can easily take a screenshot of your meal for future reference."
                />
                <FAQItem
                  question="Can I view allergen information in the Nutrition Calculator?"
                  answer="Yes, allergen information is included so you can make choices that align with your dietary needs or preferences."
                />
                <FAQItem
                  question="Does the calculator include vegetarian/vegan options?"
                  answer="Yes, the calculator highlights vegetarian and select vegan menu options for those following plant-based diets."
                />
                <FAQItem
                  question="How does the Nutrition Calculator address dietary restrictions?"
                  answer="The calculator allows you to filter items based on various dietary restrictions, such as low-calorie or high-protein options, ensuring personalized recommendations."
                />
                <FAQItem
                  question="Are beverages included in the Nutrition Calculator?"
                  answer="Yes, the calculator includes nutrition information for all available beverages offered at Panda Express."
                />
              </div>
              <div className="space-y-4">
                <FAQItem
                  question="How does the Nutrition Calculator help with weight management?"
                  answer="By giving you clear insights into the calorie count and macronutrient content of your meal, the calculator helps you stay within your target intake."
                />
                <FAQItem
                  question="What are Super Greens, and are they listed in the calculator?"
                  answer="Super Greens is a nutritious side dish loaded with fiber and vitamins, and it's fully detailed in the calculator for your convenience."
                />
                <FAQItem
                  question="Can I use the calculator for group meal planning?"
                  answer="Although designed for individual use, the calculator can still be helpful in estimating nutritional information for group or family orders."
                />
                <FAQItem
                  question="Is there a guide to building balanced meals?"
                  answer="While the calculator offers nutritional insights, check the Panda Express website or consult a dietitian for additional tips on building balanced and healthy meals."
                />
                <FAQItem
                  question="Can I see both macros and micros for the meals?"
                  answer="The Nutrition Calculator primarily focuses on macronutrient content but includes information on key micronutrients like sodium and fiber."
                />
                <FAQItem
                  question="Does the Nutrition Calculator account for cooking variations?"
                  answer="The nutrition values are based on standard recipes and preparation methods; changes in regional ingredients or portion sizes may cause slight differences."
                />
                <FAQItem
                  question="Is the Panda Express Nutrition Calculator free to use?"
                  answer="Yes, the Nutrition Calculator is completely free to use for all customers."
                />
                <FAQItem
                  question="Can I modify portion sizes in the calculator?"
                  answer="Yes, you can adjust portion sizes to reflect your actual order, and the calculator will update the nutritional values accordingly."
                />
                <FAQItem
                  question="Is the Nutrition Calculator suitable for athletes or fitness enthusiasts?"
                  answer="Yes, the tool is perfect for those tracking macros and looking to make meals fit their specific dietary needs and fitness plans."
                />
                <FAQItem
                  question="Where can I access the Panda Express Nutrition Calculator?"
                  answer="You can find the Nutrition Calculator directly on the official Panda Express website under the Nutrition section. Get started today!"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Scrollable Content */}
        <section className="py-12 md:py-16 bg-red-50/50 dark:bg-red-950/10">
          <div className="container max-w-[1400px] mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Make Your Nutrition Choices Effortless at Panda Express</h2>
            <ScrollableContent>
              <p>
                When it comes to fast food, making informed nutrition choices can feel like an uphill battle—especially when you're trying to monitor your calorie intake, maintain a balanced diet, or accommodate specific dietary needs. That's where Panda Express comes in. Known for its flavorful take on Chinese-American cuisine, Panda Express offers a variety of menu options that can fit into a healthier lifestyle—with the right guidance.
              </p>
              <p>
                With the help of our Panda Express Nutrition Calculator, you can take control of your dining choices and make each meal work for you. Whether you're a calorie counter, a fitness enthusiast balancing macros, or someone with dietary restrictions, this guide will walk you through the essentials of Panda Express nutrition and how to use our calculator to make smarter decisions.
              </p>

              <h3>Fast Food and Nutrition—A Balanced Perspective</h3>
              <p>
                Fast food's reputation as "unhealthy" isn't without merit. Studies, like one covered by <a href="https://www.medicalnewstoday.com/articles/324847" target="_blank" rel="noopener noreferrer">Medical News Today</a>, reveal that fast food tends to be high in calories, sugar, sodium, saturated fats, and trans fats, with lower levels of essential nutrients like fiber and vitamins. Regular consumption can lead to both short-term impacts—like energy crashes and bloating—and long-term health issues such as insulin resistance, obesity, and heart disease.
              </p>
              <p>
                Does that mean all fast food is bad? Not necessarily. By making informed decisions, you can enjoy fast food occasionally without compromising your health goals. Panda Express, for example, provides detailed nutritional information through resources like our calculator to help diners strike a balance.
              </p>

              <h3>The Solution? Know What's on Your Plate</h3>
              <p>
                Many fast food restaurants now share the nutrition profiles of their menu items. Panda Express is no exception, offering transparency that allows diners to choose meals suited to their needs. This transparency, when paired with the Panda Express Nutrition Calculator, empowers you to understand your food choices and discover healthier menu options.
              </p>

              <h3>Panda Express Menu Nutrition Overview</h3>
              <p>
                Panda Express is known for its variety of Chinese-American dishes, offering everything from indulgent fried entrees to lighter, vegetable-forward options. While the exact nutritional information for their items can vary, their menu is diverse enough to cater to different dietary preferences, making it a popular choice for many. Let's explore how Panda Express compares to its competitors like Pei Wei, P.F. Chang's, and local takeout spots, as well as examine some broader nutritional trends in quick-service Asian cuisine.
              </p>

              <h3>How Panda Express Compares to Competitors</h3>
              <p>
                When it comes to Asian-inspired fast food, Panda Express stands out for its convenience and wide availability. However, competitors like Pei Wei and P.F. Chang's often emphasize fresh, made-to-order dishes or customizable options that allow customers more control over calorie and nutrient intake. For instance:
              </p>
              <ul>
                <li>Pei Wei offers rice bowls and salads that can easily be modified for lower carbs or higher protein.</li>
                <li>P.F. Chang's provides a more upscale dining experience, with dishes that focus on fresh ingredients, often with smaller portion sizes compared to Panda Express.</li>
                <li>Local takeout spots might offer dishes that are heavier in sodium and oil, as they may lack standardized recipes or health-conscious options seen in chain restaurants.</li>
                <li>Panda Express strikes a balance by offering some lighter options like "Super Greens" or grilled entrees alongside indulgent favorites such as Orange Chicken.</li>
              </ul>

              <h3>Entrees at Panda Express</h3>
              <p>
                Panda Express entrees range from protein-packed grilled chicken to more calorie-dense fried options. Items such as Beijing Beef or Orange Chicken are known for their bold flavors but are typically higher in calories, sugar, and fat due to their fried preparation and sweet sauces. On the other hand, dishes like Grilled Teriyaki Chicken or Broccoli Beef cater to those looking for higher protein and fewer calories.
              </p>

              <h3>Sides: A Key Factor in Nutrition</h3>
              <p>
                Sides can significantly impact the nutritional profile of your meal. Panda Express offers options like:
              </p>
              <ul>
                <li>Steamed White or Brown Rice: Simple and versatile but high in carbs.</li>
                <li>Fried Rice or Chow Mein: Flavorful and satisfying but calorie-dense and often high in sodium.</li>
                <li>Super Greens: A mix of broccoli, kale, and cabbage that adds fiber and nutrients without excess calories.</li>
              </ul>
              <p>
                Competitors like Pei Wei may offer additional customization with cauliflower rice or lettuce wraps, which cater to low-carb or gluten-free diets.
              </p>

              <h3>Appetizers: A Small Bite or a Sneaky Calorie Bomb</h3>
              <p>
                Appetizers like egg rolls, spring rolls, or wontons can add variety to your meal but are often fried, making them higher in fat and calories. For example:
              </p>
              <ul>
                <li>Panda Express Vegetable Spring Rolls are a lighter option compared to meat-based ones, but portion control is key.</li>
                <li>P.F. Chang's Lettuce Wraps provide a lower-calorie alternative that's packed with flavor.</li>
              </ul>

              <h3>Nutritional Trends in Quick-Service Asian Cuisine</h3>
              <p>
                Across the board, quick-service Asian restaurants share common nutritional patterns, including:
              </p>
              <ul>
                <li>High Sodium Levels: Soy sauce-based dishes can contribute to high sodium intake, which may be concerning for some diners.</li>
                <li>Balanced Protein Options: Many features lean proteins like chicken, shrimp, or tofu, complemented by vegetables.</li>
                <li>Carb-Heavy Sides: Rice, noodles, and dumplings are staples but can significantly increase calorie and carb counts.</li>
              </ul>

              <h3>Expert Tips for Healthier Fast Food Choices at Panda Express</h3>
              <ol>
                <li>
                  <strong>Keep It Balanced</strong>
                  <p>Pair protein-rich entrees with veggie-packed sides for a balanced meal that satisfies hunger and keeps you energized.</p>
                </li>
                <li>
                  <strong>Watch Sodium Levels</strong>
                  <p>Some dishes, like fried rice or Orange Chicken, are higher in sodium. Balance these by drinking plenty of water and choosing lower-sodium sides.</p>
                </li>
                <li>
                  <strong>Monitor Sugar</strong>
                  <p>Saucy entrees can often pile on the sugar—SweetFire Chicken Breast, for example, has 24 grams per serving. Balance it out by choosing unsweetened beverages and limiting high-sugar dishes.</p>
                </li>
                <li>
                  <strong>Don't Overdo It</strong>
                  <p>Portion control is key! Consider sharing higher-calorie items or saving half for later. You can use the calculator to ensure you're staying within appropriate calorie limits.</p>
                </li>
                <li>
                  <strong>Explore the Super Greens</strong>
                  <p>Packed with fiber, vitamins, and only 90 calories, the Super Greens is one of the healthiest sides on the menu and a great way to get in those veggies.</p>
                </li>
              </ol>

              <h3>Why Nutrition Matters—for Everyone</h3>
              <p>
                Whether you're a dedicated fitness enthusiast tracking macros or someone with a busy schedule looking to eat a little healthier, understanding your food choices is essential. Nutrition isn't about restrictions; it's about balance and empowering yourself to make choices that align with your lifestyle and goals.
              </p>
              <p>
                The Panda Express Nutrition Calculator is here to simplify your decisions, providing you with accurate, real-time information while you savor your meals.
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