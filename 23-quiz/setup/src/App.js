import React from 'react';
import { useGlobalContext } from './context';

import SetupForm from './SetupForm';
import Loading from './Loading';
import Modal from './Modal';
function App() {
  const {
    homeWaiting,
    loading,
    questions,
    questionIndex,
    correctAnswer,
    error,
    isModalOpen,
  } = useGlobalContext();
  if (homeWaiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }
  if (isModalOpen) {
    return <Modal />;
  }
  const { incorrect_answers, correct_answer, question } = questions[0];
  const answers = [...incorrect_answers, correct_answer];

  return (
    <main>
      {/* <Modal /> */}
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers: {correctAnswer} / {questionIndex}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />

          <div className='btn-container'>
            {answers.map((answers, index) => {
              return (
                <button
                  className='answer-btn'
                  key={index}
                  dangerouslySetInnerHTML={{ __html: answers }}
                  onClick={}
                ></button>
              );
            })}
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;
