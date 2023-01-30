import React, { useState, useEffect } from 'react';
import rgbToHex from './utils';

const SingleColor = ({ rgb, weight, index, hex }) => {
  const [alert, setAlert] = useState(false);
  const rgbColor = rgb.join(',');
  const hexColor = rgbToHex(...rgb);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [alert]);
  return (
    <article
      className={`'color' ${index > 10 && 'color-light'}`}
      style={{ backgroundColor: `rgb(${rgbColor})` }}
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hexColor);
      }}
    >
      <p className='percent-value'>{weight}%</p>
      <p className='color-value'>{hexColor}</p>
      {alert && <p className='alert'>Copied to clipboard</p>}
    </article>
  );
};

export default SingleColor;
