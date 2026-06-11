import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { MealPlan } from '../types';

export function useMealPlan() {
  const { user } = useAuth();
  const [plans, setPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = useCallback(async () => {
    if (!user) {
      setPlans([]);
      setLoading(false);
      return;
    }

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    const { data, error } = await supabase
      .from('meal_plans')
      .select('id, recipe_id, meal_date, meal_type, servings, recipes(*)')
      .eq('user_id', user.id)
      .gte('meal_date', startOfWeek.toISOString().split('T')[0])
      .lte('meal_date', endOfWeek.toISOString().split('T')[0])
      .order('meal_date')
      .order('meal_type');

    if (!error) setPlans((data as unknown as MealPlan[]) || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  async function addPlan(recipeId: string, date: string, mealType: MealPlan['meal_type'], servings: number = 2) {
    if (!user) return;

    const { error } = await supabase
      .from('meal_plans')
      .upsert({
        user_id: user.id,
        recipe_id: recipeId,
        meal_date: date,
        meal_type: mealType,
        servings,
      }, { onConflict: 'user_id,meal_date,meal_type' });

    if (!error) await fetchPlans();
  }

  async function removePlan(planId: string) {
    await supabase.from('meal_plans').delete().eq('id', planId);
    await fetchPlans();
  }

  function getPlanForSlot(date: string, mealType: MealPlan['meal_type']) {
    return plans.find((p) => p.meal_date === date && p.meal_type === mealType);
  }

  return { plans, loading, addPlan, removePlan, getPlanForSlot };
}
