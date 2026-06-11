import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

type Mode = 'login' | 'register';

export default function AuthPage() {
  const { signIn, signUp, user } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return (
      <div className="auth-page">
        <div className="auth-card logged-in">
          <h2>Ciao!</h2>
          <p className="auth-email">{user.email}</p>
          <LogoutButton />
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSubmitting(true);

    if (mode === 'register') {
      const { error: err } = await signUp(email, password, displayName || undefined);
      if (err) setError(err);
      else setSuccess(true);
    } else {
      const { error: err } = await signIn(email, password);
      if (err) setError(err);
    }

    setSubmitting(false);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setError(null); setSuccess(false); }}
          >
            Accedi
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => { setMode('register'); setError(null); setSuccess(false); }}
          >
            Registrati
          </button>
        </div>

        {success ? (
          <div className="auth-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
              <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
            </svg>
            <h3>Controlla la tua email</h3>
            <p>Ti abbiamo inviato un link di conferma. Dopo aver confermato, potrai accedere.</p>
            <button className="auth-switch" onClick={() => { setMode('login'); setSuccess(false); }}>
              Vai al login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            {mode === 'register' && (
              <div className="field">
                <label>Nome visualizzato</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Il tuo nome"
                />
              </div>
            )}
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="la.tua@email.it"
                required
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Almeno 6 caratteri"
                required
                minLength={6}
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="auth-submit" disabled={submitting}>
              {submitting ? (
                <><span className="btn-spinner" /> {mode === 'login' ? 'Accesso...' : 'Registrazione...'}</>
              ) : (
                mode === 'login' ? 'Accedi' : 'Registrati'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function LogoutButton() {
  const { signOut } = useAuth();
  return (
    <button className="auth-submit logout" onClick={signOut}>
      Esci dall'account
    </button>
  );
}
