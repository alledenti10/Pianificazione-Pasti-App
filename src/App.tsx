import { useState, useCallback } from 'react';
import { useIngredients } from './hooks/useIngredients';
import { useMealSuggestions } from './hooks/useMealSuggestions';
import { IngredientPicker } from './components/IngredientPicker';
import { RecipeCard } from './components/RecipeCard';
import './App.css';

export default function App() {
  const { ingredients, loading } = useIngredients();
  const { suggestions, loading: suggesting, error, suggest } = useMealSuggestions();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleIngredient = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSuggest = useCallback(() => {
    suggest(Array.from(selected));
  }, [selected, suggest]);

  const clearAll = useCallback(() => {
    setSelected(new Set());
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Cosa Mangio?</h1>
          <p className="app-tagline">Dimmi cosa hai in cucina, ti suggerisco cosa cucinare</p>
        </div>
      </header>

      <main className="app-main">
        <section className="picker-section">
          <IngredientPicker
            ingredients={ingredients}
            selected={selected}
            onToggle={toggleIngredient}
            loading={loading}
          />

          <div className="action-bar">
            <button
              className="btn-primary"
              disabled={selected.size === 0 || suggesting}
              onClick={handleSuggest}
            >
              {suggesting ? (
                <>
                  <span className="btn-spinner" /> Cerco ricette...
                </>
              ) : (
                'Cosa posso cucinare?'
              )}
            </button>
            {selected.size > 0 && (
              <button className="btn-secondary" onClick={clearAll}>
                Pulisci selezione
              </button>
            )}
          </div>
        </section>

        <section className="results-section">
          {error && <div className="error-msg">{error}</div>}

          {suggestions.length > 0 && (
            <>
              <h2 className="results-title">
                {suggestions.filter((r) => r.can_make).length > 0
                  ? `Puoi fare ${suggestions.filter((r) => r.can_make).length} ricette`
                  : 'Ricette con ingredienti simili'}
              </h2>
              <div className="results-grid">
                {suggestions.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            </>
          )}

          {!suggesting && selected.size > 0 && suggestions.length === 0 && !error && (
            <div className="empty-state">
              <p>Premi il bottone per scoprire cosa puoi cucinare!</p>
            </div>
          )}

          {selected.size === 0 && suggestions.length === 0 && (
            <div className="empty-state">
              <p>Seleziona gli ingredienti che hai a disposizione per ricevere suggerimenti</p>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Cosa Mangio? &mdash; Suggerimenti ricette con quello che hai</p>
      </footer>
    </div>
  );
}
