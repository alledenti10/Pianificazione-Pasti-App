import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface SuggestRequest {
  ingredientIds: string[];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    let ingredientIds: string[] = [];

    if (req.method === "POST") {
      const body: SuggestRequest = await req.json();
      ingredientIds = body.ingredientIds || [];
    } else if (req.method === "GET") {
      const url = new URL(req.url);
      const ids = url.searchParams.get("ids");
      if (ids) {
        ingredientIds = ids.split(",");
      }
    }

    if (ingredientIds.length === 0) {
      return new Response(
        JSON.stringify({ error: "Serve almeno un ingrediente" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Fetch all recipes with their ingredients
    const { data: recipes, error: recipesError } = await supabase
      .from("recipes")
      .select(`
        id, name, description, instructions, prep_time_min, difficulty, servings, image_url,
        recipe_ingredients (
          ingredient_id, quantity, is_required,
          ingredients ( id, name, icon )
        )
      `);

    if (recipesError) {
      throw new Error(recipesError.message);
    }

    const ingredientIdSet = new Set(ingredientIds);

    // Score each recipe based on ingredient match
    const scored = recipes.map((recipe: Record<string, unknown>) => {
      const riList = recipe.recipe_ingredients as Array<Record<string, unknown>>;
      const requiredIngredients = riList.filter((ri) => ri.is_required);
      const optionalIngredients = riList.filter((ri) => !ri.is_required);

      const requiredMatched = requiredIngredients.filter((ri) =>
        ingredientIdSet.has(ri.ingredient_id as string)
      );
      const optionalMatched = optionalIngredients.filter((ri) =>
        ingredientIdSet.has(ri.ingredient_id as string)
      );

      const requiredTotal = requiredIngredients.length;
      const requiredMatchCount = requiredMatched.length;

      const canMake = requiredMatchCount === requiredTotal;
      const matchScore = requiredTotal > 0
        ? requiredMatchCount / requiredTotal
        : 0;
      const bonusScore = optionalIngredients.length > 0
        ? optionalMatched.length / optionalIngredients.length * 0.3
        : 0;

      // Format ingredients for response
      const allIngredients = riList.map((ri: Record<string, unknown>) => {
        const ing = ri.ingredients as Record<string, unknown>;
        return {
          name: ing.name,
          icon: ing.icon,
          quantity: ri.quantity,
          is_required: ri.is_required,
          available: ingredientIdSet.has(ri.ingredient_id as string),
        };
      });

      return {
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        instructions: recipe.instructions,
        prep_time_min: recipe.prep_time_min,
        difficulty: recipe.difficulty,
        servings: recipe.servings,
        image_url: recipe.image_url,
        ingredients: allIngredients,
        match_score: Math.round((matchScore + bonusScore) * 100),
        can_make: canMake,
        required_matched: requiredMatchCount,
        required_total: requiredTotal,
      };
    });

    // Filter to recipes with at least 50% match, sort by score desc
    const suggestions = scored
      .filter((r) => r.match_score >= 40)
      .sort((a, b) => {
        // Prioritise can_make recipes, then by score
        if (a.can_make !== b.can_make) return a.can_make ? -1 : 1;
        return b.match_score - a.match_score;
      });

    return new Response(
      JSON.stringify({ suggestions }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Errore del server" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
