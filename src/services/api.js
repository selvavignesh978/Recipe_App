import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const recipeService = {
  // Fetch initial random or default recipes for listing
  getRecipes: async (query = '') => {
    try {
      const endpoint = query ? `${BASE_URL}/search.php?s=${query}` : `${BASE_URL}/search.php?s=`;
      const response = await axios.get(endpoint);
      return response.data.meals || [];
    } catch (error) {
      console.error('❌ Error fetching recipes from MealDB API:', error.message);
      return [];
    }
  },

  // Fetch explicit categories matrix list
  getCategories: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories.php`);
      return response.data.categories || [];
    } catch (error) {
      console.error('❌ Error fetching recipe categories:', error.message);
      return [];
    }
  },

  // Lookup recipe by direct matching item ID record row
  getRecipeDetails: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
      return response.data.meals ? response.data.meals[0] : null;
    } catch (error) {
      console.error(`❌ Error pulling specific detail configurations for ID ${id}:`, error.message);
      return null;
    }
  }
};