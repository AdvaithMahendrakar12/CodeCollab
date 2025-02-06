

import Editor from './components/Editor/Editor';
import EditorComponent from './components/Editor/EditorComponent';
import FileView from './components/Editor/FileView';
import SideBar from './components/Editor/SideBar';
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
          <Route path="/editorPage" element={<EditorPage/>}/>
          <Route path='/test' element={<FileView/>}/>
          <Route path='/side' element={<SideBar/>}/>
          <Route path="/editor" element={<EditorComponent/>}/>
          
      </Routes>
    </Router>
      
      
    </>
  )
}

export default App;
