export const getLocalFavorites =
  () => {

    return JSON.parse(
      localStorage.getItem(
        "favorites"
      )
    ) || [];
  };


export const addLocalFavorite =
  (recipe) => {

    const favorites =
      getLocalFavorites();

    favorites.push(recipe);

    localStorage.setItem(
      "favorites",
      JSON.stringify(
        favorites
      )
    );
  };


export const removeLocalFavorite =
  (id) => {

    const favorites =
      getLocalFavorites().filter(
        (item) =>
          item._id !== id
      );

    localStorage.setItem(
      "favorites",
      JSON.stringify(
        favorites
      )
    );
  };