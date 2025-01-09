import React, { useState } from 'react';
import { FolderPlus, FilePlus, FolderClosed } from 'lucide-react';

type Element = {
  isFolder: boolean;
  name: string;
  children?: Element[];
};

const defaultElement: Element = {
  isFolder: true,
  name: "root",
  children: [
    {
      isFolder: true,
      name: "folder1",
      children: [
        {
          isFolder: false,
          name: "file1"
        },
        {
          isFolder: false,
          name: "file2"
        }
      ]
    }
  ]
};

function Folder({ element }: { element: Element }) {
  const [expand, setExpand] = useState(false);

  return (
    <div>
      <div onClick={() => setExpand(!expand)} className="p-2 cursor-pointer hover:bg-slate-700">
        <span>{element.name}</span>
      </div>
      {element.isFolder && (
        <ul style={{ display: expand ? 'block' : 'none' }}>
          {element.children?.map((child, index) => (
            <li key={index}>
              <Folder element={child} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Editor({ element = defaultElement }: { element?: Element }) {
  function createFolder() {}
  function createFile() {}
  function collapseAll() {}

  return (
    <div className="w-64 h-screen bg-slate-800 text-white">
      {/* Toolbar */}
      <div className='flex justify-end p-2 border-b border-slate-700'>
        <button 
          className="p-2 hover:bg-slate-700 rounded" 
          onClick={createFolder}
          title="New Folder"
        >
          <FolderPlus size={18} />
        </button>
        <button 
          className="p-2 hover:bg-slate-700 rounded" 
          onClick={createFile}
          title="New File"
        >
          <FilePlus size={18} />
        </button>
        <button 
          className="p-2 hover:bg-slate-700 rounded" 
          onClick={collapseAll}
          title="Collapse All"
        >
          <FolderClosed size={18} />
        </button>
      </div>
      <div className="p-2">
        <Folder element={element} />
      </div>
    </div>
  );
}

export default Editor;