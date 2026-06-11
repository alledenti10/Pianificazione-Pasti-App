-- Dietary tags for recipes
CREATE TABLE dietary_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT ''
);

-- Recipe <-> Dietary tags
CREATE TABLE recipe_dietary_tags (
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES dietary_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (recipe_id, tag_id)
);

-- User favorites
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);

-- Shopping lists
CREATE TABLE shopping_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Lista della spesa',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Shopping list items
CREATE TABLE shopping_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  list_id UUID NOT NULL REFERENCES shopping_lists(id) ON DELETE CASCADE,
  ingredient_name TEXT NOT NULL,
  quantity TEXT NOT NULL DEFAULT '',
  checked BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  recipe_id UUID REFERENCES recipes(id) ON DELETE SET NULL
);

-- Meal plan
CREATE TABLE meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  meal_date DATE NOT NULL,
  meal_type TEXT NOT NULL CHECK (meal_type IN ('colazione', 'pranzo', 'cena', 'snack')),
  servings INT NOT NULL DEFAULT 2,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, meal_date, meal_type)
);

-- User profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  dietary_preferences TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE dietary_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_dietary_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Public read for tags
CREATE POLICY "read_dietary_tags" ON dietary_tags FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "read_recipe_dietary_tags" ON recipe_dietary_tags FOR SELECT TO anon, authenticated USING (true);

-- User-owned policies
CREATE POLICY "select_own_favorites" ON favorites FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_favorites" ON favorites FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_favorites" ON favorites FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "select_own_shopping_lists" ON shopping_lists FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_shopping_lists" ON shopping_lists FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_shopping_lists" ON shopping_lists FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_shopping_lists" ON shopping_lists FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "select_own_shopping_items" ON shopping_items FOR SELECT TO authenticated USING (list_id IN (SELECT id FROM shopping_lists WHERE user_id = auth.uid()));
CREATE POLICY "insert_own_shopping_items" ON shopping_items FOR INSERT TO authenticated WITH CHECK (list_id IN (SELECT id FROM shopping_lists WHERE user_id = auth.uid()));
CREATE POLICY "update_own_shopping_items" ON shopping_items FOR UPDATE TO authenticated USING (list_id IN (SELECT id FROM shopping_lists WHERE user_id = auth.uid())) WITH CHECK (list_id IN (SELECT id FROM shopping_lists WHERE user_id = auth.uid()));
CREATE POLICY "delete_own_shopping_items" ON shopping_items FOR DELETE TO authenticated USING (list_id IN (SELECT id FROM shopping_lists WHERE user_id = auth.uid()));

CREATE POLICY "select_own_meal_plans" ON meal_plans FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_meal_plans" ON meal_plans FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_meal_plans" ON meal_plans FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_meal_plans" ON meal_plans FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "select_own_profile" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Indexes
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_shopping_lists_user ON shopping_lists(user_id);
CREATE INDEX idx_shopping_items_list ON shopping_items(list_id);
CREATE INDEX idx_meal_plans_user_date ON meal_plans(user_id, meal_date);
