import React from 'react';

export default function CategoryFilter({ categories, activeCategory, setActiveCategory }) {
  // Extract top explicit names mapping list array
  const categoryNames = ['All', ...categories.slice(0, 7).map((c) => c.strCategory)];

  return (
    <div className="flex flex-wrap gap-2 justify-start md:justify-end w-full md:w-auto">
      {categoryNames.map((name) => (
        <button
          key={name}
          onClick={() => setActiveCategory(name)}
          className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition cursor-pointer border ${
            activeCategory === name
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
}