import {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

import RecipeCard from "../components/RecipeCard";

export default function Profile() {

  const [profile,
    setProfile] =
    useState(null);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile =
    async () => {

      const res =
        await API.get(
          "/profile"
        );

      setProfile(
        res.data
      );
    };

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6 items-center">

        <img
          src={
            profile.user.image
          }
          alt=""
          className="w-32 h-32 rounded-full object-cover"
        />

        <div>

          <h1 className="text-3xl font-bold">
            {
              profile.user
                .username
            }
          </h1>

          <p className="text-gray-600 mt-2">
            {
              profile.user.bio
            }
          </p>

        </div>

      </div>

      <div className="mt-10">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            My Recipes
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {profile.recipes.map(
            (recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
              />
            )
          )}

        </div>

      </div>

    </div>
  );
}