import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccessToken } from "../features/auth/authSlice";
import { fetchPlaylists } from "../features/playlists/playlistsSlice";

const MainContent = () => {
  const dispatch = useDispatch();
  const { featured, toplists, status } = useSelector(
    (state) => state.playlists
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAccessToken());
      dispatch(fetchPlaylists());
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="flex-1 p-8 bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 text-white">Good Afternoon</h2>
      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {featured.map((playlist) => (
              <div key={playlist.id} className="bg-gray-800 p-4 rounded-lg">
                <img
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <p className="text-white">{playlist.name}</p>
              </div>
            ))}
          </div>
          <h2 className="text-3xl font-bold mb-8 text-white">Your Top Mixes</h2>
          <div className="grid grid-cols-4 gap-4">
            {toplists.map((mix) => (
              <div key={mix.id} className="bg-gray-800 p-4 rounded-lg">
                <img
                  src={mix.images[0].url}
                  alt={mix.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <p className="text-white">{mix.name}</p>
              </div>
            ))}
          </div>
        </>
      )}
      {status === "failed" && <p>Error loading playlists.</p>}
    </div>
  );
};

export default MainContent;
