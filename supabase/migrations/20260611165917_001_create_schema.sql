-- Ingredienti disponibili
CREATE TABLE ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT 'altro',
  icon TEXT NOT NULL DEFAULT '🥘'
);

-- Ricette
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  instructions TEXT NOT NULL DEFAULT '',
  prep_time_min INT NOT NULL DEFAULT 30,
  difficulty TEXT NOT NULL DEFAULT 'media' CHECK (difficulty IN ('facile', 'media', 'difficile')),
  servings INT NOT NULL DEFAULT 4,
  image_url TEXT
);

-- Relazione ricetta-ingredienti
CREATE TABLE recipe_ingredients (
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
  quantity TEXT NOT NULL DEFAULT '',
  is_required BOOLEAN NOT NULL DEFAULT true,
  PRIMARY KEY (recipe_id, ingredient_id)
);

-- RLS
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;

-- Public read access (questi dati sono pubblici, non per utente)
CREATE POLICY "read_ingredients" ON ingredients FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "read_recipes" ON recipes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "read_recipe_ingredients" ON recipe_ingredients FOR SELECT TO anon, authenticated USING (true);

-- Indici
CREATE INDEX idx_recipe_ingredients_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX idx_recipe_ingredients_ingredient ON recipe_ingredients(ingredient_id);
CREATE INDEX idx_ingredients_category ON ingredients(category);
