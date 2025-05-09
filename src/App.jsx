import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Title from './components/Title/Title'
import Registration from './components/Registration/Registration'
import Authorization from './components/Authorization/Authorization'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Title />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/authorization' element={<Authorization />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
