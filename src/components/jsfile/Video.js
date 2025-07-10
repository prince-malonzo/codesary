import React, { useRef, useState, useEffect } from "react";
import './Video.css';
import VidAnniv from '../assets/video/anniv-vidmain.mp4';
import VideoImg from '../assets/video.svg';
import BackIcon from '../assets/back-icon.svg';
import Play from '../assets/play.svg';
import Pause from '../assets/pause.svg';
import { useNavigate } from "react-router-dom";

const Video = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);
  const [cardLoaded, setCardLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCardLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleVideo = () => {
    const vid = videoRef.current;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
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
      <div className="video-loading">
        <div className="video-spinner"></div>
        <p className="video-loading-text">Going back...</p>
      </div>
    );
  }

  return (
    <div className="video-container">
      <div className="video-back" onClick={goBack}>
        <img src={BackIcon} alt="Back" />
        <p>BACK</p>
      </div>

      <div className={`video-card ${cardLoaded ? 'fade-in' : 'card-pre-animate'}`}>
        <div className="video-header">
          <h1>VIDEO MEMORIES</h1>
          <img src={VideoImg} alt="video icon" />
        </div>

        <div className="video-box">
          <video ref={videoRef} src={VidAnniv} className="video-element" />
          <button onClick={toggleVideo} className="video-btn">
            <img src={isPlaying ? Pause : Play} alt="Toggle Video" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Video;
