import Script from 'next/script';

export function FAQSchema() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the Panda Express Nutrition Calculator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Nutrition Calculator is an easy-to-use tool that helps you customize meals while understanding their nutritional content, so you can make informed food choices that match your goals.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I use the Nutrition Calculator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply select the menu items you want to include in your meal, and the calculator will provide a breakdown of calories, protein, fat, carbs, and more.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can the Nutrition Calculator be used on mobile devices?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the Nutrition Calculator is optimized for both desktop and mobile devices, making it accessible wherever you are.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does the Nutrition Calculator include all menu items?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! The calculator includes all available menu items and sides, giving you a complete overview of the nutritional values.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is the nutrition information accurate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The nutrition information is based on Panda Express\'s official data and is regularly updated to ensure accuracy, but please note slight variations could occur.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I save custom meal combinations I create?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Currently, the Nutrition Calculator does not offer a save feature, but you can easily take a screenshot of your meal for future reference.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I view allergen information in the Nutrition Calculator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, allergen information is included so you can make choices that align with your dietary needs or preferences.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does the calculator include vegetarian/vegan options?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the calculator highlights vegetarian and select vegan menu options for those following plant-based diets.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does the Nutrition Calculator address dietary restrictions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The calculator allows you to filter items based on various dietary restrictions, such as low-calorie or high-protein options, ensuring personalized recommendations.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are beverages included in the Nutrition Calculator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the calculator includes nutrition information for all available beverages offered at Panda Express.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does the Nutrition Calculator help with weight management?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'By giving you clear insights into the calorie count and macronutrient content of your meal, the calculator helps you stay within your target intake.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are Super Greens, and are they listed in the calculator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Super Greens is a nutritious side dish loaded with fiber and vitamins, and it\'s fully detailed in the calculator for your convenience.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I use the calculator for group meal planning?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Although designed for individual use, the calculator can still be helpful in estimating nutritional information for group or family orders.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is there a guide to building balanced meals?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While the calculator offers nutritional insights, check the Panda Express website or consult a dietitian for additional tips on building balanced and healthy meals.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I see both macros and micros for the meals?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Nutrition Calculator primarily focuses on macronutrient content but includes information on key micronutrients like sodium and fiber.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does the Nutrition Calculator account for cooking variations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The nutrition values are based on standard recipes and preparation methods; changes in regional ingredients or portion sizes may cause slight differences.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is the Panda Express Nutrition Calculator free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the Nutrition Calculator is completely free to use for all customers.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I modify portion sizes in the calculator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can adjust portion sizes to reflect your actual order, and the calculator will update the nutritional values accordingly.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is the Nutrition Calculator suitable for athletes or fitness enthusiasts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the tool is perfect for those tracking macros and looking to make meals fit their specific dietary needs and fitness plans.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where can I access the Panda Express Nutrition Calculator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can find the Nutrition Calculator directly on the official Panda Express website under the Nutrition section. Get started today!'
        }
      }
    ]
  };

  return (
    <Script id="faq-schema" type="application/ld+json">
      {JSON.stringify(faqData)}
    </Script>
  );
}
