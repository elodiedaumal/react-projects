import React from 'react';

import { useGlobalContext } from './context';

const Stories = () => {
  const { isLoading, hits, removeStory } = useGlobalContext();
  if (isLoading) {
    return <div className='loading'></div>;
  }
  return (
    <section className='stories'>
      {hits.map((story) => {
        return (
          <article className='story' key={story.objectID}>
            <h4 className='title'>{story.title}</h4>
            <p className='info'>
              {story.points} points by <span>{story.author} | </span>
              {story.num_comments} comments
            </p>
            <div>
              <a
                className='read-link'
                href={story.url}
                target='_blank'
                rel='noreferrer noopener'
              >
                read more
              </a>
              <button
                className='remove-btn'
                onClick={() => {
                  removeStory(story.objectID);
                }}
              >
                remove
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Stories;
