import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Title from './components/Title/Title'
import Registration from './components/Registration/Registration'
import Authorization from './components/Authorization/Authorization'
import UserDataContextProvider from './context/UserDataContext'
import type { JSX } from 'react'
import MainPage from './components/MainPage/MainPage'
import ProfileEditor from './components/ProfileEditor/ProfileEditor'
import Game from './components/Game/Game'
import GameDataContextProvider from './context/GameDataContext'

function App(): JSX.Element {
  return (
    <>
      <Router>
        <UserDataContextProvider>
          <Routes>
            <Route path='/' element={<Title />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/authorization' element={<Authorization />} />
            <Route path='/main' element={<MainPage />} />
            <Route path='/profileEditor/*' element={<ProfileEditor />} />
            <Route path='/game' element={
              <GameDataContextProvider>
                <Game />
              </GameDataContextProvider>
            } />
          </Routes>
        </UserDataContextProvider>
      </Router>
    </>
  )
}

export default App
