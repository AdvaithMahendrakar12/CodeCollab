

import FileView from './components/Editor/FileView';
import Collaborate from './pages/Collaborate';
import EditorPage from './pages/EditorPage';
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

function App() {
 

  return (
    <>
    <Router>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/collaborate" element={<Collaborate/>}/>
          <Route path="/editor" element={<EditorPage/>}/>
          <Route path='/test' element={<FileView/>}/>
      </Routes>
    </Router>
      
      
    </>
  )
}

export default App;
