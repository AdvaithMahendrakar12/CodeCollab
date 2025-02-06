import React, { useState } from 'react';
import { useFileContext } from '@/context/FileContext';
import { 
  FolderPlus, 
  FilePlus, 
  FolderClosed, 
  ChevronDown, 
  ChevronRight, 
  FolderOpen, 
  X,
  Edit,
  Trash
} from 'lucide-react';
import { FileSystemItem } from '@/types/FileTypes';
import SideBar from './SideBar';
import Editor from './Editor';

function Folder({ element, setSelectedItem }: { element: FileSystemItem, setSelectedItem: (id: string) => void }) {
  const { 
    toggleFolder, 
    updateFolder,
    renameFolder,
    deleteFolder,
    createFile,
    renameFile,
    deleteFile,
    openFile
  } = useFileContext();

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(element.name);

  const handleDragStart = (e: React.DragEvent, item: FileSystemItem) => {
    e.stopPropagation();
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const handleDrop = (e: React.DragEvent, targetFolder: FileSystemItem) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const droppedItem = JSON.parse(e.dataTransfer.getData('text/plain')) as FileSystemItem;
      if (droppedItem.id === targetFolder.id) return;
      
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

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (element.type === 'directory') {
      renameFolder(element.id, newName);
    } else {
      renameFile(element.id, newName);
    }
    setIsEditing(false);
  };

  const handleClick = () => {
    setSelectedItem(element.id); // Set the selected item when clicked
    if (element.type === 'directory') {
      toggleFolder(element.id);
    } else {
      openFile(element.id);
    }
  };

  const handleDelete = () => {
    if (element.type === 'directory') {
      deleteFolder(element.id);
    } else {
      deleteFile(element.id);
    }
  };

  return (
    <div
      draggable={true}
      onDragStart={(e) => handleDragStart(e, element)}
      onDrop={(e) => handleDrop(e, element)}
      onDragOver={(e) => e.preventDefault()}
      className="select-none"
    >
      <div className="flex items-center p-2 hover:bg-gray-700 group rounded-md">
        {isEditing ? (
          <form onSubmit={handleRename} className="flex items-center flex-grow">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-gray-800 text-gray-100 px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              onBlur={() => setIsEditing(false)}
            />
          </form>
        ) : (
          <>
            <div className="flex items-center flex-grow" onClick={handleClick}>
              <span className="mr-2">
                {element.type === "directory" && (
                  element.isOpen ? 
                    <ChevronDown size={16} className="text-gray-400" /> : 
                    <ChevronRight size={16} className="text-gray-400" />
                )}
              </span>
              <span className="mr-2">
                {element.type === "directory" ? (
                  element.isOpen ? 
                    <FolderOpen size={16} className="text-yellow-400" /> : 
                    <FolderClosed size={16} className="text-yellow-400" />
                ) : (
                  <FilePlus size={16} className="text-blue-400" />
                )}
              </span>
              <span className="text-gray-100">{element.name}</span>
            </div>
            <div className="hidden group-hover:flex items-center gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }} 
                className="p-1 hover:bg-gray-600 rounded text-gray-400 hover:text-gray-100"
              >
                <Edit size={14} />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }} 
                className="p-1 hover:bg-gray-600 rounded text-gray-400 hover:text-gray-100"
              >
                <Trash size={14} />
              </button>
            </div>
          </>
        )}
      </div>
      {element.type === "directory" && element.isOpen && (
        <ul className="pl-4">
          {element.children?.map((child: FileSystemItem) => (
            <li key={child.id}>
              <Folder element={child} setSelectedItem={setSelectedItem} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FileView() {
  const { nodes, createFolder, createFile, collapseFolders } = useFileContext();
  const [newItemName, setNewItemName] = useState('');
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // Track the selected item

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    // Use the selected item's ID if available, otherwise use the root ID
    const targetId = selectedItem || nodes.id;

    if (isCreatingFile) {
      createFile(targetId, newItemName);
    } else {
      createFolder(targetId, newItemName);
    }
    setNewItemName('');
  };
  
  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* File Explorer */}
      <div className="w-64 border-r border-gray-700 flex flex-col bg-gray-900">
        {/* Toolbar */}
        <div className="p-2 border-b border-gray-700 bg-gray-800">
          <form onSubmit={handleCreate} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder={`New ${isCreatingFile ? 'file' : 'folder'} name...`}
                className="flex-1 bg-gray-700 px-2 py-1 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="p-2 bg-blue-500 hover:bg-blue-600 rounded text-gray-100">
                {isCreatingFile ? <FilePlus size={18} /> : <FolderPlus size={18} />}
              </button>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsCreatingFile(false)}
                className={`flex-1 px-2 py-1 rounded ${
                  !isCreatingFile ? 'bg-blue-500 text-gray-100' : 'bg-gray-700 text-gray-400'
                }`}
              >
                Folder
              </button>
              <button
                type="button"
                onClick={() => setIsCreatingFile(true)}
                className={`flex-1 px-2 py-1 rounded ${
                  isCreatingFile ? 'bg-blue-500 text-gray-100' : 'bg-gray-700 text-gray-400'
                }`}
              >
                File
              </button>
              <button
                type="button"
                onClick={collapseFolders}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-400 hover:text-gray-100"
                title="Collapse All"
              >
                <X size={18} />
              </button>
            </div>
          </form>
        </div>

        {/* File Tree */}
        <div className="flex-1 overflow-y-auto bg-gray-800 p-2">
          <Folder element={nodes} setSelectedItem={setSelectedItem} />
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden bg-gray-800">
        <Editor />
      </div>
    </div>
  );
}

export default FileView;