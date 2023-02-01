import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const url = '';
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

  useEffect(() => {
    fetchQuestion(tempurl);
  }, []);
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
