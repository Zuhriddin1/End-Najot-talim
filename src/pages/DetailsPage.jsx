import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getToken } from "../components/utils";
import MusicPlayer from "../components/MusicPlayer";
import LeftSidebar from "../components/LeftSide";
import RightSidebar from "../components/RightSide";
import { FaDownload, FaHeart, FaRegHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const { name, description, image } = location.state;
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [likedTracks, setLikedTracks] = useState(() => {
    const savedLikes = localStorage.getItem("likedTracks");
    return savedLikes ? JSON.parse(savedLikes) : [];
  });
  const [isPlaylistLiked, setIsPlaylistLiked] = useState(() => {
    const savedPlaylistLikes = localStorage.getItem("likedPlaylists");
    const likedPlaylists = savedPlaylistLikes
      ? JSON.parse(savedPlaylistLikes)
      : [];
    return likedPlaylists.includes(id);
  });

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      const { token } = await getToken();
      const response = await fetch(
        `${import.meta.env.VITE_API_MUSIC}playlists/${id}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setPlaylistTracks(data.items);
    };
    fetchPlaylistTracks();
  }, [id]);

  const handleTrackClick = (track) => {
    setCurrentTrack(track);
  };

  const handleLikeClick = (track) => {
    const isLiked = likedTracks.some(
      (likedTrack) => likedTrack.id === track.id
    );
    let updatedLikes;
    if (isLiked) {
      updatedLikes = likedTracks.filter(
        (likedTrack) => likedTrack.id !== track.id
      );
      toast.info("Track removed from liked songs");
    } else {
      const dateAdded = Date.now();
      updatedLikes = [...likedTracks, { ...track, dateAdded }];
      toast.success("Track added to liked songs");
    }
    setLikedTracks(updatedLikes);
    localStorage.setItem("likedTracks", JSON.stringify(updatedLikes));
  };
  const handlePlaylistLikeClick = () => {
    let likedPlaylists =
      JSON.parse(localStorage.getItem("likedPlaylists")) || [];
    if (isPlaylistLiked) {
      likedPlaylists = likedPlaylists.filter((playlistId) => playlistId !== id);
    } else {
      likedPlaylists.push(id);
    }
    setIsPlaylistLiked(!isPlaylistLiked);
    localStorage.setItem("likedPlaylists", JSON.stringify(likedPlaylists));
  };

  const isTrackLiked = (track) => {
    return likedTracks.some((likedTrack) => likedTrack.id === track.id);
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleDownloadClick = async (track) => {
    const { token } = await getToken();
    const response = await fetch(
      `${import.meta.env.VITE_API_MUSIC}tracks/${track.id}/download`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${track.name}.mp3`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <ToastContainer />
      <LeftSidebar />
      <div className="flex-1 p-4">
        <div className="bg-gradient-to-b from-purple-600 via-transparent to-gray-900 w-full p-8 rounded-lg mb-4">
          <div className="flex items-center mb-8">
            <img
              src={image}
              alt={name}
              className="h-64 w-64 object-cover rounded-lg shadow-lg"
            />
            <div className="ml-8">
              <h2 className="text-5xl font-bold">{name}</h2>
              <p
                className="text-lg text-gray-300 mt-4"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>
          <div className="flex items-center">
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full flex items-center mr-4">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-4.485-2.62a1 1 0 00-1.507.862v5.24a1 1 0 001.507.862l4.485-2.62a1 1 0 000-1.724z"
                />
              </svg>
              Play
            </button>
            <button
              className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-full flex items-center mr-4"
              onClick={handlePlaylistLikeClick}
            >
              {isPlaylistLiked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-400" />
              )}
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-full flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4H9v-1h3V8l4 4h-3v4z"
                />
              </svg>
              More
            </button>
          </div>
        </div>
        <div className="w-full">
          <h3 className="text-xl font-bold mb-4">Tracks</h3>
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="p-2">#</th>
                <th className="p-2">Title</th>
                <th className="p-2">Album</th>
                <th className="p-2 -translate-x-[15px]">Duration</th>
                <th className="p-2">Like</th>
                <th className="p-2 translate-x-2">Download</th>
              </tr>
            </thead>
            <tbody>
              {playlistTracks.map((item, index) => (
                <tr
                  key={item.track.id}
                  className={`cursor-pointer p-2 hover:bg-gray-700 ${
                    isTrackLiked(item.track) ? "bg-gray-800" : ""
                  }`}
                  onClick={() => handleTrackClick(item.track)}
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <img
                        src={item.track.album.images[0].url}
                        alt={item.track.name}
                        className="h-10 w-10 mr-4 rounded-md"
                      />
                      <div>
                        <p className="text-lg font-bold">{item.track.name}</p>
                        <p className="text-gray-400">
                          {item.track.artists
                            .map((artist) => artist.name)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">{item.track.album.name}</td>
                  <td className="p-2">
                    {formatDuration(item.track.duration_ms)}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeClick(item.track);
                      }}
                    >
                      {isTrackLiked(item.track) ? (
                        <FaHeart className="text-green-500" />
                      ) : (
                        <FaRegHeart className="text-gray-400" />
                      )}
                    </button>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadClick(item.track);
                      }}
                      className="bg-blue-500 ml-7 hover:bg-blue-600 text-white py-1 px-2 rounded"
                    >
                      <FaDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <RightSidebar />
      {currentTrack && <MusicPlayer currentTrack={currentTrack} />}
    </div>
  );
}
export default DetailsPage;
