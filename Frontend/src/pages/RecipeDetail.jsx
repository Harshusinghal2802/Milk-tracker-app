import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../services/api";

const RecipeDetail = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const { data } = await API.get(`/recipes/${id}`);

      setRecipe(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!recipe) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="container mt-5">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="img-fluid rounded mb-4"
        style={{
          width: "100%",
          maxHeight: "500px",
          objectFit: "cover",
        }}
      />

      <h1>{recipe.title}</h1>

      <p className="text-muted">
        Created By: {recipe.createdBy?.name}
      </p>

      <hr />

      <h3>Ingredients</h3>

      <p>{recipe.ingredients}</p>

      <h3>Instructions</h3>

      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;