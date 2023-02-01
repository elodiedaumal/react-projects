import React from 'react';
import { useGlobalContext } from './context';

const SetupForm = () => {
  const { handleSubmit, handleChange, quiz, error } = useGlobalContext();
  return (
    <main className='container'>
      <section className='quiz quiz-small'>
        <form action='' className='setup-form'>
          <h2>Setup Quiz</h2>
          <div className='form-control'>
            <label htmlFor='amount'>number of Questions</label>
            <input
              type='number'
              name='amountQuestions'
              id='amountQuestions'
              value={quiz.amountQuestions}
              onChange={handleChange}
              className='form-input'
              min={1}
              max={50}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='category'>Select a category</label>
            <select
              name='category'
              id='category'
              value={quiz.category}
              onChange={handleChange}
              className='form-input'
            >
              <option value='sports'>Sports</option>
              <option value='history'>History</option>
              <option value='celebrities'>Celebrities</option>
            </select>
          </div>
          <div className='form-control'>
            <label htmlFor='difficulty'>Select a difficulty</label>
            <select
              name='difficulty'
              id='difficulty'
              value={quiz.difficulty}
              onChange={handleChange}
              className='form-input'
            >
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </div>
          {error && (
            <p className='error'>
              can't generate questions, please change the options
            </p>
          )}
          <button className='submit-btn' type='submit' onClick={handleSubmit}>
            Play
          </button>
        </form>
      </section>
    </main>
  );
};
export default SetupForm;
