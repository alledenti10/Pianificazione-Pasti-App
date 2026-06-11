-- Ingredienti
INSERT INTO ingredients (name, category, icon) VALUES
  ('Pasta', 'carboidrati', '🍝'),
  ('Riso', 'carboidrati', '🍚'),
  ('Pane', 'carboidrati', '🍞'),
  ('Farina', 'carboidrati', '🌾'),
  ('Patate', 'carboidrati', '🥔'),
  ('Pangrattato', 'carboidrati', '🌾'),
  ('Pomodori', 'verdure', '🍅'),
  ('Cipolla', 'verdure', '🧅'),
  ('Aglio', 'verdure', '🧄'),
  ('Peperoni', 'verdure', '🫑'),
  ('Zucchine', 'verdure', '🥒'),
  ('Melanzane', 'verdure', '🍆'),
  ('Spinaci', 'verdure', '🥬'),
  ('Carote', 'verdure', '🥕'),
  ('Funghi', 'verdure', '🍄'),
  ('Piselli', 'verdure', '🫛'),
  ('Basilico', 'erbe', '🌿'),
  ('Prezzemolo', 'erbe', '🌿'),
  ('Origano', 'erbe', '🌿'),
  ('Rosmarino', 'erbe', '🌿'),
  ('Olio di oliva', 'condimenti', '🫒'),
  ('Burro', 'condimenti', '🧈'),
  ('Zucchero', 'condimenti', '🍬'),
  ('Sale', 'condimenti', '🧂'),
  ('Pepe', 'condimenti', '🌶️'),
  ('Capperi', 'condimenti', '🫒'),
  ('Olive', 'condimenti', '🫒'),
  ('Cacao', 'condimenti', '🍫'),
  ('Parmigiano', 'latticini', '🧀'),
  ('Mozzarella', 'latticini', '🧀'),
  ('Pecorino', 'latticini', '🧀'),
  ('Ricotta', 'latticini', '🧀'),
  ('Latte', 'latticini', '🥛'),
  ('Panna', 'latticini', '🥛'),
  ('Uova', 'proteine', '🥚'),
  ('Pollo', 'proteine', '🍗'),
  ('Manzo', 'proteine', '🥩'),
  ('Pancetta', 'proteine', '🥓'),
  ('Prosciutto', 'proteine', '🥩'),
  ('Tonno', 'proteine', '🐟'),
  ('Salmone', 'proteine', '🐟'),
  ('Acciughe', 'proteine', '🐟'),
  ('Salsiccia', 'proteine', '🌭'),
  ('Fagioli', 'legumi', '🫘'),
  ('Ceci', 'legumi', '🫘'),
  ('Lenticchie', 'legumi', '🫘'),
  ('Limone', 'frutta', '🍋'),
  ('Vino bianco', 'bevande', '🍷'),
  ('Vino rosso', 'bevande', '🍷'),
  ('Acqua', 'bevande', '💧'),
  ('Caffe', 'bevande', '☕');

-- Ricette
INSERT INTO recipes (id, name, description, instructions, prep_time_min, difficulty, servings, image_url) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Spaghetti alla Carbonara', 'Il classico della cucina romana: cremosa, saporita e veloce.', '1. Cuoci gli spaghetti in acqua salata\n2. In una ciotola sbatti uova, pecorino e pepe\n3. Rosola la pancetta fino a renderla croccante\n4. Scola la pasta e salta con la pancetta\n5. Togli dal fuoco e aggiungi il composto di uova\n6. Mescola velocemente per creare la crema\n7. Servi con altro pecorino e pepe', 20, 'facile', 4, 'https://images.pexels.com/photos/6287525/pexels-photo-6287525.jpeg?auto=compress&cs=tinysrgb&w=600'),

  ('a1b2c3d4-0001-4000-8000-000000000002', 'Pasta al Pomodoro e Basilico', 'Semplicità italiana: pomodoro fresco, basilico e un filo d''olio.', '1. Cuoci la pasta in acqua salata\n2. Soffriggi aglio in olio d''oliva\n3. Aggiungi i pomodori tagliati e cuoci 15 min\n4. Regola di sale e pepe\n5. Scola la pasta e condisci col sugo\n6. Aggiungi basilico fresco e parmigiano', 25, 'facile', 4, 'https://images.pexels.com/photos/6287534/pexels-photo-6287534.jpeg?auto=compress&cs=tinysrgb&w=600'),

  ('a1b2c3d4-0001-4000-8000-000000000003', 'Risotto ai Funghi', 'Cremoso e avvolgente, un risotto con il profumo del bosco.', '1. Fai soffriggere cipolla in burro e olio\n2. Aggiungi il riso e tostalo 2 minuti\n3. Sfuma col vino bianco\n4. Aggiungi brodo caldo un mestolo alla volta\n5. A metà cottura aggiungi i funghi\n6. Finisci con burro e parmigiano\n7. Lascia riposare 2 minuti e servi', 40, 'media', 4, 'https://images.pexels.com/photos/6287533/pexels-photo-6287533.jpeg?auto=compress&cs=tinysrgb&w=600'),

  ('a1b2c3d4-0001-4000-8000-000000000004', 'Melanzane alla Parmigiana', 'Strati di melanzane, pomodoro e formaggio fuso al forno.', '1. Taglia le melanzane a fette e salale\n2. Friggile o grigliale fino a doratura\n3. Prepara il sugo con pomodoro e basilico\n4. Alterna strati: melanzane, sugo, mozzarella, parmigiano\n5. Inforna a 180°C per 30 minuti\n6. Lascia riposare 10 minuti prima di servire', 60, 'media', 6, 'https://images.pexels.com/photos/6287528/pexels-photo-6287528.jpeg?auto=compress&cs=tinysrgb&w=600'),

  ('a1b2c3d4-0001-4000-8000-000000000005', 'Pollo al Limone e Rosmarino', 'Pollo arrosto aromatico con limone e rosmarino.', '1. Preriscalda il forno a 200°C\n2. Massaggia il pollo con olio, sale e rosmarino\n3. Adagia fette di limone sopra\n4. Inforna per 45-50 minuti\n5. Irrorando col succo di limone a metà cottura\n6. Servi con il fondo di cottura', 55, 'facile', 4, 'https://images.pexels.com/photos/6287531/pexels-photo-6287531.jpeg?auto=compress&cs=tinysrgb&w=600'),

  ('a1b2c3d4-0001-4000-8000-000000000006', 'Pasta alla Puttanesca', 'Sapore deciso: pomodoro, acciughe, capperi e olive.', '1. Cuoci la pasta in acqua salata\n2. Soffriggi aglio e acciughe in olio\n3. Aggiungi pomodori, capperi e olive\n4. Cuoci il sugo 15 minuti\n5. Scola la pasta e saltala nel sugo\n6. Spolvera con prezzemolo fresco', 25, 'facile', 4, 'https://images.pexels.com/photos/6287530/pexels-photo-6287530.jpeg?auto=compress&cs=tinysrgb&w=600'),

  ('a1b2c3d4-0001-4000-8000-000000000007', 'Frittata con Spinaci', 'Semplice e nutriente, perfetta per una cena veloce.', '1. Lava e cuoci gli spinaci in padella\n2. Sbatti le uova con sale e pepe\n3. Aggiungi gli spinaci alle uova\n4. Versa in padella con olio caldo\n5. Cuoci a fuoco medio 5 minuti per lato\n6. Servi calda o a temperatura ambiente', 20, 'facile', 2, 'https://images.pexels.com/photos/6287527/pexels-photo-6287527.jpeg?auto=compress&cs=tinysrgb&w=600'),

  ('a1b2c3d4-0001-4000-8000-000000000008', 'Saltimbocca alla Romana', 'Scaloppine con prosciutto e salvia, un classico romano.', '1. Batti le fettine di vitello sottili\n2. Adagia una fetta di prosciutto e una foglia di salvia\n3. Fissa con uno stecchino\n4. Infarina leggermente\n5. Cuoci in padella con burro 2 min per lato\n6. Sfuma col vino bianco\n7. Servi col fondo di cottura', 25, 'media', 4, 'https://images.pexels.com/photos/6287526/pexels-photo-6287526.jpeg?auto=compress&cs=tinysrgb&w=600'),

  ('a1b2c3d4-0001-4000-8000-000000000009', 'Arancini di Riso', 'Palline di riso fritte ripiene di ragù e formaggio.', '1. Prepara il risotto e fallo raffreddare\n2. Forma palline con un cuore di mozzarella\n3. Passa in uovo sbattuto e pangrattato\n4. Friggi in olio caldo fino a doratura\n5. Asciuga su carta e servi caldi', 45, 'difficile', 4, 'https://images.pexels.com/photos/6287529/pexels-photo-6287529.jpeg?auto=compress&cs=tinysrgb&w=600'),

  ('a1b2c3d4-0001-4000-8000-000000000010', 'Pasta e Fagioli', 'Zuppa rustica e confortante della tradizione contadina.', '1. Soffriggi cipolla, carota e aglio\n2. Aggiungi i fagioli e pomodori\n3. Copri con acqua e cuoci 30 minuti\n4. Aggiungi la pasta e cuoci nel brodo\n5. Regola di sale, pepe e olio d''oliva\n6. Servi con parmigiano e prezzemolo', 40, 'facile', 4, 'https://images.pexels.com/photos/6287532/pexels-photo-6287532.jpeg?auto=compress&cs=tinysrgb&w=600'),

  ('a1b2c3d4-0001-4000-8000-000000000011', 'Salsicce con Patate al Forno', 'Piatto unico confortante e saporito.', '1. Preriscalda il forno a 200°C\n2. Taglia le patate a spicchi\n3. Condisci patate con olio, rosmarino, sale e pepe\n4. Disponi salsicce e patate sulla teglia\n5. Inforna per 40 minuti girando a metà\n6. Servi caldo', 50, 'facile', 4, 'https://images.pexels.com/photos/6287524/pexels-photo-6287524.jpeg?auto=compress&cs=tinysrgb&w=600'),

  ('a1b2c3d4-0001-4000-8000-000000000012', 'Tiramisu', 'Il dolce italiano per eccellenza: strati di crema e caffe.', '1. Prepara il caffe e fallo raffreddare\n2. Sbatti tuorli con zucchero fino a crema\n3. Aggiungi la ricotta e mescola\n4. Monta gli albumi a neve e incorpora\n5. Bagna i biscotti nel caffe\n6. Alterna strati di crema e biscotti\n7. Spolvera con cacao e metti in frigo 4 ore', 30, 'media', 6, 'https://images.pexels.com/photos/6287535/pexels-photo-6287535.jpeg?auto=compress&cs=tinysrgb&w=600');
