'use client';

import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [selectedItems, setSelectedItems] = useState<Array<{ id: string; servings: number }>>([]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Header hasSelections={selectedItems.length > 0} />
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
