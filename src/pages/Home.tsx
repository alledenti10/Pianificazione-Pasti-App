import { useState, useCallback } from 'react';
import { Link } from '../lib/router';
import { useIngredients } from '../hooks/useIngredients';
import { useMealSuggestions } from '../hooks/useMealSuggestions';
import { useDietaryTags } from '../hooks/useDietaryTags';
import type { RecipeSuggestion } from '../types';
import './Home.css';

const CATEGORY_LABELS: Record<string, string> = {
  carboidrati: 'Carboidrati',
  verdure: 'Verdure',
  erbe: 'Erbe Aromatiche',
  condimenti: 'Condimenti',
  latticini: 'Latticini',
  proteine: 'Proteine',
  legumi: 'Legumi',
  frutta: 'Frutta',
  bevande: 'Bevande',
};

export default function Home() {
  const { ingredients, loading: ingLoading } = useIngredients();
  const { tags } = useDietaryTags();
  const { suggestions, loading: suggesting, error, suggest } = useMealSuggestions();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const toggle = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSuggest = useCallback(async () => {
    await suggest(Array.from(selected));
    setShowResults(true);
  }, [selected, suggest]);

  const filtered = ingredients.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const grouped: Record<string, typeof ingredients> = {};
  for (const ing of filtered) {
    if (!grouped[ing.category]) grouped[ing.category] = [];
    grouped[ing.category].push(ing);
  }

  const canMake = suggestions.filter((r) => r.can_make);
  const partial = suggestions.filter((r) => !r.can_make);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Cosa Mangio?</h1>
          <p>Seleziona gli ingredienti che hai in cucina e ti suggeriamo cosa cucinare</p>
        </div>
      </section>

      {/* Dietary tags filter */}
      {tags.length > 0 && (
        <section className="tag-filter">
          <div className="tag-scroll">
            <button
              className={`tag-pill ${!activeTag ? 'active' : ''}`}
              onClick={() => setActiveTag(null)}
            >
              Tutti
            </button>
            {tags.map((tag) => (
              <button
                key={tag.id}
                className={`tag-pill ${activeTag === tag.slug ? 'active' : ''}`}
                onClick={() => setActiveTag(activeTag === tag.slug ? null : tag.slug)}
              >
                {tag.icon} {tag.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Search */}
      <section className="search-section">
        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Cerca ingrediente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {selected.size > 0 && (
          <div className="selection-info">
            <span className="selection-count">{selected.size} selezionati</span>
            <button className="clear-btn" onClick={() => setSelected(new Set())}>
              Pulisci tutto
            </button>
          </div>
        )}
      </section>

      {/* Ingredients */}
      <section className="ingredients-section">
        {ingLoading ? (
          <div className="loading-state">
            <div className="spinner-lg" />
          </div>
        ) : (
          Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="category-group">
              <h3 className="category-label">{CATEGORY_LABELS[cat] || cat}</h3>
              <div className="chip-grid">
                {items.map((ing) => (
                  <button
                    key={ing.id}
                    className={`ing-chip ${selected.has(ing.id) ? 'selected' : ''}`}
                    onClick={() => toggle(ing.id)}
                  >
                    <span className="chip-icon">{ing.icon}</span>
                    <span>{ing.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* CTA */}
      <section className="cta-section">
        <button
          className="cta-btn"
          disabled={selected.size === 0 || suggesting}
          onClick={handleSuggest}
        >
          {suggesting ? (
            <><span className="btn-spinner" /> Cerco ricette...</>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z" />
                <path d="M12 8v4l3 3" />
              </svg>
              Cosa posso cucinare?
            </>
          )}
        </button>
      </section>

      {/* Results */}
      {showResults && (
        <section className="results-section">
          {error && <div className="error-banner">{error}</div>}

          {suggestions.length === 0 && !suggesting && !error && (
            <div className="empty-results">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
                <path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Nessuna ricetta trovata con questi ingredienti.</p>
              <p className="empty-hint">Prova ad aggiungere piu ingredienti alla selezione.</p>
            </div>
          )}

          {canMake.length > 0 && (
            <>
              <h2 className="section-title">
                <span className="title-icon success">&#10003;</span>
                Puoi fare subito
                <span className="title-badge">{canMake.length}</span>
              </h2>
              <div className="recipe-grid">
                {canMake.map((r) => (
                  <RecipePreview key={r.id} recipe={r} />
                ))}
              </div>
            </>
          )}

          {partial.length > 0 && (
            <>
              <h2 className="section-title">
                <span className="title-icon warning">&#9888;</span>
                Ci manca poco
                <span className="title-badge">{partial.length}</span>
              </h2>
              <div className="recipe-grid">
                {partial.map((r) => (
                  <RecipePreview key={r.id} recipe={r} />
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}

function RecipePreview({ recipe }: { recipe: RecipeSuggestion }) {
  const DIFF_COLORS: Record<string, string> = {
    facile: '#22c55e',
    media: '#f59e0b',
    difficile: '#ef4444',
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
      <div className={`recipe-card ${recipe.can_make ? 'can-make' : 'partial'}`}>
        {recipe.image_url && (
          <div className="card-image" style={{ backgroundImage: `url(${recipe.image_url})` }}>
            <span
              className="score-badge"
              style={{ background: recipe.can_make ? '#22c55e' : recipe.match_score >= 60 ? '#f59e0b' : '#6b7280' }}
            >
              {recipe.match_score}%
            </span>
          </div>
        )}
        <div className="card-body">
          <h3>{recipe.name}</h3>
          <p className="card-desc">{recipe.description}</p>
          <div className="card-meta">
            <span>{recipe.prep_time_min} min</span>
            <span style={{ color: DIFF_COLORS[recipe.difficulty] }}>{recipe.difficulty}</span>
            <span>{recipe.servings} porz.</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
