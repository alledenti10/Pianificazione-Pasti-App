import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Ingredient } from '../types';

export function useIngredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIngredients() {
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .order('category')
        .order('name');

      if (error) {
        console.error('Error fetching ingredients:', error);
      } else {
        setIngredients(data || []);
      }
      setLoading(false);
    }

    fetchIngredients();
  }, []);

  return { ingredients, loading };
}
