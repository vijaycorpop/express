'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpandableFeatureProps {
  title: string;
  content: string;
}

export function ExpandableFeature({ title, content }: ExpandableFeatureProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-red-50/50 dark:hover:bg-red-900/20"
      >
        <span className="font-medium">{title}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-red-600 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="p-4 pt-0 text-muted-foreground">
          {content}
        </div>
      </div>
    </div>
  );
}
