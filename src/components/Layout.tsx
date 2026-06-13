import { useRouter, Link } from '../lib/router';
import { useAuth } from '../contexts/AuthContext';
import type { ReactNode } from 'react';
import './Layout.css';

const NAV_ITEMS = [
  {
    to: '/',
    label: 'Casa',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    to: '/plan',
    label: 'Piano',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    to: '/shopping',
    label: 'Spesa',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" />
      </svg>
    ),
  },
  {
    to: '/favorites',
    label: 'Preferiti',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    to: '/auth',
    label: 'Profilo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function Layout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { path, navigate } = useRouter();

  return (
    <div className="app-shell">
      <header className="top-bar">
        <span className="top-bar-title" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Cosa Mangio?</span>
        {user && <span className="top-bar-user">{user.email?.split('@')[0]}</span>}
      </header>

      <main className="app-content">
        {children}
      </main>

      <nav className="bottom-nav">
        {NAV_ITEMS.map((item) => {
          const isActive = item.to === '/' ? path === '/' : path.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
