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
        { isFolder: false, name: "file1" },
        { isFolder: false, name: "file2" }
      ]
    }
  ]   
};

function Folder({ element }: { element: Element }) {
  const [expand, setExpand] = useState(false);

  return (
    <div>
      <div 
        onClick={() => setExpand(!expand)} 
        className="p-2 cursor-pointer hover:bg-slate-700 flex items-center space-x-2"
      >
        <span>{element.isFolder ? '📂' : '📄'}</span>
        <span>{element.name}</span>
      </div>
      {element.isFolder && (
        <ul style={{ display: expand ? 'block' : 'none', paddingLeft: '1rem' }}>
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
  const [showInput, setShowInput] = useState(false); // Show/hide input field
  const [folderName, setFolderName] = useState('');
  const [currentElement, setCurrentElement] = useState(element);

  function handleAddFolder() {
    if (folderName.trim()) {
      const newFolder: Element = {
        isFolder: true,
        name: folderName,
        children: []
      };

      // Add the new folder to the root element
      const updatedElement = {
        ...currentElement,
        children: currentElement?.children
          ? [...currentElement.children, newFolder]
          : [newFolder]
      };

      setCurrentElement(updatedElement); // Update the folder structure
      setFolderName(''); // Clear the input field
      setShowInput(false); // Hide the input field
    }
  }

  return (
    <div className="w-64 h-screen bg-slate-800 text-white">
      {/* Toolbar */}
      <div className="flex justify-end p-2 border-b border-slate-700">
        <button 
          className="p-2 hover:bg-slate-700 rounded" 
          onClick={() => setShowInput((prev) => !prev)}
          title="New Folder"
        >
          <FolderPlus size={18} />
        </button>
        <button 
          className="p-2 hover:bg-slate-700 rounded" 
          title="New File"
        >
          <FilePlus size={18} />
        </button>
        <button 
          className="p-2 hover:bg-slate-700 rounded" 
          title="Collapse All"
        >
          <FolderClosed size={18} />
        </button>
      </div>

      {/* Folder Structure */}
      <div className="p-2">
        <Folder element={currentElement} />

        {/* Input Field for New Folder */}
        {showInput && (
          <div className="mt-4">
            <input 
              type="text" 
              className="w-full p-2 text-black rounded" 
              value={folderName} 
              onChange={(e) => setFolderName(e.target.value)} 
              placeholder="New Folder Name"
            />
            <div className="flex space-x-2 mt-2">
              <button 
                onClick={handleAddFolder} 
                className="p-2 bg-blue-500 text-white rounded w-full"
              >
                Add Folder
              </button>
              <button 
                onClick={() => setShowInput(false)} 
                className="p-2 bg-gray-500 text-white rounded w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Editor;
