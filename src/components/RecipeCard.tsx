import { useState } from 'react';
import type { RecipeSuggestion } from '../types';

interface Props {
  recipe: RecipeSuggestion;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  facile: '#22c55e',
  media: '#f59e0b',
  difficile: '#ef4444',
};

export function RecipeCard({ recipe }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`recipe-card ${recipe.can_make ? 'can-make' : 'partial'}`}>
      {recipe.image_url && (
        <div
          className="recipe-image"
          style={{ backgroundImage: `url(${recipe.image_url})` }}
        />
      )}

      <div className="recipe-body">
        <div className="recipe-top">
          <h3 className="recipe-name">{recipe.name}</h3>
          <span
            className="match-badge"
            style={{
              background: recipe.can_make
                ? '#22c55e'
                : recipe.match_score >= 70
                ? '#f59e0b'
                : '#6b7280',
            }}
          >
            {recipe.match_score}%
          </span>
        </div>

        <p className="recipe-desc">{recipe.description}</p>

        <div className="recipe-meta">
          <span className="meta-item">
            <span className="meta-icon">&#9202;</span> {recipe.prep_time_min} min
          </span>
          <span
            className="meta-item difficulty"
            style={{ color: DIFFICULTY_COLORS[recipe.difficulty] || '#6b7280' }}
          >
            {recipe.difficulty}
          </span>
          <span className="meta-item">
            <span className="meta-icon">&#127869;</span> {recipe.servings} porzioni
          </span>
        </div>

        {recipe.can_make ? (
          <div className="can-make-label">Hai tutti gli ingredienti!</div>
        ) : (
          <div className="missing-label">
            Mancano {recipe.required_total - recipe.required_matched} ingredient{recipe.required_total - recipe.required_matched !== 1 ? 'i' : 'e'} principali
          </div>
        )}

        <button
          className="expand-btn"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Nascondi dettagli' : 'Vedi ricetta'}
          <span className={`expand-arrow ${expanded ? 'open' : ''}`}>&#9660;</span>
        </button>

        {expanded && (
          <div className="recipe-details">
            <div className="detail-section">
              <h4>Ingredienti</h4>
              <ul className="ingredient-list">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className={`ing-item ${ing.available ? 'available' : 'missing'}`}>
                    <span className="ing-icon">{ing.icon}</span>
                    <span className="ing-name">{ing.name}</span>
                    <span className="ing-qty">{ing.quantity}</span>
                    {!ing.is_required && <span className="ing-optional">opz.</span>}
                    {ing.available ? (
                      <span className="ing-check">&#10003;</span>
                    ) : (
                      <span className="ing-cross">&#10005;</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <h4>Preparazione</h4>
              <ol className="instructions-list">
                {recipe.instructions.split('\n').map((step, i) => (
                  <li key={i} className="instruction-step">{step.replace(/^\d+\.\s*/, '')}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
