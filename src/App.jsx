import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';

function App() {
  const [favorites, setFavorites] = useState([]);

  // Load persistent favorites state hooks
  useEffect(() => {
    const savedFavorites = localStorage.getItem('recipe_app_favorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  const toggleFavorite = (recipe) => {
    let updated;
    const isFav = favorites.some((item) => item.idMeal === recipe.idMeal);
    if (isFav) {
      updated = favorites.filter((item) => item.idMeal !== recipe.idMeal);
    } else {
      updated = [...favorites, recipe];
    }
    setFavorites(updated);
    localStorage.setItem('recipe_app_favorites', JSON.stringify(updated));
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans flex flex-col w-full m-0 p-0 overflow-x-hidden">
        <Navbar favoriteCount={favorites.length} />
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 max-w-[100vw]">
          <Routes>
            <Route 
              path="/" 
              element={<Home favorites={favorites} toggleFavorite={toggleFavorite} />} 
            />
            <Route 
              path="/recipe/:id" 
              element={<RecipeDetails favorites={favorites} toggleFavorite={toggleFavorite} />} 
            />
            <Route 
              path="/favorites" 
              element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;