import { useState, useEffect } from 'react';
import axios from 'axios';
import paginate from './utils';
const url = 'https://api.github.com/users/john-smilga/followers?per_page=100';

export const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(url);
      const data = res.data;

      setData(paginate(data));
      setLoading(false);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return { loading, data };
};
