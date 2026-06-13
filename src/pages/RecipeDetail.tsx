import { useRouterParams, Link, useRouter } from '../lib/router';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import { useShoppingList } from '../hooks/useShoppingList';
import type { Recipe } from '../types';
import './RecipeDetail.css';

export default function RecipeDetail() {
  const { id } = useRouterParams() as { id: string };
  const { goBack } = useRouter();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addRecipeIngredients, activeList, createList, lists } = useShoppingList();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState<Array<{ name: string; icon: string; quantity: string; is_required: boolean }>>([]);
  const [dietaryTags, setDietaryTags] = useState<Array<{ name: string; slug: string; icon: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [showAddToPlan, setShowAddToPlan] = useState(false);
  const [showAddToList, setShowAddToList] = useState(false);

  const fav = isFavorite(id!);

  useEffect(() => {
    async function fetchRecipe() {
      if (!id) return;

      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        setLoading(false);
        return;
      }

      setRecipe(data);

      // Fetch ingredients
      const { data: riData } = await supabase
        .from('recipe_ingredients')
        .select('quantity, is_required, ingredients(name, icon)')
        .eq('recipe_id', id);

      if (riData) {
        setIngredients(riData.map((ri: Record<string, unknown>) => ({
          name: (ri.ingredients as Record<string, unknown>).name as string,
          icon: (ri.ingredients as Record<string, unknown>).icon as string,
          quantity: ri.quantity as string,
          is_required: ri.is_required as boolean,
        })));
      }

      // Fetch dietary tags
      const { data: tagData } = await supabase
        .from('recipe_dietary_tags')
        .select('dietary_tags(name, slug, icon)')
        .eq('recipe_id', id);

      if (tagData) {
        setDietaryTags(
          tagData.map((t: Record<string, unknown>) => {
            const tag = t.dietary_tags as { name: string; slug: string; icon: string };
            return { name: tag.name, slug: tag.slug, icon: tag.icon };
          })
        );
      }

      setLoading(false);
    }
    fetchRecipe();
  }, [id]);

  async function handleAddToShoppingList() {
    if (!activeList) {
      await createList('Lista della spesa');
    }
    const listToUse = activeList || lists[0];
    if (listToUse && id) {
      await addRecipeIngredients(ingredients, id);
      setShowAddToList(false);
    }
  }

  async function handleAddToPlan(mealType: string, date: string) {
    if (!user || !id) return;
    await supabase.from('meal_plans').upsert({
      user_id: user.id,
      recipe_id: id,
      meal_date: date,
      meal_type: mealType,
      servings: 2,
    }, { onConflict: 'user_id,meal_date,meal_type' });
    setShowAddToPlan(false);
  }

  const DIFF_COLORS: Record<string, string> = {
    facile: '#22c55e',
    media: '#f59e0b',
    difficile: '#ef4444',
  };

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="spinner-lg" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="detail-empty">
        <p>Ricetta non trovata</p>
        <Link to="/" className="back-link">Torna alla home</Link>
      </div>
    );
  }

  const steps = recipe.instructions.split('\n').filter(Boolean);

  return (
    <div className="detail-page">
      {/* Header image */}
      {recipe.image_url && (
        <div className="detail-hero" style={{ backgroundImage: `url(${recipe.image_url})` }}>
          <div className="detail-hero-overlay" />
          <div className="detail-hero-nav">
            <button className="back-btn" onClick={goBack}>              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div className="hero-actions">
              {user && (
                <button
                  className={`fav-btn ${fav ? 'active' : ''}`}
                  onClick={() => toggleFavorite(id!)}
                >
                  <svg viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" width="20" height="20">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="detail-content">
        <div className="detail-header">
          <h1>{recipe.name}</h1>
          <p className="detail-desc">{recipe.description}</p>

          <div className="detail-tags">
            {dietaryTags.map((tag) => (
              <span key={tag.slug} className="diet-tag">{tag.icon} {tag.name}</span>
            ))}
          </div>

          <div className="detail-stats">
            <div className="stat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
              </svg>
              <span>{recipe.prep_time_min} min</span>
            </div>
            <div className="stat" style={{ color: DIFF_COLORS[recipe.difficulty] }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8" />
              </svg>
              <span style={{ color: DIFF_COLORS[recipe.difficulty] }}>{recipe.difficulty}</span>
            </div>
            <div className="stat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>{recipe.servings} porzioni</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        {user && (
          <div className="detail-actions">
            <button className="action-btn" onClick={() => setShowAddToPlan(!showAddToPlan)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Aggiungi al piano
            </button>
            <button className="action-btn" onClick={() => setShowAddToList(!showAddToList)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" />
              </svg>
              Lista della spesa
            </button>
          </div>
        )}

        {/* Add to plan modal */}
        {showAddToPlan && (
          <div className="modal-card">
            <h3>Aggiungi al piano settimanale</h3>
            <p className="modal-subtitle">Scegli giorno e tipo di pasto</p>
            <div className="plan-picker">
              {['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'].map((day, i) => {
                const d = new Date();
                d.setDate(d.getDate() - d.getDay() + 1 + i);
                const dateStr = d.toISOString().split('T')[0];
                const dayLabel = day.charAt(0).toUpperCase() + day.slice(1, 3);
                return (
                  <div key={day} className="plan-day">
                    <span className="plan-day-label">{dayLabel}</span>
                    <div className="plan-meals">
                      {(['pranzo', 'cena'] as const).map((mt) => (
                        <button
                          key={mt}
                          className="plan-meal-btn"
                          onClick={() => handleAddToPlan(mt, dateStr)}
                        >
                          {mt}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="modal-close" onClick={() => setShowAddToPlan(false)}>Annulla</button>
          </div>
        )}

        {/* Add to shopping list */}
        {showAddToList && (
          <div className="modal-card">
            <h3>Aggiungi alla lista della spesa</h3>
            <p className="modal-subtitle">Gli ingredienti necessari saranno aggiunti alla tua lista</p>
            <ul className="modal-ingredients">
              {ingredients.filter((i) => i.is_required).map((ing, i) => (
                <li key={i}>{ing.icon} {ing.name} <span className="modal-qty">{ing.quantity}</span></li>
              ))}
            </ul>
            <button className="modal-confirm" onClick={handleAddToShoppingList}>
              Aggiungi alla lista
            </button>
            <button className="modal-close" onClick={() => setShowAddToList(false)}>Annulla</button>
          </div>
        )}

        {/* Ingredients */}
        <section className="detail-section">
          <h2>Ingredienti</h2>
          <ul className="ingredients-list">
            {ingredients.map((ing, i) => (
              <li key={i} className={`ing-row ${!ing.is_required ? 'optional' : ''}`}>
                <span className="ing-row-icon">{ing.icon}</span>
                <span className="ing-row-name">{ing.name}</span>
                <span className="ing-row-qty">{ing.quantity}</span>
                {!ing.is_required && <span className="ing-row-opt">opzionale</span>}
              </li>
            ))}
          </ul>
        </section>

        {/* Instructions */}
        <section className="detail-section">
          <h2>Preparazione</h2>
          <ol className="steps-list">
            {steps.map((step, i) => (
              <li key={i} className="step-item">
                <span className="step-num">{i + 1}</span>
                <span className="step-text">{step.replace(/^\d+\.\s*/, '')}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
