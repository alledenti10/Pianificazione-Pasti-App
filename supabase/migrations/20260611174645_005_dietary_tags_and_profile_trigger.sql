-- Dietary tags
INSERT INTO dietary_tags (name, slug, icon) VALUES
  ('Vegetariano', 'vegetariano', '🥬'),
  ('Vegano', 'vegano', '🌱'),
  ('Senza Glutine', 'senza-glutine', '🌾'),
  ('Ricco di Proteine', 'proteico', '💪'),
  ('Veloce', 'veloce', '⚡'),
  ('Comfort Food', 'comfort', '🍲'),
  ('Dolce', 'dolce', '🍰'),
  ('Al Forno', 'forno', '🔥');

-- Tag assignments
-- Carbonara: proteico, comfort
INSERT INTO recipe_dietary_tags (recipe_id, tag_id) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', (SELECT id FROM dietary_tags WHERE slug = 'proteico')),
  ('a1b2c3d4-0001-4000-8000-000000000001', (SELECT id FROM dietary_tags WHERE slug = 'comfort'));

-- Pomodoro: vegetariano, veloce
INSERT INTO recipe_dietary_tags (recipe_id, tag_id) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000002', (SELECT id FROM dietary_tags WHERE slug = 'vegetariano')),
  ('a1b2c3d4-0001-4000-8000-000000000002', (SELECT id FROM dietary_tags WHERE slug = 'veloce'));

-- Risotto: vegetariano, comfort
INSERT INTO recipe_dietary_tags (recipe_id, tag_id) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000003', (SELECT id FROM dietary_tags WHERE slug = 'vegetariano')),
  ('a1b2c3d4-0001-4000-8000-000000000003', (SELECT id FROM dietary_tags WHERE slug = 'comfort'));

-- Parmigiana: vegetariano, forno
INSERT INTO recipe_dietary_tags (recipe_id, tag_id) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000004', (SELECT id FROM dietary_tags WHERE slug = 'vegetariano')),
  ('a1b2c3d4-0001-4000-8000-000000000004', (SELECT id FROM dietary_tags WHERE slug = 'forno'));

-- Pollo: proteico, forno
INSERT INTO recipe_dietary_tags (recipe_id, tag_id) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000005', (SELECT id FROM dietary_tags WHERE slug = 'proteico')),
  ('a1b2c3d4-0001-4000-8000-000000000005', (SELECT id FROM dietary_tags WHERE slug = 'forno'));

-- Puttanesca: veloce
INSERT INTO recipe_dietary_tags (recipe_id, tag_id) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000006', (SELECT id FROM dietary_tags WHERE slug = 'veloce'));

-- Frittata: vegetariano, veloce, proteico
INSERT INTO recipe_dietary_tags (recipe_id, tag_id) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000007', (SELECT id FROM dietary_tags WHERE slug = 'vegetariano')),
  ('a1b2c3d4-0001-4000-8000-000000000007', (SELECT id FROM dietary_tags WHERE slug = 'veloce')),
  ('a1b2c3d4-0001-4000-8000-000000000007', (SELECT id FROM dietary_tags WHERE slug = 'proteico'));

-- Saltimbocca: proteico
INSERT INTO recipe_dietary_tags (recipe_id, tag_id) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000008', (SELECT id FROM dietary_tags WHERE slug = 'proteico'));

-- Arancini: comfort, forno
INSERT INTO recipe_dietary_tags (recipe_id, tag_id) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000009', (SELECT id FROM dietary_tags WHERE slug = 'comfort'));

-- Pasta e Fagioli: vegetariano, comfort
INSERT INTO recipe_dietary_tags (recipe_id, tag_id) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000010', (SELECT id FROM dietary_tags WHERE slug = 'vegetariano')),
  ('a1b2c3d4-0001-4000-8000-000000000010', (SELECT id FROM dietary_tags WHERE slug = 'comfort'));

-- Salsicce: forno, comfort
INSERT INTO recipe_dietary_tags (recipe_id, tag_id) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000011', (SELECT id FROM dietary_tags WHERE slug = 'forno')),
  ('a1b2c3d4-0001-4000-8000-000000000011', (SELECT id FROM dietary_tags WHERE slug = 'comfort'));

-- Tiramisu: dolce, vegetariano
INSERT INTO recipe_dietary_tags (recipe_id, tag_id) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000012', (SELECT id FROM dietary_tags WHERE slug = 'dolce')),
  ('a1b2c3d4-0001-4000-8000-000000000012', (SELECT id FROM dietary_tags WHERE slug = 'vegetariano'));

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
