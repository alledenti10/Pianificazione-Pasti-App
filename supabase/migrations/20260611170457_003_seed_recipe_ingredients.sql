-- Carbonara
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, is_required) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', (SELECT id FROM ingredients WHERE name = 'Pasta'), '400g', true),
  ('a1b2c3d4-0001-4000-8000-000000000001', (SELECT id FROM ingredients WHERE name = 'Uova'), '4 tuorli', true),
  ('a1b2c3d4-0001-4000-8000-000000000001', (SELECT id FROM ingredients WHERE name = 'Pecorino'), '100g', true),
  ('a1b2c3d4-0001-4000-8000-000000000001', (SELECT id FROM ingredients WHERE name = 'Pancetta'), '150g', true),
  ('a1b2c3d4-0001-4000-8000-000000000001', (SELECT id FROM ingredients WHERE name = 'Pepe'), 'q.b.', true),
  ('a1b2c3d4-0001-4000-8000-000000000001', (SELECT id FROM ingredients WHERE name = 'Sale'), 'q.b.', false);

-- Pomodoro e Basilico
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, is_required) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000002', (SELECT id FROM ingredients WHERE name = 'Pasta'), '400g', true),
  ('a1b2c3d4-0001-4000-8000-000000000002', (SELECT id FROM ingredients WHERE name = 'Pomodori'), '500g', true),
  ('a1b2c3d4-0001-4000-8000-000000000002', (SELECT id FROM ingredients WHERE name = 'Basilico'), 'un mazzetto', true),
  ('a1b2c3d4-0001-4000-8000-000000000002', (SELECT id FROM ingredients WHERE name = 'Aglio'), '2 spicchi', true),
  ('a1b2c3d4-0001-4000-8000-000000000002', (SELECT id FROM ingredients WHERE name = 'Olio di oliva'), '4 cucchiai', true),
  ('a1b2c3d4-0001-4000-8000-000000000002', (SELECT id FROM ingredients WHERE name = 'Parmigiano'), 'q.b.', false),
  ('a1b2c3d4-0001-4000-8000-000000000002', (SELECT id FROM ingredients WHERE name = 'Sale'), 'q.b.', false);

-- Risotto ai Funghi
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, is_required) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000003', (SELECT id FROM ingredients WHERE name = 'Riso'), '320g', true),
  ('a1b2c3d4-0001-4000-8000-000000000003', (SELECT id FROM ingredients WHERE name = 'Funghi'), '300g', true),
  ('a1b2c3d4-0001-4000-8000-000000000003', (SELECT id FROM ingredients WHERE name = 'Cipolla'), '1', true),
  ('a1b2c3d4-0001-4000-8000-000000000003', (SELECT id FROM ingredients WHERE name = 'Burro'), '50g', true),
  ('a1b2c3d4-0001-4000-8000-000000000003', (SELECT id FROM ingredients WHERE name = 'Parmigiano'), '80g', false),
  ('a1b2c3d4-0001-4000-8000-000000000003', (SELECT id FROM ingredients WHERE name = 'Vino bianco'), '1/2 bicchiere', false),
  ('a1b2c3d4-0001-4000-8000-000000000003', (SELECT id FROM ingredients WHERE name = 'Olio di oliva'), '2 cucchiai', false);

-- Melanzane alla Parmigiana
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, is_required) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000004', (SELECT id FROM ingredients WHERE name = 'Melanzane'), '3 grandi', true),
  ('a1b2c3d4-0001-4000-8000-000000000004', (SELECT id FROM ingredients WHERE name = 'Pomodori'), '600g', true),
  ('a1b2c3d4-0001-4000-8000-000000000004', (SELECT id FROM ingredients WHERE name = 'Mozzarella'), '250g', true),
  ('a1b2c3d4-0001-4000-8000-000000000004', (SELECT id FROM ingredients WHERE name = 'Parmigiano'), '100g', true),
  ('a1b2c3d4-0001-4000-8000-000000000004', (SELECT id FROM ingredients WHERE name = 'Basilico'), 'q.b.', false),
  ('a1b2c3d4-0001-4000-8000-000000000004', (SELECT id FROM ingredients WHERE name = 'Olio di oliva'), 'q.b.', true);

-- Pollo al Limone
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, is_required) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000005', (SELECT id FROM ingredients WHERE name = 'Pollo'), '1 intero', true),
  ('a1b2c3d4-0001-4000-8000-000000000005', (SELECT id FROM ingredients WHERE name = 'Limone'), '2', true),
  ('a1b2c3d4-0001-4000-8000-000000000005', (SELECT id FROM ingredients WHERE name = 'Rosmarino'), '3 rametti', true),
  ('a1b2c3d4-0001-4000-8000-000000000005', (SELECT id FROM ingredients WHERE name = 'Olio di oliva'), '3 cucchiai', true),
  ('a1b2c3d4-0001-4000-8000-000000000005', (SELECT id FROM ingredients WHERE name = 'Sale'), 'q.b.', false),
  ('a1b2c3d4-0001-4000-8000-000000000005', (SELECT id FROM ingredients WHERE name = 'Pepe'), 'q.b.', false);

-- Puttanesca
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, is_required) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000006', (SELECT id FROM ingredients WHERE name = 'Pasta'), '400g', true),
  ('a1b2c3d4-0001-4000-8000-000000000006', (SELECT id FROM ingredients WHERE name = 'Pomodori'), '400g', true),
  ('a1b2c3d4-0001-4000-8000-000000000006', (SELECT id FROM ingredients WHERE name = 'Acciughe'), '4 filetti', true),
  ('a1b2c3d4-0001-4000-8000-000000000006', (SELECT id FROM ingredients WHERE name = 'Capperi'), '2 cucchiai', true),
  ('a1b2c3d4-0001-4000-8000-000000000006', (SELECT id FROM ingredients WHERE name = 'Olive'), '100g', true),
  ('a1b2c3d4-0001-4000-8000-000000000006', (SELECT id FROM ingredients WHERE name = 'Aglio'), '2 spicchi', true),
  ('a1b2c3d4-0001-4000-8000-000000000006', (SELECT id FROM ingredients WHERE name = 'Prezzemolo'), 'q.b.', false);

-- Frittata Spinaci
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, is_required) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000007', (SELECT id FROM ingredients WHERE name = 'Uova'), '6', true),
  ('a1b2c3d4-0001-4000-8000-000000000007', (SELECT id FROM ingredients WHERE name = 'Spinaci'), '300g', true),
  ('a1b2c3d4-0001-4000-8000-000000000007', (SELECT id FROM ingredients WHERE name = 'Parmigiano'), '50g', false),
  ('a1b2c3d4-0001-4000-8000-000000000007', (SELECT id FROM ingredients WHERE name = 'Olio di oliva'), '2 cucchiai', true),
  ('a1b2c3d4-0001-4000-8000-000000000007', (SELECT id FROM ingredients WHERE name = 'Sale'), 'q.b.', false),
  ('a1b2c3d4-0001-4000-8000-000000000007', (SELECT id FROM ingredients WHERE name = 'Pepe'), 'q.b.', false);

-- Saltimbocca
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, is_required) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000008', (SELECT id FROM ingredients WHERE name = 'Manzo'), '8 fettine', true),
  ('a1b2c3d4-0001-4000-8000-000000000008', (SELECT id FROM ingredients WHERE name = 'Prosciutto'), '8 fette', true),
  ('a1b2c3d4-0001-4000-8000-000000000008', (SELECT id FROM ingredients WHERE name = 'Burro'), '50g', true),
  ('a1b2c3d4-0001-4000-8000-000000000008', (SELECT id FROM ingredients WHERE name = 'Vino bianco'), '1/2 bicchiere', false),
  ('a1b2c3d4-0001-4000-8000-000000000008', (SELECT id FROM ingredients WHERE name = 'Farina'), 'q.b.', false),
  ('a1b2c3d4-0001-4000-8000-000000000008', (SELECT id FROM ingredients WHERE name = 'Sale'), 'q.b.', false),
  ('a1b2c3d4-0001-4000-8000-000000000008', (SELECT id FROM ingredients WHERE name = 'Pepe'), 'q.b.', false);

-- Arancini
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, is_required) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000009', (SELECT id FROM ingredients WHERE name = 'Riso'), '300g', true),
  ('a1b2c3d4-0001-4000-8000-000000000009', (SELECT id FROM ingredients WHERE name = 'Mozzarella'), '150g', true),
  ('a1b2c3d4-0001-4000-8000-000000000009', (SELECT id FROM ingredients WHERE name = 'Uova'), '2', true),
  ('a1b2c3d4-0001-4000-8000-000000000009', (SELECT id FROM ingredients WHERE name = 'Pangrattato'), '200g', true),
  ('a1b2c3d4-0001-4000-8000-000000000009', (SELECT id FROM ingredients WHERE name = 'Olio di oliva'), 'per friggere', true),
  ('a1b2c3d4-0001-4000-8000-000000000009', (SELECT id FROM ingredients WHERE name = 'Pomodori'), '200g', false),
  ('a1b2c3d4-0001-4000-8000-000000000009', (SELECT id FROM ingredients WHERE name = 'Pecorino'), '50g', false),
  ('a1b2c3d4-0001-4000-8000-000000000009', (SELECT id FROM ingredients WHERE name = 'Cipolla'), '1', false);

-- Pasta e Fagioli
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, is_required) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000010', (SELECT id FROM ingredients WHERE name = 'Pasta'), '200g', true),
  ('a1b2c3d4-0001-4000-8000-000000000010', (SELECT id FROM ingredients WHERE name = 'Fagioli'), '300g', true),
  ('a1b2c3d4-0001-4000-8000-000000000010', (SELECT id FROM ingredients WHERE name = 'Cipolla'), '1', true),
  ('a1b2c3d4-0001-4000-8000-000000000010', (SELECT id FROM ingredients WHERE name = 'Carote'), '1', false),
  ('a1b2c3d4-0001-4000-8000-000000000010', (SELECT id FROM ingredients WHERE name = 'Pomodori'), '200g', false),
  ('a1b2c3d4-0001-4000-8000-000000000010', (SELECT id FROM ingredients WHERE name = 'Olio di oliva'), '3 cucchiai', true),
  ('a1b2c3d4-0001-4000-8000-000000000010', (SELECT id FROM ingredients WHERE name = 'Parmigiano'), 'q.b.', false),
  ('a1b2c3d4-0001-4000-8000-000000000010', (SELECT id FROM ingredients WHERE name = 'Aglio'), '2 spicchi', false),
  ('a1b2c3d4-0001-4000-8000-000000000010', (SELECT id FROM ingredients WHERE name = 'Prezzemolo'), 'q.b.', false),
  ('a1b2c3d4-0001-4000-8000-000000000010', (SELECT id FROM ingredients WHERE name = 'Sale'), 'q.b.', false);

-- Salsicce e Patate
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, is_required) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000011', (SELECT id FROM ingredients WHERE name = 'Salsiccia'), '4', true),
  ('a1b2c3d4-0001-4000-8000-000000000011', (SELECT id FROM ingredients WHERE name = 'Patate'), '600g', true),
  ('a1b2c3d4-0001-4000-8000-000000000011', (SELECT id FROM ingredients WHERE name = 'Rosmarino'), '2 rametti', true),
  ('a1b2c3d4-0001-4000-8000-000000000011', (SELECT id FROM ingredients WHERE name = 'Olio di oliva'), '3 cucchiai', true),
  ('a1b2c3d4-0001-4000-8000-000000000011', (SELECT id FROM ingredients WHERE name = 'Sale'), 'q.b.', false),
  ('a1b2c3d4-0001-4000-8000-000000000011', (SELECT id FROM ingredients WHERE name = 'Pepe'), 'q.b.', false);

-- Tiramisu
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, quantity, is_required) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000012', (SELECT id FROM ingredients WHERE name = 'Uova'), '4', true),
  ('a1b2c3d4-0001-4000-8000-000000000012', (SELECT id FROM ingredients WHERE name = 'Zucchero'), '100g', true),
  ('a1b2c3d4-0001-4000-8000-000000000012', (SELECT id FROM ingredients WHERE name = 'Ricotta'), '500g', true),
  ('a1b2c3d4-0001-4000-8000-000000000012', (SELECT id FROM ingredients WHERE name = 'Caffe'), '300ml', true),
  ('a1b2c3d4-0001-4000-8000-000000000012', (SELECT id FROM ingredients WHERE name = 'Cacao'), 'q.b.', true);
