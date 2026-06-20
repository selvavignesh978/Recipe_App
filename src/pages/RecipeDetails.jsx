import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { recipeService } from '../services/api';
import { ArrowLeft, Heart, Video, Globe, Tag } from 'lucide-react';

export default function RecipeDetails({ favorites, toggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const data = await recipeService.getRecipeDetails(id);
      setRecipe(data);
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Recipe Asset Not Found</h2>
        <button onClick={() => navigate('/')} className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition">
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Structural generation logic loop to extract dynamic ingredients metadata maps
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({ name: ingredient, measure: measure || 'to taste' });
    }
  }

  const isFav = favorites.some((f) => f.idMeal === recipe.idMeal);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition font-medium bg-transparent border-none cursor-pointer">
        <ArrowLeft className="w-4 h-4" /> Back to Database Catalog
      </button>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
        {/* Left Segment Showcase Visual */}
        <div className="relative rounded-2xl overflow-hidden h-[300px] sm:h-[400px] bg-slate-50 border shadow-inner">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-full object-cover" />
          <button 
            onClick={() => toggleFavorite(recipe)}
            className="absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-md transition transform active:scale-95"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}
          >
            <Heart className={`w-6 h-6 ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Right Metadata Column */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight m-0 text-gray-900">
              {recipe.strMeal}
            </h1>
            
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
                <Tag className="w-3.5 h-3.5" /> {recipe.strCategory}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">
                <Globe className="w-3.5 h-3.5" /> {recipe.strArea}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 m-0">Ingredients Inventory</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[180px] overflow-y-auto pr-1">
                {ingredients.map((ing, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm p-2 bg-slate-50 rounded-lg border border-slate-100/60">
                    <span className="font-medium text-gray-800 capitalize">{ing.name}</span>
                    <span className="text-gray-500 text-xs bg-white px-2 py-0.5 rounded border">{ing.measure}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {recipe.strYoutube && (
            <a 
              href={recipe.strYoutube} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm shadow-xs decoration-none"
            >
              <Video className="w-4 h-4" /> Stream Video Instruction Masterclass
            </a>
          )}
        </div>
      </div>

      {/* Full Length Directions Text Element Block */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
        <h2 className="text-xl font-extrabold text-gray-900 m-0 border-b border-gray-100 pb-3">
          Preparation Instructions & Execution Workflow
        </h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line m-0">
          {recipe.strInstructions}
        </p>
      </div>
    </div>
  );
}