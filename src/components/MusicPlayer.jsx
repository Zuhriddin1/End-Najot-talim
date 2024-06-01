  import React, { useState, useRef, useEffect } from "react";
  import {
    FaPlay,
    FaPause,
    FaStepBackward,
    FaStepForward,
    FaVolumeUp,
    FaRandom,
    FaRetweet,
  } from "react-icons/fa";
  import { useLocation } from "react-router-dom";

  const MusicPlayer = ({ currentTrack }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
      if (currentTrack) {
        setIsPlaying(true);
        audioRef.current.play();
      }
    }, [currentTrack]);

    const handlePlayPause = () => {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    };

    const handleVolumeChange = (e) => {
      const volume = e.target.value;
      audioRef.current.volume = volume;
      setVolume(volume);
    };

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex items-center">
        {currentTrack && (
          <>
            <img
              src={currentTrack.album.images[0].url}
              alt={currentTrack.name}
              className="h-12 w-12 mr-4"
            />
            <div className="flex-1">
              <p className="text-lg font-bold">{currentTrack.name}</p>
              <p className="text-gray-400">
                {currentTrack.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </>
        )}
        <div className="flex-1 flex items-center justify-center">
          <button className="mx-2">
            <FaStepBackward />
          </button>
          <button onClick={handlePlayPause} className="mx-2">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className="mx-2">
            <FaStepForward />
          </button>
          <button className="mx-2">
            <FaRandom />
          </button>
          <button className="mx-2">
            <FaRetweet />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-end">
          <span>
            {(audioRef.current && audioRef.current.currentTime.toFixed(2)) ||
              "0:00"}
          </span>
          <div className="relative mx-4 w-2/4">
            <input
              type="range"
              value={progress}
              onChange={(e) =>
                (audioRef.current.currentTime =
                  (e.target.value / 100) * audioRef.current.duration)
              }
              className="w-full"
            />
          </div>
          <span>
            {(audioRef.current && audioRef.current.duration.toFixed(2)) || "0:00"}
          </span>
          <FaVolumeUp className="ml-4" />
          <input
            type="range"
            value={volume}
            onChange={handleVolumeChange}
            step="0.01"
            min="0"
            max="1"
            className="ml-2 w-1/4"
          />
        </div>
        {currentTrack && (
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            src={currentTrack.preview_url}
          />
        )}
      </div>
    );
  };

  export default MusicPlayer;
