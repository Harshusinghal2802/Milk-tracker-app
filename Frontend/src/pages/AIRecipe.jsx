import { useState } from "react";

import { GoogleGenerativeAI } from "@google/generative-ai";

const AIRecipe = () => {
  const [ingredients, setIngredients] =
    useState("");

  const [recipe, setRecipe] = useState("");

  const [loading, setLoading] = useState(false);

  const generateRecipe = async () => {
    if (!ingredients) {
      return alert("Enter ingredients");
    }

    try {
      setLoading(true);

      const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_GEMINI_API_KEY
      );

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const prompt = `
Create a recipe using these ingredients:

${ingredients}

Give:
1. Recipe Name
2. Ingredients
3. Instructions
`;

      const result = await model.generateContent(
        prompt
      );

      const response = await result.response;

      const text = response.text();

      setRecipe(text);
    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">
        AI Recipe Generator
      </h1>

      <textarea
        className="form-control mb-3"
        rows="5"
        placeholder="Enter ingredients..."
        value={ingredients}
        onChange={(e) =>
          setIngredients(e.target.value)
        }
      ></textarea>

      <button
        className="btn btn-dark"
        onClick={generateRecipe}
        disabled={loading}
      >
        {loading
          ? "Generating..."
          : "Generate Recipe"}
      </button>

      {recipe && (
        <div className="card mt-5 shadow p-4">
          <pre
            style={{
              whiteSpace: "pre-wrap",
            }}
          >
            {recipe}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AIRecipe;