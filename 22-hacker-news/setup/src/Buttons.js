import React from 'react';
import { useGlobalContext } from './context';

const Buttons = () => {
  const { isLoading, page, nbPages, handlePage } = useGlobalContext();
  if (isLoading) {
    return <div className='loading'></div>;
  }
  return (
    <section className='btn-container'>
      <button
        disabled={isLoading}
        onClick={() => {
          handlePage('decrease');
        }}
      >
        Prev
      </button>
      <p>
        {page + 1} of {nbPages}
      </p>
      <button
        disabled={isLoading}
        onClick={() => {
          handlePage('increase');
        }}
      >
        Next
      </button>
    </section>
  );
};

export default Buttons;
