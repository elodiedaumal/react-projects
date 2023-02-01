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
    clickNextQuestion,
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
  const { incorrect_answers, correct_answer, question } =
    questions[questionIndex];
  const answers = [...incorrect_answers, correct_answer];

  // const handleAnswer((e)=>{

  //   console.log(answers);
  // })

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
                  // onClick={handleAnswer}
                ></button>
              );
            })}
          </div>
        </article>
        <button className='next-question' onClick={clickNextQuestion}>
          Next Questions
        </button>
      </section>
    </main>
  );
}

export default App;
