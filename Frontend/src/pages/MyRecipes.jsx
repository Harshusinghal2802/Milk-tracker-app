import { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";

import API from "../services/api";

import { AuthContext } from "../context/AuthContext";

const MyRecipes = () => {
  const { userInfo } = useContext(AuthContext);

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const fetchMyRecipes = async () => {
    try {
      const { data } = await API.get(
        "/recipes/my-recipes",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setRecipes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this recipe?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      alert("Recipe Deleted");

      fetchMyRecipes();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Recipes</h1>

      <div className="row">
        {recipes.map((recipe) => (
          <div
            className="col-md-4 mb-4"
            key={recipe._id}
          >
            <div className="card h-100 shadow">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="card-img-top"
                style={{
                  height: "250px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">
                <h5>{recipe.title}</h5>

                <div className="d-flex gap-2 mt-3">
                  <Link
                    to={`/edit-recipe/${recipe._id}`}
                    className="btn btn-warning"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      deleteHandler(recipe._id)
                    }
                  >
                    Delete
                  </button>

                  <Link
                    to={`/recipe/${recipe._id}`}
                    className="btn btn-dark"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;