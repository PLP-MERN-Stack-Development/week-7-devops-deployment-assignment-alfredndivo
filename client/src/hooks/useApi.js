import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = (endpoint, method = 'get', body = null, immediate = true) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        url: endpoint,
        method,
        data: body,
      });

      // If response contains `posts`, return only that
      if (response.data?.posts) {
        setData(response.data.posts);
      } else {
        setData(response.data); // fallback
      }

    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [endpoint, method, body]);

  return { data, loading, error, refetch: fetchData };
};

export default useApi;
