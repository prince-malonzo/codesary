import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import './Login.css';

const Login = () => {
    const [fullName, setFullName] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Initial loading
        const timer = setTimeout(() => setLoading(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        const correctName = 'Lovena';
        const correctDate = '2024-07-10';
        const isNameValid = fullName.trim() === correctName;
        const isDateValid = date === correctDate;

        if (isNameValid && isDateValid) {
            setIsLoggingIn(true); // Show Logging In screen
            setTimeout(() => {
                navigate('/invitation');
            }, 2000); // Simulate logging delay
        } else if (!isNameValid && !isDateValid) {
            alert('Invalid Name & Date');
        } else if (!isNameValid) {
            alert('Invalid Name');
        } else {
            alert('Invalid Date');
        }
    };

    // Initial loading
    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p className="loading-text">Loading...</p>
            </div>
        );
    }

    // Logging in loading
    if (isLoggingIn) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p className="loading-text">Logging In...</p>
            </div>
        );
    }

    return (
        <div className='container'>
            <div className='main-box'>
                <div className='logo-container'>
                    <img src={Logo} height={100} />
                </div>
                <div className='input-container'>
                    <div className='upper-input'>
                        <label>Name</label><br />
                        <input
                            placeholder='Enter Name'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className='lower-input'>
                        <label>Date of Being Together</label><br />
                        <input
                            type='date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className='button-container'>
                    <button onClick={handleClick}>
                        <p>Login</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
