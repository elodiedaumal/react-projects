import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fetchCocktails = useCallback(async () => {
    setLoading(true);
    try {
      const rep = await fetch(`${url}${search}`);
      const data = await rep.json();
      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((cocktail) => {
          const {
            idDrink,
            strDrink,

            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = cocktail;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            glass: strGlass,
            alcool: strAlcoholic,
          };
        });
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchCocktails();
  }, [search, fetchCocktails]);
  return (
    <AppContext.Provider
      value={{
        loading,

        cocktails,
        setSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
