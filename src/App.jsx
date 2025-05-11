import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Title from './components/Title/Title'
import Registration from './components/Registration/Registration'
import Authorization from './components/Authorization/Authorization'
import UserDataContextProvider from './context/UserDataContext'
import MainPage from './components/MainPage/MainPage'

function App() {
  return (
    <>
      <Router>
        <UserDataContextProvider>
          <Routes>
            <Route path='/' element={<Title />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/authorization' element={<Authorization />} />
            <Route path='/main' element={<MainPage />} />
          </Routes>
        </UserDataContextProvider>
      </Router>
    </>
  )
}

export default App
