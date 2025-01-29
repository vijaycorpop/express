import Script from 'next/script';

export function FAQSchema() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How accurate is the Panda Express nutrition calculator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our nutrition calculator uses official Panda Express nutrition data to provide accurate information. Values are regularly updated to match official menu items.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I calculate nutrition for custom portion sizes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can adjust portion sizes for any menu item to see the exact nutrition facts for your specific serving size.'
        }
      },
      {
        '@type': 'Question',
        name: 'What nutrition information is provided?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The calculator provides detailed information including calories, protein, carbohydrates, fat, sodium, and other key nutrients for all Panda Express menu items.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I use the Panda Express nutrition calculator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Simply select your menu items, adjust portions if needed, and instantly see the complete nutrition breakdown. You can add multiple items to calculate meal totals.'
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
