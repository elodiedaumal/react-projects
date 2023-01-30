import React, { useState, useEffect } from 'react';
import data from './data';
import Article from './Article';

const getStoredTheme = () => {
  let theme = 'light-theme';
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  }
  return theme;
};

function App() {
  const [theme, setTheme] = useState(getStoredTheme());
  const [btntext, setBtntext] = useState('Dark Theme');
  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
      setBtntext('Light Theme');
    } else {
      setTheme('light-theme');
      setBtntext('Dark Theme');
    }
  };
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  return (
    <main>
      <nav>
        <div className='nav-center'>
          <h1>Overreacted</h1>
          <button className='btn' onClick={toggleTheme}>
            {btntext}
          </button>
        </div>
      </nav>
      <section className='articles'>
        {data.map((item) => {
          return <Article key={item.id} {...item} />;
        })}
      </section>
    </main>
  );
}

export default App;
