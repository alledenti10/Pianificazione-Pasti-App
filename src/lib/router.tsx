import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

interface RouterState {
  path: string;
  navigate: (to: string) => void;
  params: Record<string, string>;
  goBack: () => void;
}

const RouterContext = createContext<RouterState>({
  path: '/',
  navigate: () => {},
  params: {},
  goBack: () => {},
});

export function useRouter() {
  return useContext(RouterContext);
}

export function useRouterParams() {
  return useContext(RouterContext).params;
}

interface RouteConfig {
  path: string;
  element: ReactNode;
}

function matchRoute(pattern: string, path: string): Record<string, string> | null {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);

  if (patternParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      params[patternParts[i].slice(1)] = pathParts[i];
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
}

export function Router({ routes, fallback }: { routes: RouteConfig[]; fallback?: ReactNode }) {
  const [path, setPath] = useState(window.location.hash.slice(1) || '/');
  const [_history, setHistory] = useState<string[]>([path]);

  useEffect(() => {
    function onHashChange() {
      const newPath = window.location.hash.slice(1) || '/';
      setPath(newPath);
      setHistory((prev) => [...prev, newPath]);
    }
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) {
      window.location.hash = '#/';
    }
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((to: string) => {
    window.location.hash = '#' + to;
  }, []);

  const goBack = useCallback(() => {
    setHistory((prev) => {
      if (prev.length > 1) {
        const newHist = prev.slice(0, -1);
        window.location.hash = '#' + (newHist[newHist.length - 1] || '/');
        return newHist;
      }
      return prev;
    });
  }, []);

  for (const route of routes) {
    const params = matchRoute(route.path, path);
    if (params) {
      return (
        <RouterContext.Provider value={{ path, navigate, params, goBack }}>
          {route.element}
        </RouterContext.Provider>
      );
    }
  }

  return (
    <RouterContext.Provider value={{ path, navigate, params: {}, goBack }}>
      {fallback || null}
    </RouterContext.Provider>
  );
}

export function Link({ to, children, className, onClick }: { to: string; children: ReactNode; className?: string; onClick?: () => void }) {
  const { navigate } = useRouter();
  const { path } = useRouter();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    onClick?.();
    navigate(to);
  }

  const isActive = to === '/' ? path === '/' : path.startsWith(to);

  return (
    <a href={'#' + to} className={className} onClick={handleClick} data-active={isActive}>
      {children}
    </a>
  );
}
