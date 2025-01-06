

import './App.css'
import Collaborate from './pages/Collaborate';
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

function App() {
 

  return (
    <>
    <Router>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/collaborate" element={<Collaborate/>}/>
      </Routes>
    </Router>
      
      
    </>
  )
}

export default App;
