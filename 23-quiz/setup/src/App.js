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
    handleAnswer,
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
  // const answers = [...incorrect_answers, correct_answer];
  let answers = [...incorrect_answers];

  const getRandomInt = Math.floor(Math.random() * 4);
  if (getRandomInt === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[getRandomInt]);
    answers[getRandomInt] = correct_answer;
  }
  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers: {correctAnswer} / {questionIndex}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />

          <div className='btn-container'>
            {answers.map((answer, index) => {
              return (
                <button
                  className='answer-btn'
                  key={index}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  onClick={() => handleAnswer(correct_answer === answer)}
                ></button>
              );
            })}
          </div>
        </article>
        <button className='next-question' onClick={clickNextQuestion}>
          Skip Question
        </button>
      </section>
    </main>
  );
}

export default App;
