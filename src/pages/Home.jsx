import React, { useState, useEffect } from 'react';
import { recipeService } from '../services/api';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import RecipeCard from '../components/RecipeCard';
import { Utensils } from 'lucide-react';

export default function Home({ favorites, toggleFavorite }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      const mealsData = await recipeService.getRecipes();
      const categoriesData = await recipeService.getCategories();
      setRecipes(mealsData);
      setFilteredRecipes(mealsData);
      setCategories(categoriesData);
      setLoading(false);
    };
    initializeData();
  }, []);

  useEffect(() => {
    let results = recipes;

    if (activeCategory !== 'All') {
      results = results.filter((r) => r.strCategory === activeCategory);
    }
    if (searchTerm) {
      results = results.filter((r) =>
        r.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredRecipes(results);
  }, [searchTerm, activeCategory, recipes]);

  const handleSearchTrigger = async (term) => {
    setSearchTerm(term);
    if (term.trim() !== '') {
      setLoading(true);
      const dynamicResults = await recipeService.getRecipes(term);
      setRecipes(dynamicResults);
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-8 space-y-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-gray-900 m-0">
          Discover Gastronomy <span className="text-indigo-600">Recipes</span>
        </h1>
        <p className="text-base text-gray-500 max-w-xl mx-auto">
          Browse, search, and refine thousands of dishes instantly. Click any card to explore preparation breakdowns.
        </p>
      </div>

      <div className="bg-white p-6 border border-gray-100 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchTrigger} />
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory} 
          />
        </div>
      </div>

      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 border border-dashed rounded-2xl w-full">
          <Utensils className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-lg m-0">No matches found for your criteria selection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              isFavorite={favorites.some((f) => f.idMeal === recipe.idMeal)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}