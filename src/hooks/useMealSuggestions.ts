import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { RecipeSuggestion } from '../types';

export function useMealSuggestions() {
  const [suggestions, setSuggestions] = useState<RecipeSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function suggest(ingredientIds: string[]) {
    if (ingredientIds.length === 0) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await supabase.functions.invoke('suggest-meals', {
        body: { ingredientIds },
      });

      if (data?.error) {
        setError(data.error);
        setSuggestions([]);
      } else {
        setSuggestions(data?.suggestions || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore di connessione');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }

  return { suggestions, loading, error, suggest };
}
