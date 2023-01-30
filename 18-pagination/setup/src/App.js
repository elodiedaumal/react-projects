import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import Follower from './Follower';

function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(1);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, page]);

  const handleClick = (index) => {
    setPage(index);
  };

  const handleClickPrev = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = data.length - 1;
      }
      return prevPage;
    });
  };
  const handleClickNext = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage === data.length) {
        nextPage = 0;
      }
      return nextPage;
    });
  };

  return (
    <main>
      <div className='section-title'>
        <h1>{loading ? 'loading...' : 'pagination'} </h1>
        <div className='underline'></div>
      </div>
      <section className='followers'>
        <div className='container'>
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />;
          })}
        </div>

        {!loading && (
          <div className='btn-container'>
            <button className='prev-btn' onClick={handleClickPrev}>
              prev
            </button>
            {data.map((follower, index) => {
              return (
                <button
                  key={index}
                  className={`${
                    index === page ? 'active-btn page-btn' : 'page-btn'
                  }
                `}
                  onClick={() => handleClick(index)}
                >
                  {index + 1}
                </button>
              );
            })}
            <button className='next-btn' onClick={handleClickNext}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
