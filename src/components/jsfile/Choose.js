import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Letter from '../assets/letter.svg';
import Photo from '../assets/photo.svg';
import Music from '../assets/music.svg';
import Video from '../assets/video.svg';
import './Choose.css';

const Choose = () => {
    const navigate = useNavigate();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");

    const transitionTo = (path) => {
        setIsTransitioning(true);
        setLoadingMessage("Loading...");
        setTimeout(() => {
            navigate(path);
        }, 3000);
    };

    if (isTransitioning) {
        return (
            <div className="choose-container">
                <div className="invitation-loading">
                    <div className="invitation-spinner"></div>
                    <p className="invitation-loading-text">{loadingMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="choose-container">
            <h1 className="choose-title">CHOOSE A GIFT FROM PWINS</h1>
            <div className="gift-options">
                <div className="gift-card" onClick={() => transitionTo('/letter')}>
                    <h2 className="gift-label">LETTER</h2>
                    <img src={Letter} alt="Letter" className="gift-icon" />
                </div>
                <div className="gift-card" onClick={() => transitionTo('/photo')}>
                    <h2 className="gift-label">PHOTO</h2>
                    <img src={Photo} alt="Photo" className="gift-icon" />
                </div>
                <div className="gift-card" onClick={() => transitionTo('/music')}>
                    <h2 className="gift-label">MUSIC</h2>
                    <img src={Music} alt="Music" className="gift-icon" />
                </div>
                <div className="gift-card" onClick={() => transitionTo('/video')}>
                    <h2 className="gift-label">VIDEO</h2>
                    <img src={Video} alt="Video" className="gift-icon" />
                </div>
            </div>
        </div>
    );
};

export default Choose;
