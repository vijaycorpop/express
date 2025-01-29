// Average calories burned per minute for different activities
// Based on a person weighing 155 pounds (70 kg)
export const CALORIES_PER_MINUTE = {
  walking: 4.3, // Walking 3.5 mph
  running: 11.4, // Running 6 mph
  cycling: 7.6, // Cycling 12-14 mph
  swimming: 8.9, // Swimming laps, moderate pace
} as const;

export type Activity = keyof typeof CALORIES_PER_MINUTE;

export function calculateExerciseDuration(calories: number) {
  return Object.entries(CALORIES_PER_MINUTE).reduce((acc, [activity, calsPerMin]) => {
    acc[activity as Activity] = Math.round(calories / calsPerMin);
    return acc;
  }, {} as Record<Activity, number>);
}

export function calculateMacroPercentages(protein: number, carbs: number, fat: number) {
  const proteinCals = protein * 4; // 4 calories per gram of protein
  const carbsCals = carbs * 4; // 4 calories per gram of carbs
  const fatCals = fat * 9; // 9 calories per gram of fat
  
  const total = proteinCals + carbsCals + fatCals;
  
  return {
    protein: Math.round((proteinCals / total) * 100),
    carbs: Math.round((carbsCals / total) * 100),
    fat: Math.round((fatCals / total) * 100),
  };
}
