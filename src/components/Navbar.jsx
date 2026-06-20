import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Heart } from 'lucide-react';

export default function Navbar({ favoriteCount }) {
  return (
    <nav className="bg-slate-900 text-white shadow-md sticky top-0 z-50 w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
        <Link to="/" className="text-xl font-black flex items-center gap-2 text-indigo-400 decoration-none">
          <ChefHat className="w-6 h-6 text-indigo-400" /> CulinaryHub
        </Link>

        <div className="flex items-center gap-4">
          <Link 
            to="/favorites" 
            className="relative p-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-full transition flex items-center decoration-none"
          >
            <Heart className="w-5 h-5 text-red-400 fill-red-400/20" />
            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-black shadow-sm">
                {favoriteCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}