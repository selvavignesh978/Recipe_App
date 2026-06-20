import React from 'react';
import RecipeCard from '../components/RecipeCard';
import { Heart } from 'lucide-react';

export default function Favorites({ favorites, toggleFavorite }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 m-0 flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500 fill-red-500" /> Bookmarked Cooking Sessions
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-0">
          Your favorite elements stored seamlessly across device sessions.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 border border-dashed rounded-2xl w-full">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500 text-base m-0">No recipes pinned to favorites stack yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              isFavorite={true}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}