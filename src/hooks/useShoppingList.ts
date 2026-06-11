import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { ShoppingList, ShoppingItem } from '../types';

export function useShoppingList() {
  const { user } = useAuth();
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [activeList, setActiveList] = useState<ShoppingList | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLists = useCallback(async () => {
    if (!user) {
      setLists([]);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from('shopping_lists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    setLists(data || []);

    if (data && data.length > 0 && !activeList) {
      setActiveList(data[0]);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  useEffect(() => {
    if (!activeList) {
      setItems([]);
      return;
    }

    const channel = supabase
      .channel(`shopping-items-${activeList.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'shopping_items', filter: `list_id=eq.${activeList.id}` },
        () => fetchItems()
      )
      .subscribe();

    fetchItems();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeList]);

  async function fetchItems() {
    if (!activeList) return;

    const { data } = await supabase
      .from('shopping_items')
      .select('*')
      .eq('list_id', activeList.id)
      .order('sort_order');

    setItems(data || []);
  }

  async function createList(name: string) {
    if (!user) return;

    const { data } = await supabase
      .from('shopping_lists')
      .insert({ user_id: user.id, name })
      .select()
      .single();

    if (data) {
      setLists((prev) => [data, ...prev]);
      setActiveList(data);
    }
  }

  async function deleteList(listId: string) {
    await supabase.from('shopping_lists').delete().eq('id', listId);
    const newList = lists.filter((l) => l.id !== listId);
    setLists(newList);
    if (activeList?.id === listId) {
      setActiveList(newList[0] || null);
    }
  }

  async function addItem(ingredientName: string, quantity: string, recipeId?: string) {
    if (!activeList) return;

    await supabase.from('shopping_items').insert({
      list_id: activeList.id,
      ingredient_name: ingredientName,
      quantity,
      recipe_id: recipeId || null,
      sort_order: items.length,
    });
  }

  async function toggleItem(itemId: string, checked: boolean) {
    await supabase.from('shopping_items').update({ checked }).eq('id', itemId);
  }

  async function removeItem(itemId: string) {
    await supabase.from('shopping_items').delete().eq('id', itemId);
  }

  async function addRecipeIngredients(ingredients: Array<{ name: string; quantity: string; is_required: boolean }>, recipeId: string) {
    if (!activeList) return;

    const rows = ingredients
      .filter((i) => i.is_required)
      .map((i, idx) => ({
        list_id: activeList.id,
        ingredient_name: i.name,
        quantity: i.quantity,
        recipe_id: recipeId,
        sort_order: items.length + idx,
      }));

    if (rows.length > 0) {
      await supabase.from('shopping_items').insert(rows);
    }
  }

  async function clearChecked() {
    if (!activeList) return;
    await supabase.from('shopping_items').delete().eq('list_id', activeList.id).eq('checked', true);
  }

  return {
    lists, items, activeList, loading,
    setActiveList, createList, deleteList,
    addItem, toggleItem, removeItem,
    addRecipeIngredients, clearChecked,
  };
}
