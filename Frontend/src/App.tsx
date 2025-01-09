

import Collaborate from './pages/Collaborate';
import Editor from './pages/Editor';
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

function App() {
 

  return (
    <>
    <Router>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/collaborate" element={<Collaborate/>}/>
          <Route path="/editor" element={<Editor/>}/>
      </Routes>
    </Router>
      
      
    </>
  )
}

export default App;
