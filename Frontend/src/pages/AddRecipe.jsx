import { useState } from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";

import { useNavigate } from "react-router-dom";

export default function AddRecipe() {

  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      ingredients: "",
      instructions: "",
      image: "",
      cookingTime: "",
      category: "",
    });

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          "/api/recipes",
          {
            ...form,

            ingredients:
              form.ingredients.split(
                ","
              ),
          },

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        navigate("/recipes");

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <div className="min-h-screen bg-orange-50">

      <Navbar />

      <div className="max-w-3xl mx-auto p-4 py-10">

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-2xl"
        >

          <h1 className="text-4xl font-black text-orange-500 text-center mb-8">
            Add Recipe
          </h1>

          <input
            type="text"
            placeholder="Title"
            className="w-full border p-4 rounded-2xl mb-4"
            onChange={(e) =>
              setForm({
                ...form,
                title:
                  e.target.value,
              })
            }
          />

          <textarea
            placeholder="Description"
            className="w-full border p-4 rounded-2xl mb-4"
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
          />

          <textarea
            placeholder="Ingredients separated by comma"
            className="w-full border p-4 rounded-2xl mb-4"
            onChange={(e) =>
              setForm({
                ...form,
                ingredients:
                  e.target.value,
              })
            }
          />

          <textarea
            placeholder="Instructions"
            className="w-full border p-4 rounded-2xl mb-4"
            onChange={(e) =>
              setForm({
                ...form,
                instructions:
                  e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Image URL"
            className="w-full border p-4 rounded-2xl mb-4"
            onChange={(e) =>
              setForm({
                ...form,
                image:
                  e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Cooking Time"
            className="w-full border p-4 rounded-2xl mb-4"
            onChange={(e) =>
              setForm({
                ...form,
                cookingTime:
                  e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full border p-4 rounded-2xl mb-6"
            onChange={(e) =>
              setForm({
                ...form,
                category:
                  e.target.value,
              })
            }
          />

          <button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold">
            Publish Recipe
          </button>

        </form>
      </div>
    </div>
  );
}