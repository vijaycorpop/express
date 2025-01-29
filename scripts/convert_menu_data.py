import pandas as pd
import json
import re

def clean_string(s):
    if pd.isna(s):
        return []
    return [x.strip() for x in str(s).split(',') if x.strip()]

def slugify(s):
    s = str(s).lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    s = s.strip('-')
    return s

def safe_float(value):
    if pd.isna(value):
        return 0
    if isinstance(value, str):
        if value.strip() == '<1':
            return 0.5
        try:
            return float(value)
        except ValueError:
            return 0
    return float(value)

def get_icon(name):
    name_lower = name.lower()
    if any(word in name_lower for word in ['chicken', 'beef', 'fish']):
        return 'Drumstick'
    elif any(word in name_lower for word in ['shrimp']):
        return 'Fish'
    elif any(word in name_lower for word in ['rice']):
        return 'Wheat'
    elif any(word in name_lower for word in ['noodles', 'chow mein']):
        return 'Noodles'
    elif any(word in name_lower for word in ['vegetables', 'broccoli', 'mixed veggies']):
        return 'Salad'
    elif any(word in name_lower for word in ['soup']):
        return 'Soup'
    elif any(word in name_lower for word in ['roll', 'egg roll']):
        return 'Cookie'
    elif any(word in name_lower for word in ['sauce', 'sweet']):
        return 'UtensilsCrossed'
    else:
        return 'UtensilsCrossed'

# Read the Excel file
df = pd.read_excel('./expressdata.xlsx')

# Initialize categories and menu items
menu_items = []
current_category = None

# Process each row
for index, row in df.iterrows():
    name = row['Menu Item']
    
    # Skip empty rows
    if pd.isna(name):
        continue
        
    # Check if this is a category row (no nutrition info)
    is_category = pd.isna(row['CALORIES'])
    
    if is_category:
        current_category = name.strip()
        continue
        
    item = {
        "id": str(len(menu_items) + 1),
        "name": name,
        "category": current_category or "Other",
        "icon": get_icon(name),
        "nutrition": {
            "calories": int(safe_float(row['CALORIES'])),
            "protein": safe_float(row['PROTEIN (G)']),
            "carbs": safe_float(row['TOTAL CARB (G)']),
            "fat": safe_float(row['TOTAL FAT (G)']),
            "sodium": safe_float(row['SODIUM (MG)']),
            "cholesterol": safe_float(row['CHOLESTEROL (MG)']),
            "fiber": safe_float(row['DIETARY FIBER (G)'])
        },
        "allergens": [],  # We'll need allergen data
        "dietary": []  # We'll need dietary data
    }
    menu_items.append(item)

# Create TypeScript output
ts_output = """// This file is auto-generated. Do not edit manually.
export interface MenuItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sodium: number;
    cholesterol: number;
    fiber: number;
  };
  allergens: string[];
  dietary: string[];
}

export const menuItems: MenuItem[] = """ + json.dumps(menu_items, indent=2) + ";"

# Write the TypeScript file
with open('./lib/data.ts', 'w') as f:
    f.write(ts_output)

print("Menu data has been updated successfully!")
