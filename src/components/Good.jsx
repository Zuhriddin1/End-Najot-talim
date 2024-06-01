import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { getToken } from "../components/utils";
const Good = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const { token } = await getToken();
        const response = await fetch(
          "https://api.spotify.com/v1/browse/categories/toplists/playlists",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }
        const data = await response.json();
        setPlaylists(data.playlists.items.slice(0, 6));
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setError("Failed to fetch playlists. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <MdRefresh className="animate-spin w-12 h-12" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-8 w-full bg-gradient-to-b from-red-600 via-transparent to-gray-900 text-white">
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="p-8 w-full bg-gradient-to-b from-blue-600 via-transparent to-gray-900 text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Good afternoon</h1>
        <div className="flex space-x-4">
          <button className="p-2 bg-black rounded-full hover:bg-gray-700">
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 bg-black rounded-full hover:bg-gray-700">
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 cursor-pointer">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-700"
          >
            <img
              src={playlist.images[0]?.url}
              alt={playlist.name || "Playlist"}
              className="w-16 h-16 rounded-lg"
            />
            <div>
              <h2 className="text-lg font-semibold cursor-pointer hover:text-gray-600">
                {playlist.name || "Playlist"}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Good;