import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FavouriteContext =
  createContext();

export const FavouriteProvider = ({
  children,
}) => {

  const [favourites,
    setFavourites] = useState([]);

  useEffect(() => {

    const data =
      JSON.parse(
        localStorage.getItem(
          "favourites"
        )
      ) || [];

    setFavourites(data);

  }, []);

  const addFavourite = (
    recipe
  ) => {

    const updated = [
      ...favourites,
      recipe,
    ];

    setFavourites(updated);

    localStorage.setItem(
      "favourites",
      JSON.stringify(updated)
    );
  };

  const removeFavourite = (
    id
  ) => {

    const updated =
      favourites.filter(
        (item) =>
          item._id !== id
      );

    setFavourites(updated);

    localStorage.setItem(
      "favourites",
      JSON.stringify(updated)
    );
  };

  const isFavourite = (
    id
  ) => {

    return favourites.some(
      (item) =>
        item._id === id
    );
  };

  return (
    <FavouriteContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        isFavourite,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite =
  () => useContext(
    FavouriteContext
  );