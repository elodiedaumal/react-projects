import React from 'react';
import Cocktail from './Cocktail';
import Loading from './Loading';
import { useGlobalContext } from '../context';

const CocktailList = () => {
  const { cocktails, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  if (cocktails.length === 0) {
    return <h2 className='section-title'> No Cocktail Matched your search</h2>;
  }
  return (
    <section className='section '>
      <h2 className='section-title'>Cocktails</h2>

      <div className='cocktails-center'>
        {cocktails.map((cocktails) => {
          return <Cocktail key={cocktails.id} {...cocktails} />;
        })}
      </div>
    </section>
  );
};

export default CocktailList;
