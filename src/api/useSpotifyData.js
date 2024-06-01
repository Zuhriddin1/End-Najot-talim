import { useEffect, useState } from "react";
const useSpotifyData = (url, token) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (token) {
      fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error));
    }
  }, [url, token]);
  return data;
};
export default useSpotifyData;