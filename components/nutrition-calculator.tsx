'use client';

import { useState } from 'react';
import { MenuList } from '@/components/menu-list';
import { NutritionSummary } from '@/components/nutrition-summary';
import { menuItems, MenuItem } from '@/lib/data';

interface SelectedItem {
  id: string;
  servings: number;
}

export function NutritionCalculator() {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => {
      const existingItem = prev.find(item => item.id === itemId);
      if (existingItem) {
        return prev.map(item =>
          item.id === itemId
            ? { ...item, servings: item.servings + 1 }
            : item
        );
      }
      return [...prev, { id: itemId, servings: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, servings: number) => {
    setSelectedItems(prev => {
      if (servings <= 0) {
        return prev.filter(item => item.id !== itemId);
      }
      return prev.map(item =>
        item.id === itemId
          ? { ...item, servings }
          : item
      );
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
  };

  return (
    <div className="container mx-auto py-8 lg:py-12">
      <div className="lg:grid lg:grid-cols-[1fr,400px] gap-8">
        <MenuList 
          onItemSelect={handleItemSelect} 
          selectedItems={selectedItems}
        />
        <div className="hidden lg:block">
          <div className="sticky top-8">
            <NutritionSummary
              selectedItems={selectedItems}
              onUpdateServings={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onReset={() => setSelectedItems([])}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
