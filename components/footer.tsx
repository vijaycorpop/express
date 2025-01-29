import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';

const footerLinks = [
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' }
    ]
  }
];

export function Footer() {
  return (
    <footer className="bg-[#1C2333] text-gray-300 pb-[72px] sm:pb-4">
      <div className="container max-w-[1400px] mx-auto px-4">
        <div className="py-8">
          {/* Mobile Layout */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:hidden">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="font-medium text-white mb-4 text-sm">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex flex-col items-center text-center">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <UtensilsCrossed className="h-8 w-8" />
              <span className="font-bold text-xl text-white">
                Panda Express Nutrition
              </span>
            </Link>
            <div className="flex justify-center space-x-12 mb-6">
              {footerLinks.map((section) => (
                <div key={section.title}>
                  <h3 className="font-medium text-white mb-4 text-sm">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 py-6 text-center text-sm">
          <p className="text-gray-400">
            {new Date().getFullYear()} All rights reserved. This is an unofficial site. Not affiliated with Panda Express. Panda Express is a registered trademark of Panda Restaurant Group, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
