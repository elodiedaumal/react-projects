import React from 'react';
import { useGlobalContext } from './context';

const Modal = () => {
  const { isModalOpen, closeModal, correctAnswer, questions } =
    useGlobalContext();
  console.log(correctAnswer);
  console.log(questions.length);
  return (
    <div
      className={`${
        isModalOpen ? 'modal-container isOpen' : 'modal-container'
      }`}
    >
      <div className='modal-content'>
        <h2>Congratulation!</h2>
        <p>
          You answerd {Math.floor((correctAnswer / questions.length) * 100)}% of
          questions correctly
        </p>
        <button className='close-btn' onClick={closeModal}>
          Play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
