import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Favorite } from '../types';

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('favorites')
      .select('id, recipe_id, created_at, recipes(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error) setFavorites((data as unknown as Favorite[]) || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  async function toggleFavorite(recipeId: string) {
    if (!user) return;

    const existing = favorites.find((f) => f.recipe_id === recipeId);

    if (existing) {
      await supabase.from('favorites').delete().eq('id', existing.id);
    } else {
      await supabase.from('favorites').insert({
        user_id: user.id,
        recipe_id: recipeId,
      });
    }

    await fetchFavorites();
  }

  function isFavorite(recipeId: string) {
    return favorites.some((f) => f.recipe_id === recipeId);
  }

  return { favorites, loading, toggleFavorite, isFavorite };
}
