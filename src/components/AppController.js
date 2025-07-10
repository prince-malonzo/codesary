import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Choose from './jsfile/Choose'
import Letter from './jsfile/Letter'
import Photo from './jsfile/Photo'
import Music from './jsfile/Music'
import Video from './jsfile/Video'
import Login from './jsfile/Login'
import Invitation from './jsfile/Invitation'

const AppController = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/invitation" element={<Invitation />} />
                <Route path="/choose" element={<Choose />} />
                <Route path="/letter" element={<Letter />} />
                <Route path="/photo" element={<Photo />} />
                <Route path="/music" element={<Music />} />
                <Route path="/video" element={<Video />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppController