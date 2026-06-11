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
  match_score: number;
  can_make: boolean;
  required_matched: number;
  required_total: number;
}
