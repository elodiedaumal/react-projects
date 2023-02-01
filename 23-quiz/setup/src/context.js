import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';

const table = {
  sports: 21,
  history: 23,
  politics: 24,
  celebrities: 26,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const url = 'https://opentdb.com/api.php?';
const tempurl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [homeWaiting, setHomeWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuizz] = useState({
    amountQuestions: 10,
    category: 'sport',
    difficulty: 'easy',
  });

  const fetchQuestion = async (url) => {
    setLoading(true);
    setHomeWaiting(false);
    const res = await axios(url).catch((err) => console.log(err));
    if (res) {
      if (res.data.results.length > 0) {
        setQuestions(res.data.results);
        setLoading(false);
        setHomeWaiting(false);
        setError(false);
      } else {
        setHomeWaiting(true);
        setError(true);
        setLoading(false);
      }
    } else {
      setHomeWaiting(true);
      setError(true);
      setLoading(false);
    }
  };

  const clickNextQuestion = () => {
    setQuestionIndex((oldIndex) => {
      const questionIndex = oldIndex + 1;
      if (questionIndex > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return questionIndex;
      }
    });
  };

  const handleAnswer = (value) => {
    if (value) {
      setCorrectAnswer((oldanswer) => oldanswer + 1);
    }
    clickNextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setHomeWaiting(true);
    setCorrectAnswer(0);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuizz({ ...quiz, [name]: [value] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const { amountQuestions, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amountQuestions}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestion(url);
  };

  return (
    <AppContext.Provider
      value={{
        homeWaiting,
        loading,
        questions,
        questionIndex,
        correctAnswer,
        error,
        isModalOpen,
        clickNextQuestion,
        handleAnswer,
        closeModal,
        handleSubmit,
        handleChange,
        quiz,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
