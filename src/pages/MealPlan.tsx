import { useAuth } from '../contexts/AuthContext';
import { useMealPlan } from '../hooks/useMealPlan';
import { Link } from 'react-router-dom';
import './MealPlan.css';

const DAYS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
const MEALS: Array<{ key: 'colazione' | 'pranzo' | 'cena'; label: string }> = [
  { key: 'pranzo', label: 'Pranzo' },
  { key: 'cena', label: 'Cena' },
];

function getWeekDates() {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  monday.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export default function MealPlanPage() {
  const { user } = useAuth();
  const { loading, removePlan, getPlanForSlot } = useMealPlan();
  const weekDates = getWeekDates();

  if (!user) {
    return (
      <div className="plan-page">
        <div className="plan-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <h2>Accedi per usare il piano pasti</h2>
          <Link to="/auth" className="plan-cta">Registrati o accedi</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="plan-page"><div className="loading-state"><div className="spinner-lg" /></div></div>;
  }

  return (
    <div className="plan-page">
      <div className="plan-header">
        <h1>Piano settimanale</h1>
        <span className="plan-week">
          {weekDates[0].toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}
          {' - '}
          {weekDates[6].toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}
        </span>
      </div>

      <div className="plan-grid">
        {/* Header row */}
        <div className="plan-corner" />
        {weekDates.map((d, i) => (
          <div key={i} className={`plan-day-head ${isToday(d) ? 'today' : ''}`}>
            <span className="day-name">{DAYS[i]}</span>
            <span className="day-num">{d.getDate()}</span>
          </div>
        ))}

        {/* Meal rows */}
        {MEALS.map(({ key, label }) => (
          <>
            <div key={`${key}-label`} className="plan-meal-label">{label}</div>
            {weekDates.map((d, i) => {
              const dateStr = d.toISOString().split('T')[0];
              const plan = getPlanForSlot(dateStr, key);

              return (
                <div key={`${key}-${i}`} className="plan-cell">
                  {plan ? (
                    <div className="plan-recipe">
                      <Link to={`/recipe/${plan.recipe_id}`} className="plan-recipe-name">
                        {plan.recipes?.name}
                      </Link>
                      <button className="plan-remove" onClick={() => removePlan(plan.id)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <Link to="/" className="plan-empty-cell">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                        <path d="M12 5v14m-7-7h14" />
                      </svg>
                    </Link>
                  )}
                </div>
              );
            })}
          </>
        ))}
      </div>

      <div className="plan-hint">
        <p>Clicca + per cercare ricette da aggiungere al piano, oppure aggiungile dalla pagina della ricetta.</p>
      </div>
    </div>
  );
}

function isToday(d: Date) {
  const today = new Date();
  return d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
}
