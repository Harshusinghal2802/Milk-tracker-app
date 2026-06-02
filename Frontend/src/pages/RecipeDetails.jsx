import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import API from "../api/axios";

import Navbar from "../components/Navbar";

import Loader from "../components/Loader";

export default function RecipeDetail() {

  const { id } =
    useParams();

  const [recipe,
    setRecipe] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    fetchRecipe();

  }, [id]);

  const fetchRecipe =
    async () => {

      try {

        setLoading(true);

        const res =
          await API.get(
            `/recipes/${id}`
          );

        setRecipe(
          res.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // ======================
  // LOADING
  // ======================

  if (loading) {
    return <Loader />;
  }

  // ======================
  // NOT FOUND
  // ======================

  if (!recipe) {

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">

        <Navbar />

        <div className="flex flex-col items-center justify-center py-32 px-6 text-center">

          <div className="text-7xl mb-5">
            🍲
          </div>

          <h1 className="text-4xl font-black text-gray-800">

            Recipe Not Found

          </h1>

          <p className="text-gray-500 mt-4 max-w-md">

            The recipe you are looking for does not exist
            or may have been removed.

          </p>

          <Link
            to="/"
            className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all"
          >
            Back To Home
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">

      <Navbar />

      {/* HERO SECTION */}
      <div className="relative">

        <div className="absolute inset-0">

          <img
            src={
              recipe.image ||
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            }
            alt={recipe.title}
            className="w-full h-[300px] sm:h-[450px] lg:h-[550px] object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>

        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-32 lg:py-40">

          <div className="max-w-3xl">

            <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">

              {recipe.category || "Recipe"}

            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mt-6 leading-tight">

              {recipe.title}

            </h1>

            <p className="text-gray-200 mt-6 text-base sm:text-lg leading-relaxed">

              {recipe.description}

            </p>

            {/* STATS */}
            <div className="flex flex-wrap items-center gap-4 mt-8">

              <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">

                <p className="text-white text-sm">
                  Cooking Time
                </p>

                <h3 className="text-xl font-bold text-white">

                  {recipe.cookingTime || "30 Min"}

                </h3>

              </div>

              <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">

                <p className="text-white text-sm">
                  Ingredients
                </p>

                <h3 className="text-xl font-bold text-white">

                  {
                    recipe.ingredients
                      ?.length
                  }

                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT */}
          <div className="lg:col-span-2">

            {/* INGREDIENTS */}
            <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-6 sm:p-8">

              <div className="flex items-center gap-3 mb-8">

                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">

                  🥗

                </div>

                <h2 className="text-3xl font-black text-gray-800">

                  Ingredients

                </h2>

              </div>

              <div className="grid sm:grid-cols-2 gap-4">

                {recipe.ingredients?.map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      key={index}
                      className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-2xl p-4 hover:shadow-md transition-all"
                    >

                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">

                        {index + 1}

                      </div>

                      <p className="font-medium text-gray-700">

                        {item}

                      </p>

                    </div>
                  )
                )}

              </div>

            </div>

            {/* INSTRUCTIONS */}
            <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-6 sm:p-8 mt-10">

              <div className="flex items-center gap-3 mb-8">

                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl">

                  👨‍🍳

                </div>

                <h2 className="text-3xl font-black text-gray-800">

                  Instructions

                </h2>

              </div>

              <div className="space-y-6">

                {Array.isArray(
                  recipe.instructions
                ) ? (

                  recipe.instructions.map(
                    (
                      step,
                      index
                    ) => (

                      <div
                        key={index}
                        className="flex gap-5 bg-gray-50 border border-gray-100 rounded-3xl p-5 hover:shadow-md transition-all"
                      >

                        <div className="min-w-[50px] h-[50px] rounded-2xl bg-orange-500 text-white flex items-center justify-center text-lg font-black shadow-lg">

                          {index + 1}

                        </div>

                        <div>

                          <h3 className="font-bold text-lg text-gray-800">

                            Step {index + 1}

                          </h3>

                          <p className="text-gray-600 mt-2 leading-relaxed">

                            {step}

                          </p>

                        </div>

                      </div>
                    )
                  )

                ) : (

                  <p className="text-gray-700 leading-8 whitespace-pre-line">

                    {
                      recipe.instructions
                    }

                  </p>
                )}

              </div>

            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-8">

            {/* CREATOR */}
            <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-6">

              <h2 className="text-2xl font-black text-gray-800 mb-6">

                Recipe Creator

              </h2>

              <div className="flex items-center gap-4">

                <img
                  src={
                    recipe.creator
                      ?.image ||
                    "https://i.pravatar.cc/150"
                  }
                  alt=""
                  className="w-16 h-16 rounded-2xl object-cover"
                />

                <div>

                  <h3 className="font-bold text-lg text-gray-800">

                    {
                      recipe.creator
                        ?.username ||
                      "Anonymous Chef"
                    }

                  </h3>

                  <p className="text-gray-500 text-sm">

                    Professional Recipe Creator

                  </p>

                </div>

              </div>

            </div>

            {/* QUICK INFO */}
            <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-6">

              <h2 className="text-2xl font-black text-gray-800 mb-6">

                Quick Info

              </h2>

              <div className="space-y-5">

                <div className="flex items-center justify-between">

                  <span className="text-gray-500">

                    Category

                  </span>

                  <span className="font-bold text-gray-800">

                    {
                      recipe.category ||
                      "Food"
                    }

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-gray-500">

                    Cooking Time

                  </span>

                  <span className="font-bold text-gray-800">

                    {
                      recipe.cookingTime ||
                      "30 Min"
                    }

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-gray-500">

                    Ingredients

                  </span>

                  <span className="font-bold text-gray-800">

                    {
                      recipe.ingredients
                        ?.length
                    }

                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}