import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Gift from '../assets/gift.svg';
import Ebol1 from '../assets/ebol1.svg';
import Ebol2 from '../assets/ebol2.svg';
import './Invitation.css';

const Invitation = () => {
    const navigate = useNavigate();
    const [showCard, setShowCard] = useState(false);
    const [showReaction1, setShowReaction1] = useState(false);
    const [showReaction2, setShowReaction2] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [showFakeNooo, setShowFakeNooo] = useState(false);
    const [noooJumpCount, setNoooJumpCount] = useState(0);
    const [noooPosition, setNoooPosition] = useState({ top: 100, left: 100 });
    const [showInstructionText, setShowInstructionText] = useState(false);
    const [nooooooDisabled, setNooooooDisabled] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowCard(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    const transitionTo = (target) => {
        setIsTransitioning(true);
        const timer = setTimeout(() => {
            if (target === "reaction1") {
                setShowReaction1(true);
            } else if (target === "reaction2") {
                setShowReaction2(true);
            } else if (target === "main") {
                setShowReaction1(false);
                setShowReaction2(false);
                setShowFakeNooo(false);
                setNoooJumpCount(0);
                setShowInstructionText(false);
            }
            setIsTransitioning(false);
        }, 1000);
        return () => clearTimeout(timer);
    };

    const handleNooooooClick = () => {
        setLoadingMessage("Why No?...");
        transitionTo("reaction1");
    };

    const handleNooBleeClick = () => {
        setLoadingMessage("Why No?...");
        setNooooooDisabled(true);
        transitionTo("reaction2");
    };

    const backToMain = () => {
        setLoadingMessage("Going Back...");
        transitionTo("main");
    };

    const handleSabiKoNooo = () => {
        setShowFakeNooo(true);
        setNoooJumpCount(0);
        setShowInstructionText(false);
        moveFakeNooo();
    };

    const moveFakeNooo = () => {
        if (noooJumpCount < 4) {
            const top = Math.random() * (window.innerHeight - 80);
            const left = Math.random() * (window.innerWidth - 120);
            setNoooPosition({ top, left });
            setNoooJumpCount((count) => count + 1);
        } else {
            setNoooJumpCount(5);
            setShowFakeNooo(false);
            setShowInstructionText(true);
        }
    };

    const handleOpenPlease = () => {
        setLoadingMessage("Opening...");
        setIsTransitioning(true);
        setTimeout(() => {
            navigate("/choose");
        }, 1500);
    };

    if (!showCard) {
        return (
            <div className="invitation-loading">
                <div className="invitation-spinner"></div>
                <p className="invitation-loading-text">Preparing your letter...</p>
            </div>
        );
    }

    if (isTransitioning) {
        return (
            <div className="invitation-loading">
                <div className="invitation-spinner"></div>
                <p className="invitation-loading-text">{loadingMessage}</p>
            </div>
        );
    }

    if (showReaction2) {
        return (
            <div className="invitation-container">
                <div className="reaction-card animated-card">
                    <h2 className="reaction-title">AYYY BALIK KA DONN!!</h2>
                    <img src={Ebol2} alt="Reaction 2" className="reaction-image funny-animation" />
                    {showInstructionText && <p className="instruction-text">PINDUTIN MO SI SIGE NA NGA</p>}
                    <div className="button-group">
                        <button
                            className="btn-decline"
                            onClick={handleSabiKoNooo}
                            disabled={showFakeNooo || showInstructionText}
                            style={{ opacity: showFakeNooo || showInstructionText ? 0.5 : 1 }}
                        >
                            SABI KO NOOO
                        </button>
                        <button
                            className="btn-accept"
                            onClick={backToMain}
                            disabled={showFakeNooo}
                            style={{ opacity: showFakeNooo ? 0.5 : 1 }}
                        >
                            SIGE NA NGA
                        </button>
                    </div>
                </div>

                {showFakeNooo && (
                    <button
                        className="btn-decline floating-nooo"
                        onClick={moveFakeNooo}
                        style={{
                            position: "fixed",
                            top: `${noooPosition.top}px`,
                            left: `${noooPosition.left}px`,
                        }}
                    >
                        NOOO
                    </button>
                )}
            </div>
        );
    }

    if (showReaction1) {
        return (
            <div className="invitation-container">
                <div className="reaction-card animated-card">
                    <h2 className="reaction-title">Why NO!??? Go BACKK!!</h2>
                    <img src={Ebol1} alt="Reaction 1" className="reaction-image funny-animation" />
                    <div className="button-group">
                        <button className="btn-decline" onClick={handleNooBleeClick}>NOO BLEEE</button>
                        <button className="btn-accept" onClick={backToMain}>Ok, Fine</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="invitation-container">
            <div className="invitation-card animated-card">
                <h1 className="invitation-title">You received a gift from Pwins</h1>
                <img src={Gift} alt="Letter" className="invitation-image float-animation" />
                <div className="button-group">
                    <button
                        className="btn-decline"
                        onClick={handleNooooooClick}
                        disabled={nooooooDisabled}
                        style={{ opacity: nooooooDisabled ? 0.5 : 1 }}
                    >
                        NOOOOOO
                    </button>
                    <button className="btn-accept" onClick={handleOpenPlease}>
                        Open Please!!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Invitation;
