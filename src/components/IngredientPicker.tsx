import { useState, useMemo } from 'react';
import type { Ingredient } from '../types';

interface Props {
  ingredients: Ingredient[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  loading: boolean;
}

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

export function IngredientPicker({ ingredients, selected, onToggle, loading }: Props) {
  const [search, setSearch] = useState('');

  const grouped = useMemo(() => {
    const filtered = ingredients.filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase())
    );
    const groups: Record<string, Ingredient[]> = {};
    for (const ing of filtered) {
      if (!groups[ing.category]) groups[ing.category] = [];
      groups[ing.category].push(ing);
    }
    return groups;
  }, [ingredients, search]);

  if (loading) {
    return (
      <div className="picker-loading">
        <div className="spinner" />
        <p>Caricamento ingredienti...</p>
      </div>
    );
  }

  return (
    <div className="picker">
      <div className="picker-header">
        <h2>Cosa hai in cucina?</h2>
        <p className="picker-subtitle">Seleziona gli ingredienti che hai a disposizione</p>
        <div className="search-box">
          <span className="search-icon">&#128269;</span>
          <input
            type="text"
            placeholder="Cerca ingrediente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')}>
              &#10005;
            </button>
          )}
        </div>
        {selected.size > 0 && (
          <div className="selected-count">
            {selected.size} ingrediente{selected.size !== 1 ? 'i' : ''} selezionato{selected.size !== 1 ? 'i' : ''}
          </div>
        )}
      </div>

      <div className="categories">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="category">
            <h3 className="category-title">{CATEGORY_LABELS[category] || category}</h3>
            <div className="ingredient-grid">
              {items.map((ing) => {
                const isSelected = selected.has(ing.id);
                return (
                  <button
                    key={ing.id}
                    className={`ingredient-chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => onToggle(ing.id)}
                  >
                    <span className="chip-icon">{ing.icon}</span>
                    <span className="chip-name">{ing.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
