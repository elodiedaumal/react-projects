import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa';
const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';

function App() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('jhon doe');
  const [person, setPerson] = useState([]);

  async function getPerson() {
    try {
      const response = await axios.get(url);
      const person = response.data.results[0];

      const { phone, email } = person;
      const { large: image } = person.picture;
      const {
        login: { password },
      } = person;
      const { title, first, last } = person.name;
      const {
        dob: { age },
      } = person;
      const {
        street: { number, name },
      } = person.location;
      const { city, country, postcode } = person.location;
      const newPerson = {
        image,
        phone,
        age,
        email,
        password,
        name: `${title} ${first} ${last}`,
        adress: `${number} ${name}, ${postcode}, ${city}, ${country}`,
      };
      setPerson(newPerson);
      setLoading(false);
      setTitle('name');
      setValue(newPerson.name);
    } catch (error) {
      console.error(error);
    }
  }

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  useEffect(() => {
    getPerson();
  }, []);

  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img
            className='user-img'
            src={(person && person.image) || defaultImage}
            alt='random user'
          />
          <p className='user-title'>my {title} is</p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
            <button
              className='icon'
              data-label='name'
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className='icon'
              data-label='email'
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className='icon' data-label='age' onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className='icon'
              data-label='adress'
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className='icon'
              data-label='phone'
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className='icon'
              data-label='password'
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className='btn' type='button' onClick={getPerson}>
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
