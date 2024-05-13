
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';
import LoginPage from './components/auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import HomePageGuest from './components/HomePageGuest/HomePageGuest';
import HomePageAuth from './components/HomePageAuth/HomePageAuth';
import NavBar from './components/common/NavBar';
import MusicPage from './components/MusicPage/MusicPage';
import EarTraining from './components/EarTraining/EarTraining';
import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import useAuthentication from './hooks/useAuthentication';

function App() {
  const navigate = useNavigate()
  const [song, setSong] = useState(null)
  const { isAuthenticated, loading, username, refreshAuthentication } = useAuthentication()

  const handleAuthentication = () => {
    refreshAuthentication()
  }

  const handleLogout = () => {
    localStorage.clear()
    refreshAuthentication()
  }

  const handleSongClick = (song) => {
        setSong(song)
        navigate('/music')
  }

  const cancelSong = () => {
    setSong(null)
  }

  return (
    <div> 
      <NavBar username={username} isAuthenticated={isAuthenticated} logout={handleLogout} />
      <Routes>
        <Route path='/' element={
        <HomePage>
          {
            !isAuthenticated ? (
              <>
                <HomePageGuest refreshAuthentication={refreshAuthentication}>
                  <LogIn handleAuthentication={handleAuthentication} navigate='/'/>
                  <SignUp handleAuthentication={handleAuthentication} navigate='/'/>
                </HomePageGuest>
              </>
            ) : (
              <>
                <HomePageAuth username={username} handleSongClick={handleSongClick} cancelSong={cancelSong}>
                </HomePageAuth>
              </>
            )
          }
        </HomePage>
        }/>
        <Route path='/music' element={<MusicPage isAuthenticated={isAuthenticated} sentSong={song}/>} />
        <Route path='/eartraining/*' element={
          <EarTraining/>
        } />
        <Route path='login' element={<LoginPage handleAuthentication={refreshAuthentication}/>}/>
        
      </Routes>
          
    </div>
  );
}

export default App;
