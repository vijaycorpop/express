'use client';

import { useState } from 'react';
import { menuItems } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, X, ChevronUp, ChevronDown, Trash2, Timer, ClipboardList, ChevronRight, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { calculateExerciseDuration } from '@/lib/exercise-calculator';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SelectedItem {
  id: string;
  servings: number;
}

interface NutritionSummaryProps {
  selectedItems: SelectedItem[];
  onUpdateServings: (itemId: string, servings: number) => void;
  onRemoveItem: (itemId: string) => void;
  onReset: () => void;
}

export function NutritionSummary({
  selectedItems,
  onUpdateServings,
  onRemoveItem,
  onReset,
}: NutritionSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  const totalNutrition = selectedItems.reduce(
    (acc, item) => {
      const menuItem = menuItems.find((i) => i.id === item.id);
      if (!menuItem) return acc;

      return {
        calories: acc.calories + menuItem.nutrition.calories * item.servings,
        protein: acc.protein + menuItem.nutrition.protein * item.servings,
        carbs: acc.carbs + menuItem.nutrition.carbs * item.servings,
        fat: acc.fat + menuItem.nutrition.fat * item.servings,
        sodium: acc.sodium + menuItem.nutrition.sodium * item.servings,
        cholesterol: acc.cholesterol + menuItem.nutrition.cholesterol * item.servings,
        fiber: acc.fiber + menuItem.nutrition.fiber * item.servings,
      };
    },
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      sodium: 0,
      cholesterol: 0,
      fiber: 0,
    }
  );

  return (
    <div className="md:block">
      {/* Mobile Selected Items Panel */}
      <div className={cn(
        "fixed inset-x-0 bottom-[88px] z-40 md:hidden",
        "transition-all duration-300 ease-in-out",
        selectedItems.length > 0 && isExpanded ? "max-h-[40vh] opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"
      )}>
        <div className="absolute inset-0 -bottom-4 bg-background border-t"></div>
        <div className="relative h-full w-full">
          <div className="px-4 py-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selected Items</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedItems.length} {selectedItems.length === 1 ? 'item' : 'items'}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(false)}
                    className="h-8 w-8 hover:bg-secondary/80"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 max-h-[calc(40vh-100px)] overflow-y-auto">
                {selectedItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-secondary/10"
                  >
                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-medium truncate">
                          {menuItems.find((i) => i.id === item.id)?.name}
                        </span>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {item.servings} {item.servings === 1 ? 'serving' : 'servings'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onUpdateServings(item.id, Math.max(1, item.servings - 1))}
                        className="h-7 w-7"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value={item.servings}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value > 0) onUpdateServings(item.id, value);
                        }}
                        className="w-12 text-center h-7 px-1"
                        min="1"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onUpdateServings(item.id, item.servings + 1)}
                        className="h-7 w-7"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onRemoveItem(item.id)}
                        className="h-7 w-7 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nutrition Summary Panel */}
      <div className={cn(
        "fixed inset-0 z-50 md:hidden bg-background",
        "transition-all duration-300 ease-in-out",
        showNutrition ? "translate-y-0" : "translate-y-full"
      )}>
        <div className="relative h-full overflow-auto pb-20">
          <div className="sticky top-0 z-10 bg-background border-b">
            <div className="container flex items-center justify-between p-4">
              <h2 className="text-lg font-semibold">Nutrition Summary</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowNutrition(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="container p-3">
            {/* Macro Summary */}
            <div className="space-y-3">
              {/* Main Stats */}
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center justify-center p-2 bg-primary/5 rounded-lg">
                  <span className="text-xs font-medium text-muted-foreground">Calories</span>
                  <span className="text-xl font-bold">{totalNutrition.calories}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 bg-primary/5 rounded-lg">
                  <span className="text-xs font-medium text-muted-foreground">Protein</span>
                  <span className="text-xl font-bold">{totalNutrition.protein}g</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 bg-primary/5 rounded-lg">
                  <span className="text-xs font-medium text-muted-foreground">Carbs</span>
                  <span className="text-xl font-bold">{totalNutrition.carbs}g</span>
                </div>
              </div>

              {/* Macros Distribution Chart */}
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-square relative">
                  <Doughnut
                    data={{
                      labels: ['Protein', 'Carbs', 'Fat'],
                      datasets: [{
                        data: [
                          totalNutrition.protein * 4,
                          totalNutrition.carbs * 4,
                          totalNutrition.fat * 9
                        ],
                        backgroundColor: [
                          'rgba(59, 130, 246, 0.8)',
                          'rgba(16, 185, 129, 0.8)',
                          'rgba(249, 115, 22, 0.8)'
                        ],
                        borderWidth: 0
                      }]
                    }}
                    options={{
                      cutout: '70%',
                      plugins: {
                        legend: {
                          display: true,
                          position: 'bottom',
                          labels: {
                            boxWidth: 8,
                            padding: 8,
                            font: {
                              size: 10
                            }
                          }
                        },
                        title: {
                          display: true,
                          text: 'Calories Distribution',
                          font: {
                            size: 12
                          }
                        }
                      }
                    }}
                  />
                </div>
                <div className="aspect-square relative">
                  <Bar
                    data={{
                      labels: ['Fiber (g)', 'Sodium (mg)', 'Cholesterol (mg)'],
                      datasets: [{
                        data: [
                          totalNutrition.fiber,
                          totalNutrition.sodium / 100, // Scale down for better visualization
                          totalNutrition.cholesterol / 10 // Scale down for better visualization
                        ],
                        backgroundColor: [
                          'rgba(139, 92, 246, 0.8)',
                          'rgba(236, 72, 153, 0.8)',
                          'rgba(234, 179, 8, 0.8)'
                        ],
                        borderWidth: 0,
                        borderRadius: 4
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          display: false
                        },
                        title: {
                          display: true,
                          text: 'Other Nutrients',
                          font: {
                            size: 12
                          }
                        }
                      },
                      scales: {
                        x: {
                          display: true,
                          grid: {
                            display: false
                          },
                          ticks: {
                            font: {
                              size: 10
                            }
                          }
                        },
                        y: {
                          display: false
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Detailed Nutrition Info */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col items-center justify-center p-2 bg-primary/5 rounded-lg">
                  <span className="text-xs font-medium text-muted-foreground">Fat</span>
                  <span className="text-xl font-bold">{totalNutrition.fat}g</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 bg-primary/5 rounded-lg">
                  <span className="text-xs font-medium text-muted-foreground">Sodium</span>
                  <span className="text-xl font-bold">{totalNutrition.sodium}mg</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col items-center justify-center p-2 bg-primary/5 rounded-lg">
                  <span className="text-xs font-medium text-muted-foreground">Fiber</span>
                  <span className="text-xl font-bold">{totalNutrition.fiber}g</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 bg-primary/5 rounded-lg">
                  <span className="text-xs font-medium text-muted-foreground">Cholesterol</span>
                  <span className="text-xl font-bold">{totalNutrition.cholesterol}mg</span>
                </div>
              </div>

              {/* Exercise Equivalent */}
              <div className="p-3 bg-primary/5 rounded-lg space-y-1">
                <div className="text-xs font-medium text-muted-foreground text-center mb-2">
                  Time to Burn {totalNutrition.calories} Calories
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-xs font-medium text-muted-foreground">Walking</span>
                    <span className="text-base font-medium">{calculateExerciseDuration(totalNutrition.calories).walking}m</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-xs font-medium text-muted-foreground">Running</span>
                    <span className="text-base font-medium">{calculateExerciseDuration(totalNutrition.calories).running}m</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-xs font-medium text-muted-foreground">Cycling</span>
                    <span className="text-base font-medium">{calculateExerciseDuration(totalNutrition.calories).cycling}m</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo */}
            <div className="mt-3 mb-3">
              <div className="flex justify-center">
                <div className="flex items-center gap-2.5">
                  <div className="bg-primary p-1.5 rounded-lg">
                    <UtensilsCrossed className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                  </div>
                  <span className="text-base sm:text-lg font-semibold whitespace-nowrap">
                    Panda Express Nutrition
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="fixed bottom-0 left-0 right-0 z-20 bg-background border-t">
              <div className="container">
                <div className="flex items-center justify-between gap-4 p-4">
                  <Button
                    className="flex-1 bg-[#E31837] hover:bg-[#C41230] text-white"
                    onClick={() => setShowNutrition(false)}
                  >
                    <ClipboardList className="w-4 h-4 mr-2" />
                    Calculate Nutrition ({selectedItems.length})
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onReset}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Card */}
      <div className="hidden md:block">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Nutrition Summary</CardTitle>
              <Button
                variant={selectedItems.length > 0 ? "destructive" : "outline"}
                size="sm"
                onClick={onReset}
                className="h-8"
              >
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Main Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center justify-center p-3 bg-primary/5 rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">Calories</span>
                  <span className="text-2xl font-bold">{totalNutrition.calories}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-primary/5 rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">Protein</span>
                  <span className="text-2xl font-bold">{totalNutrition.protein}g</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-primary/5 rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">Carbs</span>
                  <span className="text-2xl font-bold">{totalNutrition.carbs}g</span>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square relative">
                  <Doughnut
                    data={{
                      labels: ['Protein', 'Carbs', 'Fat'],
                      datasets: [{
                        data: [
                          totalNutrition.protein * 4,
                          totalNutrition.carbs * 4,
                          totalNutrition.fat * 9
                        ],
                        backgroundColor: [
                          'rgba(59, 130, 246, 0.8)',
                          'rgba(16, 185, 129, 0.8)',
                          'rgba(249, 115, 22, 0.8)'
                        ],
                        borderWidth: 0
                      }]
                    }}
                    options={{
                      cutout: '70%',
                      plugins: {
                        legend: {
                          display: true,
                          position: 'bottom',
                          labels: {
                            boxWidth: 8,
                            padding: 8,
                            font: {
                              size: 11
                            }
                          }
                        },
                        title: {
                          display: true,
                          text: 'Calories Distribution',
                          font: {
                            size: 13
                          }
                        }
                      }
                    }}
                  />
                </div>
                <div className="aspect-square relative">
                  <Bar
                    data={{
                      labels: ['Fiber (g)', 'Sodium (mg)', 'Cholesterol (mg)'],
                      datasets: [{
                        data: [
                          totalNutrition.fiber,
                          totalNutrition.sodium / 100,
                          totalNutrition.cholesterol / 10
                        ],
                        backgroundColor: [
                          'rgba(139, 92, 246, 0.8)',
                          'rgba(236, 72, 153, 0.8)',
                          'rgba(234, 179, 8, 0.8)'
                        ],
                        borderWidth: 0,
                        borderRadius: 4
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: {
                          display: false
                        },
                        title: {
                          display: true,
                          text: 'Other Nutrients',
                          font: {
                            size: 13
                          }
                        }
                      },
                      scales: {
                        x: {
                          display: true,
                          grid: {
                            display: false
                          },
                          ticks: {
                            font: {
                              size: 11
                            }
                          }
                        },
                        y: {
                          display: false
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Detailed Nutrition Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center justify-center p-3 bg-primary/5 rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">Fat</span>
                  <span className="text-2xl font-bold">{totalNutrition.fat}g</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-primary/5 rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">Sodium</span>
                  <span className="text-2xl font-bold">{totalNutrition.sodium}mg</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center justify-center p-3 bg-primary/5 rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">Fiber</span>
                  <span className="text-2xl font-bold">{totalNutrition.fiber}g</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-primary/5 rounded-lg">
                  <span className="text-sm font-medium text-muted-foreground">Cholesterol</span>
                  <span className="text-2xl font-bold">{totalNutrition.cholesterol}mg</span>
                </div>
              </div>

              {/* Exercise Equivalent */}
              <div className="p-4 bg-primary/5 rounded-lg">
                <div className="text-sm font-medium text-muted-foreground text-center mb-3">
                  Time to Burn {totalNutrition.calories} Calories
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">Walking</span>
                    <span className="text-xl font-medium">{calculateExerciseDuration(totalNutrition.calories).walking}m</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">Running</span>
                    <span className="text-xl font-medium">{calculateExerciseDuration(totalNutrition.calories).running}m</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">Cycling</span>
                    <span className="text-xl font-medium">{calculateExerciseDuration(totalNutrition.calories).cycling}m</span>
                  </div>
                </div>
              </div>

              {/* Logo */}
              <div className="flex justify-center">
                <div className="flex items-center gap-2.5">
                  <div className="bg-primary p-1.5 rounded-lg">
                    <UtensilsCrossed className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                  </div>
                  <span className="text-base sm:text-lg font-semibold whitespace-nowrap">
                    Panda Express Nutrition
                  </span>
                </div>
              </div>

              {/* Selected Items */}
              <div className="space-y-4">
                {selectedItems.map((item) => {
                  const menuItem = menuItems.find((i) => i.id === item.id);
                  if (!menuItem) return null;
                  
                  return (
                    <div key={item.id} className="flex items-start justify-between gap-4 bg-muted/40 rounded-lg p-3">
                      <div className="flex-grow min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-sm font-medium break-words pr-2 flex-grow">
                            {menuItem.name}
                          </div>
                          <div className="flex-shrink-0 flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 hover:bg-muted"
                              onClick={() => onUpdateServings(item.id, item.servings - 1)}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease servings</span>
                            </Button>
                            <span className="text-sm w-4 text-center font-medium">{item.servings}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 hover:bg-muted"
                              onClick={() => onUpdateServings(item.id, item.servings + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase servings</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-destructive hover:bg-destructive/10"
                              onClick={() => onRemoveItem(item.id)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove item</span>
                            </Button>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1.5 space-y-0.5">
                          <div>{menuItem.nutrition.calories * item.servings} cal</div>
                          <div>{menuItem.nutrition.protein * item.servings}g protein</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
        <div className="container p-4 space-y-2">
          {!isExpanded && selectedItems.length > 0 && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsExpanded(true)}
              className="w-full h-11"
            >
              <ChevronUp className="h-4 w-4 mr-2" />
              View Selected Items ({selectedItems.length})
            </Button>
          )}
          <div className="flex gap-2">
            <Button
              variant={selectedItems.length > 0 ? "default" : "ghost"}
              size="lg"
              onClick={() => selectedItems.length > 0 && setShowNutrition(true)}
              disabled={selectedItems.length === 0}
              className={cn(
                "flex-1 h-11",
                selectedItems.length > 0 && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              {selectedItems.length > 0 ? (
                <>
                  <ClipboardList className="h-5 w-5 mr-2" />
                  Calculate Nutrition
                  <span className="ml-2">({selectedItems.length})</span>
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Add Items
                </>
              )}
            </Button>
            {selectedItems.length > 0 && isExpanded && (
              <Button
                variant="outline"
                size="lg"
                onClick={onReset}
                className="h-11 px-4 hover:bg-destructive hover:text-destructive-foreground"
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
