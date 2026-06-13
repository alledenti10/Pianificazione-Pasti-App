import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import ShoppingListPage from './pages/ShoppingList';
import MealPlanPage from './pages/MealPlan';
import AuthPage from './pages/Auth';
import { Router } from './lib/router';
import './App.css';

const routes = [
  { path: '/', element: <Layout><Home /></Layout> },
  { path: '/recipe/:id', element: <Layout><RecipeDetail /></Layout> },
  { path: '/favorites', element: <Layout><Favorites /></Layout> },
  { path: '/shopping', element: <Layout><ShoppingListPage /></Layout> },
  { path: '/plan', element: <Layout><MealPlanPage /></Layout> },
  { path: '/auth', element: <Layout><AuthPage /></Layout> },
];

export default function App() {
  return (
    <AuthProvider>
      <Router routes={routes} fallback={<Layout><Home /></Layout>} />
    </AuthProvider>
  );
}
