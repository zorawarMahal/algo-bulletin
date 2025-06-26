import Dashboard from './pages/Dashboard'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
