'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="font-medium">{question}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          isOpen ? "max-h-48" : "max-h-0"
        )}
      >
        <div className="p-4 pt-0 text-muted-foreground">
          {answer}
        </div>
      </div>
    </div>
  );
}
