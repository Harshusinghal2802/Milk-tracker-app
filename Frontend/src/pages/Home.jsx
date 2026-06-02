import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import API from "../services/api";

import RecipeCard from "../components/RecipeCard";

const Home = () => {
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
    <>
      {/* HERO SECTION */}
      <div
        className="text-center text-white d-flex flex-column justify-content-center align-items-center"
        style={{
          height: "90vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            padding: "40px",
            borderRadius: "10px",
          }}
        >
          <h1 className="display-3 fw-bold">
            Welcome To Recipe Janta
          </h1>

          <p className="lead mt-3">
            Discover, Create & Share Amazing Recipes
          </p>

          <div className="mt-4 d-flex gap-3 justify-content-center">
            <Link
              to="/recipes"
              className="btn btn-warning btn-lg"
            >
              Explore Recipes
            </Link>

            <Link
              to="/create"
              className="btn btn-light btn-lg"
            >
              Create Recipe
            </Link>
          </div>
        </div>
      </div>

      {/* TRENDING RECIPES */}
      <div className="container mt-5">
        <h2 className="mb-4 text-center">
          Trending Recipes
        </h2>

        <div className="row">
          {recipes.slice(0, 3).map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
            />
          ))}
        </div>
      </div>

      {/* ALL RECIPES PREVIEW */}
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Latest Recipes</h2>

          <Link
            to="/recipes"
            className="btn btn-dark"
          >
            View All
          </Link>
        </div>

        <div className="row">
          {recipes.slice(0, 6).map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;