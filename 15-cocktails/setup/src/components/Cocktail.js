import React from 'react';
import { Link } from 'react-router-dom';

const Cocktail = ({ image, id, name, glass, alcool }) => {
  return (
    <Link to={`/cocktail/${id}`}>
      <article className='cocktail'>
        <div className='img-conatiner'>
          <img src={image} alt={name} />
        </div>
        <div className='cocktail-footer'>
          <h3>{name}</h3>
          <h4>{glass}</h4>
          <p>{alcool}</p>
        </div>
      </article>
    </Link>
  );
};

export default Cocktail;
