import React, { useEffect, useState, useRef } from "react";
import {
  FaHeart,
  FaDownload,
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaRetweet,
  FaVolumeUp,
} from "react-icons/fa";
import LeftSidebar from "../components/LeftSide";
import RightSidebar from "../components/RightSide";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../components/utils";

function LikesPage() {
  const [likedTracks, setLikedTracks] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const audioPlayer = useRef(new Audio());

  useEffect(() => {
    const savedLikes = localStorage.getItem("likedTracks");
    if (savedLikes) {
      setLikedTracks(JSON.parse(savedLikes));
    }
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const duration = audioPlayer.current.duration;
      const currentTime = audioPlayer.current.currentTime;
      const progress = (currentTime / duration) * 100;
      setProgress(progress);
    };

    audioPlayer.current.addEventListener("timeupdate", updateProgress);

    return () => {
      audioPlayer.current.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  useEffect(() => {
    if (currentlyPlaying) {
      audioPlayer.current.src = currentlyPlaying.preview_url;
      audioPlayer.current.play();
      setIsPlaying(true);
    } else {
      audioPlayer.current.pause();
      audioPlayer.current.src = "";
      setIsPlaying(false);
    }
  }, [currentlyPlaying]);

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownloadClick = async (track) => {
    try {
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
    } catch (error) {
      console.error("Error downloading track:", error);
      toast.error("Error downloading track");
    }
  };

  const handleLikeClick = (trackId) => {
    const updatedTracks = likedTracks.filter((track) => track.id !== trackId);
    setLikedTracks(updatedTracks);
    localStorage.setItem("likedTracks", JSON.stringify(updatedTracks));
    toast.info("Track removed from liked songs");
  };

  const handleTrackPlay = (track) => {
    setCurrentlyPlaying(track);
  };

  const handleNextTrack = () => {
    const currentIndex = likedTracks.findIndex(
      (track) => track.id === currentlyPlaying.id
    );
    const nextIndex = (currentIndex + 1) % likedTracks.length;
    setCurrentlyPlaying(likedTracks[nextIndex]);
  };

  const handlePreviousTrack = () => {
    const currentIndex = likedTracks.findIndex(
      (track) => track.id === currentlyPlaying.id
    );
    const prevIndex =
      (currentIndex - 1 + likedTracks.length) % likedTracks.length;
    setCurrentlyPlaying(likedTracks[prevIndex]);
  };

  const handleShuffleClick = () => {
    setShuffle(!shuffle);
  };

  const handleRepeatClick = () => {
    setRepeat(!repeat);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioPlayer.current.volume = newVolume;
  };

  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    setProgress(newProgress);
    audioPlayer.current.currentTime =
      (newProgress / 100) * audioPlayer.current.duration;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <ToastContainer />
      <LeftSidebar />
      <div className="flex-1 p-4">
        <div className="bg-gradient-to-b from-purple-600 to-gray-900 p-8 rounded-lg mb-4 text-center">
          <div className="flex justify-center items-center">
            <FaHeart className="text-5xl text-white" />
          </div>
          <div className="mt-4">
            <h2 className="text-5xl font-bold">Liked Songs</h2>
            <p className="text-gray-300 mt-2">{likedTracks.length} songs</p>
          </div>
        </div>
        <div className="w-full">
          <table className="w-full bg-gray-800 text-gray-400 rounded-md overflow-hidden">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Album</th>
                <th className="p-4 text-left">Date Added</th>
                <th className="p-4 text-left">Duration</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {likedTracks.map((track, index) => (
                <tr
                  key={track.id}
                  className="bg-gray-900 hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleTrackPlay(track)}
                >
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4 flex items-center">
                    <img
                      src={track.album.images[0].url}
                      alt={track.name}
                      className="h-12 w-12 mr-4 rounded-md"
                    />
                    <div>
                      <p className="font-bold">{track.name}</p>
                      <p className="text-gray-400">
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">{track.album.name}</td>
                  <td className="p-4">{formatDate(track.dateAdded)}</td>
                  <td className="p-4">
                    {formatTime(track.duration_ms / 1000)}
                  </td>
                  <td className="p-4 flex items-center">
                    <FaHeart
                      className="text-green-500 -translate-y-3 cursor-pointer mr-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeClick(track.id);
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadClick(track);
                      }}
                      className="bg-blue-500 -translate-y-3 hover:bg-blue-600 text-white py-1 px-2 rounded"
                    >
                      <FaDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {currentlyPlaying && (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex items-center">
            <img
              src={currentlyPlaying.album.images[0].url}
              alt={currentlyPlaying.name}
              className="h-12 w-12 mr-4"
            />
            <div className="flex-1">
              <p className="text-lg font-bold">{currentlyPlaying.name}</p>
              <p className="text-gray-400">
                {currentlyPlaying.artists
                  .map((artist) => artist.name)
                  .join(", ")}
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <button onClick={handlePreviousTrack} className="mx-2">
                <FaStepBackward />
              </button>
              <button onClick={handlePlayPauseClick} className="mx-2">
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={handleNextTrack} className="mx-2">
                <FaStepForward />
              </button>
              <button
                onClick={handleShuffleClick}
                className={`mx-2 ${shuffle ? "text-green-500" : ""}`}
              >
                <FaRandom />
              </button>
              <button
                onClick={handleRepeatClick}
                className={`mx-2 ${repeat ? "text-green-500" : ""}`}
              >
                <FaRetweet />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-end">
              <input
                type="range"
                value={progress}
                onChange={handleProgressChange}
                className="mx-2"
              />
              <span className="mx-2">{Math.round(progress)}</span>
              <input
                type="range"
                value={volume}
                onChange={handleVolumeChange}
                className="mx-2"
              />
              <span className="mx-2">{Math.round(volume * 100)}</span>
              <FaVolumeUp className="mx-2" />
            </div>
          </div>
        )}
      </div>
      <RightSidebar />
    </div>
  );
}
export default LikesPage;
