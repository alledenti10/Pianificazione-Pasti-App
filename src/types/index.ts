export interface Ingredient {
  id: string;
  name: string;
  category: string;
  icon: string;
}

export interface RecipeIngredient {
  name: string;
  icon: string;
  quantity: string;
  is_required: boolean;
  available: boolean;
}

export interface DietaryTag {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  instructions: string;
  prep_time_min: number;
  difficulty: string;
  servings: number;
  image_url: string | null;
  dietary_tags?: DietaryTag[];
}

export interface RecipeSuggestion {
  id: string;
  name: string;
  description: string;
  instructions: string;
  prep_time_min: number;
  difficulty: string;
  servings: number;
  image_url: string | null;
  ingredients: RecipeIngredient[];
  dietary_tags?: DietaryTag[];
  match_score: number;
  can_make: boolean;
  required_matched: number;
  required_total: number;
}

export interface Favorite {
  id: string;
  recipe_id: string;
  created_at: string;
  recipes: Recipe;
}

export interface ShoppingList {
  id: string;
  name: string;
  created_at: string;
}

export interface ShoppingItem {
  id: string;
  list_id: string;
  ingredient_name: string;
  quantity: string;
  checked: boolean;
  sort_order: number;
  recipe_id: string | null;
}

export interface MealPlan {
  id: string;
  recipe_id: string;
  meal_date: string;
  meal_type: 'colazione' | 'pranzo' | 'cena' | 'snack';
  servings: number;
  recipes: Recipe;
}

export interface Profile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  dietary_preferences: string[];
}
