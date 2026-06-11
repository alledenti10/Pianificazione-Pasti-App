import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import ShoppingListPage from './pages/ShoppingList';
import MealPlanPage from './pages/MealPlan';
import AuthPage from './pages/Auth';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="recipe/:id" element={<RecipeDetail />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="shopping" element={<ShoppingListPage />} />
            <Route path="plan" element={<MealPlanPage />} />
            <Route path="auth" element={<AuthPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
