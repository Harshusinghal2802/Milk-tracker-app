import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const CreateRecipe = () => {
  const navigate = useNavigate();

  const { userInfo } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    ingredients: "",
    instructions: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // IMAGE UPLOAD (Cloudinary)
  const uploadImageHandler = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      setLoading(true);

      const { data } = await API.post(
        "/upload",
        uploadData
      );

      setFormData({
        ...formData,
        image: data.imageUrl,
      });

      alert("Image Uploaded Successfully");
    } catch (error) {
      console.log(error);
      alert("Image Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  // CREATE RECIPE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/recipes", formData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      alert("Recipe Created Successfully");

      navigate("/recipes");
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          .create-page {
            min-height: 100vh;
            background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)),
            url("https://images.unsplash.com/photo-1490645935967-10de6ba17061");
            background-size: cover;
            background-position: center;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px 15px;
          }

          .glass-form {
            width: 100%;
            max-width: 750px;
            background: rgba(255,255,255,0.08);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 24px;
            padding: 35px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          }

          .glass-title {
            color: white;
            text-align: center;
            margin-bottom: 30px;
            font-weight: bold;
          }

          .glass-input {
            background: rgba(255,255,255,0.12) !important;
            border: 1px solid rgba(255,255,255,0.15) !important;
            color: white !important;
            padding: 14px !important;
            border-radius: 12px !important;
          }

          .glass-input::placeholder {
            color: rgba(255,255,255,0.7);
          }

          .glass-input:focus {
            box-shadow: none !important;
            border-color: #ffc107 !important;
          }

          .upload-box {
            border: 2px dashed rgba(255,255,255,0.3);
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            color: white;
            margin-bottom: 20px;
          }

          .preview-image {
            width: 100%;
            height: 280px;
            object-fit: cover;
            border-radius: 16px;
            margin-bottom: 20px;
          }

          .create-btn {
            width: 100%;
            padding: 14px;
            border: none;
            border-radius: 14px;
            background: #ffc107;
            font-weight: bold;
            transition: 0.3s;
          }

          .create-btn:hover {
            transform: translateY(-2px);
          }

          @media (max-width: 768px) {
            .glass-form {
              padding: 22px;
            }
          }
        `}
      </style>

      <div className="create-page">
        <div className="glass-form">
          <h1 className="glass-title">
            Create New Recipe 🍲
          </h1>

          <form onSubmit={handleSubmit}>
            {/* TITLE */}
            <input
              type="text"
              name="title"
              placeholder="Recipe Title"
              className="form-control glass-input mb-3"
              onChange={handleChange}
            />

            {/* IMAGE URL INPUT (IMPORTANT ADDED) */}
            <input
              type="text"
              name="image"
              placeholder="Paste Image URL (optional)"
              className="form-control glass-input mb-3"
              value={formData.image}
              onChange={handleChange}
            />

            {/* IMAGE UPLOAD */}
            <div className="upload-box">
              <p className="mb-3">
                OR Upload Image
              </p>

              <input
                type="file"
                className="form-control"
                onChange={uploadImageHandler}
              />
            </div>

            {/* IMAGE PREVIEW */}
            {formData.image && (
              <img
                src={formData.image}
                alt="preview"
                className="preview-image"
              />
            )}

            {/* INGREDIENTS */}
            <textarea
              name="ingredients"
              placeholder="Ingredients..."
              rows="4"
              className="form-control glass-input mb-3"
              onChange={handleChange}
            ></textarea>

            {/* INSTRUCTIONS */}
            <textarea
              name="instructions"
              placeholder="Instructions..."
              rows="6"
              className="form-control glass-input mb-4"
              onChange={handleChange}
            ></textarea>

            {/* BUTTON */}
            <button
              className="create-btn"
              disabled={loading}
            >
              {loading
                ? "Please Wait..."
                : "Create Recipe"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRecipe;