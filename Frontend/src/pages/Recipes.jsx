import { useEffect, useState } from "react";

import API from "../services/api";
import RecipeCard from "../components/RecipeCard";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const { data } = await API.get("/recipes");

      setRecipes(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">All Recipes</h1>

      <div className="row">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;