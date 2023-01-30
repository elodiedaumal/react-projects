import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function App() {
  const [markdown, setMarkdaown] = useState('## markdown preview');
  const handleMarkdown = (e) => {
    setMarkdaown(e.target.value);
  };
  return (
    <main>
      <section className='markdown'>
        <textarea
          className='input'
          value={markdown}
          onChange={handleMarkdown}
        ></textarea>
        <article className='result'>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </article>
      </section>
    </main>
  );
}

export default App;
