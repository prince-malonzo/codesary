import React, { useRef, useState, useEffect } from "react";
import './Music.css';
import MusicIcon from '../assets/music.svg';
import Disk from '../assets/disk.svg';
import Play from '../assets/play.svg';
import Pause from '../assets/pause.svg';
import BackIcon from '../assets/back-icon.svg';
import Song from '../assets/music/tingin.mp3';
import { useNavigate } from "react-router-dom";

const Music = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);
  const [cardLoaded, setCardLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCardLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const goBack = () => {
    setIsBackLoading(true);
    setTimeout(() => {
      navigate('/choose');
    }, 1500);
  };

  if (isBackLoading) {
    return (
      <div className="music-loading">
        <div className="music-spinner"></div>
        <p className="music-loading-text">Going back...</p>
      </div>
    );
  }

  return (
    <div className="music-container">
      <div className="music-back" onClick={goBack}>
        <img src={BackIcon} alt="Back" />
        <p>BACK</p>
      </div>

      <div className={`music-card ${cardLoaded ? 'fade-in' : 'card-pre-animate'}`}>
        <div className="music-header">
          <h1>OUR FAVE MUSIC</h1>
          <img src={MusicIcon} alt="note" />
        </div>

        <div className={`music-disk ${isPlaying ? 'spinning' : ''}`}>
          <img src={Disk} alt="Disk" />
        </div>

        <div className="music-footer">
          <h3>Tingin by Cup of Joe</h3>
          <button onClick={toggleMusic}>
            <img src={isPlaying ? Pause : Play} alt="play/pause" />
          </button>
          <audio ref={audioRef} src={Song} />
        </div>
      </div>
    </div>
  );
};

export default Music;
