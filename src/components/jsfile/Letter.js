import React, { useEffect, useState } from "react";
import './Letter.css';
import LetterImg from '../assets/letter.svg';
import BackIcon from '../assets/back-icon.svg';
import { useNavigate } from "react-router-dom";

const fullMessage = `
Hi bebe, happy 1st anniversary!! it’s been a year na naging tayo hihi so proud, nakaabot tayo rito. well tayo na ‘to ih. Alam ko naman na gaano tayo naghirap sa mga pinagdaan natin, pero tignan mo naka-abot tayo rito hihi. Ito palang yung unang code ko for uuuu pero ginawa kong sobrang speciall. Ikaw na yan ohh.
Gusto ko lang naman sabihin na sobrang mahal na mahal kita as in. Para nakong baliw, kasi araw araw kitang namimiss kahit sobrang busy koo. I will be always by ur sideee, and nandito lang ako palagi forr uuuu haa.
Goodluck sa magiging journey na’tin. Hindi man perfect, pero in the end of the day tayo pa rin sa isa’t isa. Never akong susuko sayo. Alam ko rin na sobrang hirap ng pinagdadaan mo, pero hindi kita pababayaan. I will helpp uuu. I’m always here makikinig sa lahat ng chikas, rants, & everything.
Thank you so much for everything. I Love You So Much, Lovena Recca G. Cañares <3.
`;

const Letter = () => {
    const navigate = useNavigate();
    const [typedText, setTypedText] = useState("");
    const [typingDone, setTypingDone] = useState(false);
    const [isLoadingBack, setIsLoadingBack] = useState(false);

    useEffect(() => {
        let i = 0;
        const speed = 20;
        const typingInterval = setInterval(() => {
            setTypedText(fullMessage.substring(0, i));
            i++;
            if (i > fullMessage.length) {
                clearInterval(typingInterval);
                setTypingDone(true);
            }
        }, speed);

        return () => clearInterval(typingInterval);
    }, []);

    const handleBack = () => {
        setIsLoadingBack(true);
        setTimeout(() => {
            navigate('/choose');
        }, 1500);
    };

    if (isLoadingBack) {
        return (
            <div className="letter-container">
                <div className="letter-loading">
                    <div className="letter-spinner"></div>
                    <p className="letter-loading-text">Going back...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="letter-container">
            <div className="back-button">
                <button onClick={handleBack}>
                    <img src={BackIcon} alt="Back" />
                    <h3>BACK</h3>
                </button>
            </div>

            <div className="letter-content fade-in-box">
                <div className="letter-header">
                    <h1>HAPPY FIRST ANNIVERSARY</h1>
                    <img src={LetterImg} alt="Letter Icon" />
                </div>

                <div className="letter-body">
                    <p><strong>To: Lovena Recca G. Cañares</strong></p>
                    <p className={`typing-text ${typingDone ? 'done' : ''}`}>{typedText}</p>
                    <p>Regards,<br /><strong>Prince Barachiel Malonzo (UR BEBEBOI)</strong></p>
                </div>
            </div>
        </div>
    );
};

export default Letter;
