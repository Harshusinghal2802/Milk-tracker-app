export const saveFavourite =
  (recipe) => {

    const favourites =
      JSON.parse(
        localStorage.getItem(
          "favourites"
        )
      ) || [];

    const exists =
      favourites.find(
        (item) =>
          item._id === recipe._id
      );

    if (!exists) {

      favourites.push(recipe);

      localStorage.setItem(
        "favourites",
        JSON.stringify(
          favourites
        )
      );
    }
  };

export const removeFavourite =
  (id) => {

    const favourites =
      JSON.parse(
        localStorage.getItem(
          "favourites"
        )
      ) || [];

    const updated =
      favourites.filter(
        (item) =>
          item._id !== id
      );

    localStorage.setItem(
      "favourites",
      JSON.stringify(updated)
    );
  };

export const getFavourites =
  () => {

    return (
      JSON.parse(
        localStorage.getItem(
          "favourites"
        )
      ) || []
    );
  };