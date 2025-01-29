'use client';

interface ScrollableContentProps {
  children: React.ReactNode;
  maxHeight?: string;
}

export function ScrollableContent({ children, maxHeight = "400px" }: ScrollableContentProps) {
  return (
    <div 
      className="border rounded-lg bg-red-50/30 dark:bg-red-900/10 p-4 overflow-y-auto"
      style={{ maxHeight }}
    >
      <div className="prose prose-red dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
}
