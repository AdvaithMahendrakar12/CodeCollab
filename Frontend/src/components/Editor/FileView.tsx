import React from 'react';
import { useFileContext } from '@/context/FileContext';
import { FolderPlus, FilePlus, FolderClosed, ChevronDown, ChevronRight, FolderOpen, X } from 'lucide-react';
import { FileSystemItem } from '@/types/FileTypes';

function Folder({ element }: { element: FileSystemItem }) {
  const { toggleFolder, updateFolder } = useFileContext();

  const handleDragStart = (e: React.DragEvent, item: FileSystemItem) => {
    e.stopPropagation();
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const handleDrop = (e: React.DragEvent, targetFolder: FileSystemItem) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const droppedItem = JSON.parse(e.dataTransfer.getData('text/plain')) as FileSystemItem;
      
      // Don't allow dropping into itself
      if (droppedItem.id === targetFolder.id) return;
      
      // Create new children array with dragged item
      const newChildren = [...(targetFolder.children || [])];
      const itemExists = newChildren.some(child => child.id === droppedItem.id);
      
      if (!itemExists) {
        newChildren.push(droppedItem);
        updateFolder(targetFolder.id, newChildren);
      }
    } catch (error) {
      console.error('Error handling drop:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      draggable={true}
      onDragStart={(e) => handleDragStart(e, element)}
      onDrop={(e) => handleDrop(e, element)}
      onDragOver={handleDragOver}
      className="select-none"
    >
      <div 
        onClick={() => toggleFolder(element.id)} 
        className="flex items-center p-2 cursor-pointer hover:bg-slate-700 group"
      >
        <span className="mr-2">
          {element.type === "directory" && (
            element.isOpen ? 
              <ChevronDown size={16} className="text-slate-400" /> : 
              <ChevronRight size={16} className="text-slate-400" />
          )}
        </span>
        <span className="mr-2">
          {element.type === "directory" ? (
            element.isOpen ? 
              <FolderOpen size={16} className="text-yellow-500" /> : 
              <FolderClosed size={16} className="text-yellow-500" />
          ) : (
            <FilePlus size={16} className="text-blue-400" />
          )}
        </span>
        <span className="flex-grow">{element.name}</span>
      </div>
      {element.type === "directory" && element.isOpen && (
        <ul className="pl-4">
          {element.children?.map((child: FileSystemItem) => (
            <li key={child.id}>
              <Folder element={child} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FileView() {
  const { nodes, createFolder, collapseFolders } = useFileContext();

  const handleCreateFolder = () => {
    const folderName = `New Folder ${Math.floor(Math.random() * 1000)}`;
    createFolder(nodes.id, folderName);
  };

  return (
    <div className="w-64 h-screen bg-slate-800 text-white flex flex-col">
      {/* Toolbar */}
      <div className="flex justify-between p-2 border-b border-slate-700">
        <button
          className="p-2 hover:bg-slate-700 rounded"
          onClick={collapseFolders}
          title="Collapse All"
        >
          <X size={18} />
        </button>
        <button
          className="p-2 hover:bg-slate-700 rounded"
          onClick={handleCreateFolder}
          title="New Folder"
        >
          <FolderPlus size={18} />
        </button>
      </div>
      
      {/* File Tree */}
      <div className="flex-1 overflow-auto p-2">
        <Folder element={nodes} />
      </div>
    </div>
  );
}

export default FileView;