import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../contexts/AuthContext';
import './Favorites.css';

export default function Favorites() {
  const { user } = useAuth();
  const { favorites, loading, toggleFavorite } = useFavorites();

  if (!user) {
    return (
      <div className="fav-page">
        <div className="fav-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <h2>Accedi per vedere i preferiti</h2>
          <p>Crea un account per salvare le tue ricette preferite</p>
          <Link to="/auth" className="fav-cta">Registrati o accedi</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="fav-page">
        <div className="loading-state"><div className="spinner-lg" /></div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="fav-page">
        <div className="fav-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <h2>Nessun preferito</h2>
          <p>Aggiungi ricette ai preferiti per trovarle velocemente</p>
          <Link to="/" className="fav-cta">Esplora ricette</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fav-page">
      <div className="fav-header">
        <h1>I miei preferiti</h1>
        <span className="fav-count">{favorites.length} ricette</span>
      </div>
      <div className="fav-grid">
        {favorites.map((fav) => (
          <div key={fav.id} className="fav-card">
            <Link to={`/recipe/${fav.recipe_id}`} className="fav-card-link">
              {fav.recipes.image_url && (
                <div className="fav-card-img" style={{ backgroundImage: `url(${fav.recipes.image_url})` }} />
              )}
              <div className="fav-card-body">
                <h3>{fav.recipes.name}</h3>
                <span className="fav-card-meta">{fav.recipes.prep_time_min} min &middot; {fav.recipes.difficulty}</span>
              </div>
            </Link>
            <button className="fav-remove" onClick={() => toggleFavorite(fav.recipe_id)}>
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" width="18" height="18">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
