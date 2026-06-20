import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

export default function RecipeCard({ recipe, isFavorite, toggleFavorite }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition duration-200 overflow-hidden flex flex-col justify-between h-full group relative">
      <div>
        <Link to={`/recipe/${recipe.idMeal}`} className="block relative w-full h-48 bg-gray-100 overflow-hidden">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </Link>

        <button
          onClick={() => toggleFavorite(recipe)}
          className="absolute top-3 right-3 p-2 rounded-full shadow-sm transition hover:scale-110 active:scale-90 cursor-pointer"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>

        <div className="p-4 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-md border border-indigo-100/50">
            {recipe.strCategory || "General Dish"}
          </span>
          <Link to={`/recipe/${recipe.idMeal}`} className="block text-gray-900 hover:text-indigo-600 transition no-underline">
            <h3 className="font-extrabold text-base line-clamp-1 m-0" title={recipe.strMeal}>
              {recipe.strMeal}
            </h3>
          </Link>
          <p className="text-xs text-gray-400 m-0 font-medium">Origin Matrix: {recipe.strArea || "Global style"}</p>
        </div>
      </div>

      <div className="p-4 pt-0">
        <Link 
          to={`/recipe/${recipe.idMeal}`}
          className="w-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-3 rounded-lg hover:bg-indigo-600 transition flex items-center justify-center gap-1.5 shadow-xs no-underline"
        >
          View Recipe <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}