import { useEffect, useState, useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";

import API from "../services/api";

import { AuthContext } from "../context/AuthContext";

const EditRecipe = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { userInfo } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    ingredients: "",
    instructions: "",
  });

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const { data } = await API.get(`/recipes/${id}`);

      setFormData({
        title: data.title,
        image: data.image,
        ingredients: data.ingredients,
        instructions: data.instructions,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/recipes/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      alert("Recipe Updated");

      navigate("/my-recipes");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4">Edit Recipe</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          className="form-control mb-3"
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          className="form-control mb-3"
          onChange={handleChange}
        />

        <textarea
          name="ingredients"
          rows="4"
          className="form-control mb-3"
          value={formData.ingredients}
          onChange={handleChange}
        ></textarea>

        <textarea
          name="instructions"
          rows="6"
          className="form-control mb-3"
          value={formData.instructions}
          onChange={handleChange}
        ></textarea>

        <button className="btn btn-dark w-100">
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;