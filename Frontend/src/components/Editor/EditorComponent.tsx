import React from 'react';
import FileView from './FileView';
import Editor from './Editor';
import  {useFileContext} from '@/context/FileContext'

function EditorComponent() {

  const {activeFile} = useFileContext(); 

  return (
    <>  
         <span>{activeFile?.name}</span>
         <FileView />
    </>
   
  );
}

export default EditorComponent;
