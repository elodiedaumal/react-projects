import React from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    getCocktail();
    async function getCocktail() {
      try {
        const rep = await fetch(`${url}${id}`);
        const data = await rep.json();
        if (data.drinks) {
          const {
            strDrink: name,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
            strIngredient7,
            strIngredient8,
            strIngredient9,
            strIngredient10,
            strIngredient11,
            strIngredient12,
            strIngredient13,
            strIngredient14,
            strIngredient15,
            strDrinkThumb: image,
            strAlcoholic: alcool,
            strGlass: glass,
            strInstructions: instructions,
            strCategory: category,
          } = data.drinks[0];
          const ingredient = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
            strIngredient6,
            strIngredient7,
            strIngredient8,
            strIngredient9,
            strIngredient10,
            strIngredient11,
            strIngredient12,
            strIngredient13,
            strIngredient14,
            strIngredient15,
          ];

          const newCocktail = {
            name,
            image,
            alcool,
            category,
            glass,
            instructions,
            ingredient,
          };
          setCocktail(newCocktail);
        } else {
          setCocktail(null);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    getCocktail();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2 section-title>No matching cocktail</h2>;
  }
  const { name, image, alcool, category, glass, instructions, ingredient } =
    cocktail;
  return (
    <section className='section cocktail-section'>
      <div className='drink'>
        <h2 className='section-title'>{name}</h2>
        <img src={image} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name:</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category:</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>glass:</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>info:</span>
            {alcool}
          </p>
          <p>
            <span className='drink-data'>ingredients:</span>
            {ingredient.map((item, index) => {
              return item ? <span key={index}>{item},</span> : null;
            })}
          </p>
          <p>
            <span className='drink-data'>instructions:</span>
            {instructions}
          </p>
        </div>
      </div>
      <Link to='/' className='btn btn-primary'>
        back to home
      </Link>
    </section>
  );
};

export default SingleCocktail;
