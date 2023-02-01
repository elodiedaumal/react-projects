import React from 'react';
import { useGlobalContext } from './context';

const SearchForm = () => {
  const { handleSearch, query } = useGlobalContext();
  return (
    <section>
      <form
        className='search-form'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h2>Search Hacker news</h2>
        <input
          className='form-input'
          value={query}
          type='text'
          placeholder='search news'
          onChange={(e) => handleSearch(e.target.value)}
        />
      </form>
    </section>
  );
};

export default SearchForm;
