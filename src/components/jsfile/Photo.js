import React, { useState, useEffect } from "react";
import './Photo.css';
import BackIcon from '../assets/back-icon.svg';
import PhotoImg from '../assets/photo.svg';
import one from '../assets/photo/1.jpg';
import two from '../assets/photo/2.jpg';
import three from '../assets/photo/3.jpg';
import four from '../assets/photo/4.jpg';
import five from '../assets/photo/5.jpg';
import six from '../assets/photo/6.jpg';
import seven from '../assets/photo/7.jpg';
import eight from '../assets/photo/8.jpg';
import nine from '../assets/photo/9.jpg';
import ten from '../assets/photo/10.jpg';
import eleven from '../assets/photo/11.jpg';
import twelve from '../assets/photo/12.jpg';
import thirteen from '../assets/photo/13.jpg';
import fourteen from '../assets/photo/14.jpg';
import fifthteen from '../assets/photo/15.jpg';
import sixteen from '../assets/photo/16.jpg';
import seventeen from '../assets/photo/17.jpg';
import eightteen from '../assets/photo/18.jpg';
import nineteen from '../assets/photo/19.jpg';
import twenty from '../assets/photo/20.jpg';
import twentyone from '../assets/photo/21.jpg';
import twentytwo from '../assets/photo/22.jpg';
import twentythree from '../assets/photo/23.jpg';
import twentyfour from '../assets/photo/24.jpg';
import twentyfive from '../assets/photo/25.jpg';
import twentysix from '../assets/photo/26.jpg';
import { useNavigate } from "react-router-dom";

const photos = [
  { src: one }, { src: two }, { src: three }, { src: four }, { src: five },
  { src: six }, { src: seven }, { src: eight }, { src: nine }, { src: ten },
  { src: eleven }, { src: twelve }, { src: thirteen }, { src: fourteen },
  { src: fifthteen }, { src: sixteen }, { src: seventeen }, { src: eightteen },
  { src: nineteen }, { src: twenty }, { src: twentyone }, { src: twentytwo },
  { src: twentythree }, { src: twentyfour }, { src: twentyfive }, { src: twentysix },
];

const Photo = () => {
  const [active, setActive] = useState(0);
  const [isBackLoading, setIsBackLoading] = useState(false);
  const [cardLoaded, setCardLoaded] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setCardLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Autoplay that resets on interaction
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % photos.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [active]);

  const goto = (idx) => {
    if (!isChanging && idx !== active) {
      setIsChanging(true);
      setActive(idx);
      setTimeout(() => setIsChanging(false), 500); // 500ms debounce
    }
  };

  const prev = () => goto((active - 1 + photos.length) % photos.length);
  const next = () => goto((active + 1) % photos.length);  

  const handleBack = () => {
    setIsBackLoading(true);
    setTimeout(() => navigate('/choose'), 1500);
  };

  if (isBackLoading) {
    return (
      <div className="photo-container">
        <div className="photo-loading">
          <div className="photo-spinner"></div>
          <p className="photo-loading-text">Going back...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="photo-container">
      <div className="back-button">
        <button onClick={handleBack}>
          <img src={BackIcon} alt="Back" />
          <h3>BACK</h3>
        </button>
      </div>
      <div className={`photo-card${cardLoaded ? '' : ' card-pre-animate'}`}>
        <div className="photo-header">
          <h1>PHOTO MEMORIES</h1>
          <img src={PhotoImg} alt="camera" />
        </div>
        <div className="slider">
          <button className="glass-btn prev" onClick={prev}>
            <img src={BackIcon} alt="Prev" />
          </button>
          <div className="track">
            {photos.map((p, i) => {
              const offset = i - active;
              const abs = Math.abs(offset);
              return (
                <div
                  key={i}
                  className="item"
                  style={{
                    transform: `
                      translateX(${offset * 120}px)
                      scale(${1 - 0.2 * abs})
                      perspective(1000px)
                      rotateY(${offset * 5}deg)`,
                    zIndex: photos.length - abs,
                    filter: abs > 0 ? 'blur(5px)' : 'none',
                    opacity: abs > 2 ? 0 : 1
                  }}
                  onClick={() => goto(i)}
                >
                  <img src={p.src} alt="" style={{ "--i": i }} />
                </div>
              );
            })}
          </div>
          <button className="glass-btn next" onClick={next}>
            <img src={BackIcon} alt="Next" style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Photo;
