'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, Drumstick, Fish, Wheat, Salad, UtensilsCrossed, Cookie, Soup, ChevronDown, Check, X } from 'lucide-react';
import { menuItems } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AddedAnimation } from '@/components/ui/added-animation';
import { cn } from '@/lib/utils';

const IconMap: Record<string, any> = {
  Drumstick,
  Fish,
  Wheat,
  Salad,
  UtensilsCrossed,
  Cookie,
  Soup,
};

interface MenuListProps {
  onItemSelect: (itemId: string) => void;
  selectedItems: Array<{ id: string; servings: number; }>;
}

export function MenuList({ onItemSelect, selectedItems }: MenuListProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [isAnimating, setIsAnimating] = useState<Record<string, boolean>>({});

  const handleAddItem = (itemId: string) => {
    // Always trigger the item selection immediately
    onItemSelect(itemId);
    
    // Set animation states
    setAddedItems(prev => ({ ...prev, [itemId]: true }));

    // Clear animation states after animation completes
    setTimeout(() => {
      setAddedItems(prev => {
        const newState = { ...prev };
        delete newState[itemId];
        return newState;
      });
    }, 300); // Reduced from 500ms to 300ms for faster feedback
  };

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  return (
    <div className="space-y-4">
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 pb-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
            {search && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearch('')}
                className="absolute right-1 top-1 h-7 w-7 hover:bg-secondary/80"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[140px] capitalize">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem 
                  key={category} 
                  value={category}
                  className="capitalize"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {menuItems
          .filter(
            (item) =>
              (selectedCategory === 'all' || item.category === selectedCategory) &&
              item.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => {
            const Icon = IconMap[item.icon] || UtensilsCrossed;
            const selectedItem = selectedItems.find(i => i.id === item.id);
            const servings = selectedItem?.servings || 0;
            const isSelected = servings > 0;
            
            return (
              <Card 
                key={item.id} 
                className={cn(
                  "relative menu-card overflow-hidden bg-card cursor-pointer transition-colors",
                  isSelected && "border-green-500/50 dark:border-green-700/50"
                )}
                onClick={() => handleAddItem(item.id)}
              >
                {addedItems[item.id] && (
                  <AddedAnimation className="absolute inset-0 transition-opacity duration-300" />
                )}
                <div className="flex p-3 md:p-4 items-center">
                  <div className="relative w-20 h-20 md:w-32 md:h-32 shrink-0 rounded-md overflow-hidden bg-red-50/80 dark:bg-muted flex items-center justify-center">
                    <Icon className="w-12 h-12 md:w-16 md:h-16 text-red-600/90 dark:text-muted-foreground" />
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <h3 className="font-medium leading-none mb-2 truncate">{item.name}</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>{item.nutrition.calories} cal</div>
                      <div className="flex items-center justify-between">
                        <span>{item.nutrition.protein}g protein</span>
                        <Button 
                          size="sm" 
                          variant={isSelected ? "secondary" : "default"}
                          className={cn(
                            "transition-colors",
                            isSelected 
                              ? "bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400"
                              : "bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400"
                          )}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-4 h-4 mr-1" />
                              Added x{servings}
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-1" />
                              Add
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
