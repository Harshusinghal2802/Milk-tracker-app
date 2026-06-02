import { useContext } from "react";

import RecipeCard from "../components/RecipeCard";

import { AuthContext } from "../context/AuthContext";

const Favorites = () => {
  const { favorites } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">
        My Favorite Recipes
      </h1>

      {favorites.length === 0 ? (
        <h4>No Favorite Recipes</h4>
      ) : (
        <div className="row">
          {favorites.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;