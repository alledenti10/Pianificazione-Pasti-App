import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { DietaryTag } from '../types';

export function useDietaryTags() {
  const [tags, setTags] = useState<DietaryTag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from('dietary_tags')
        .select('*')
        .order('name');

      if (!error) setTags(data || []);
      setLoading(false);
    }
    fetch();
  }, []);

  return { tags, loading };
}
