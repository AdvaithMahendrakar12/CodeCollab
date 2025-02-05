import React, { useCallback, useState, createContext,useContext } from 'react';
import { v4 as uuidv4 } from "uuid";
import {FileSystemItem,Id ,FileContextType,FileName,FileContent} from '../types/FileTypes'; 
import { toast } from 'react-hot-toast';
import { initialFileStructure,getFileById,getParentDir,isFileExist } from '@/util/file';


export const FileContext = createContext<FileContextType | null>(null);

export const useFileContext = ():FileContextType =>{
    const context = useContext(FileContext);
    if (!context) {
        throw new Error('useFileContext must be used within a FileProvider');
    }
    return context;
}

function FileContextProvider({ children }: { children: React.ReactNode }) {
  const [nodes, setNodes] = useState<FileSystemItem>(initialFileStructure);
  const initialOpenFiles = nodes.children
        ? nodes.children
        : [];
  const [openFiles, setOpenFiles] = useState<FileSystemItem[]>(initialOpenFiles);
  const [activeFile, setActiveFile] = useState<FileSystemItem | null>(null);

  // Function to create a new folder
  const createFolder = useCallback((parentDir: string, newDir: FileSystemItem | string) => {
    let newFolder: FileSystemItem;
    
    if (typeof newDir === "string") {
      newFolder = {
        id: uuidv4(),
        type: "directory",
        name: newDir,
        children: [],
        isOpen: false
      };
    } else {
      newFolder = newDir;
    }

    if (!parentDir) parentDir = nodes.id;

    const addDirectoryToParent = (folder: FileSystemItem): FileSystemItem => {
      if (folder.id === parentDir) {
        return {
          ...folder,
          children: [...(folder.children || []), newFolder]
        };
      } else if (folder.children) {
        return {
          ...folder,
          children: folder.children.map(addDirectoryToParent)
        };
      } else {
        return folder;
      }
    };

    setNodes((prev) => addDirectoryToParent(prev)); 

    return newFolder.id;
  }, [nodes]);

  const toggleFolder = (dirId: Id) => {
        const toggle = (folder: FileSystemItem): FileSystemItem => {
            if(folder.id == dirId){
              return {
                  ...folder,
                  isOpen: !folder.isOpen
              }
            }else if(folder.children){
              return {
                  ...folder,
                  children : folder.children.map(toggle)
              }
            }else{
              return folder;
            }
        }
        setNodes((prev) => toggle(prev));
  };
  
  const collapseFolders = () =>{
    const folders = (folder: FileSystemItem): FileSystemItem => { 
        return {
           ...folder,
            isOpen: false,
            children : folder.children?.map(folders)
        }

        
    }
    setNodes((prev) => folders(prev));  
  }

  const updateFolder = useCallback((dirId: Id, children: FileSystemItem[]) => {
       if(!dirId) dirId = nodes.id;
       const updateChildren = (folder: FileSystemItem): FileSystemItem => {
            if(folder.id == dirId){
                return {
                    ...folder,
                    children
                }
            }else if(folder.children){
                return {
                    ...folder,
                    children: folder.children.map(updateChildren)
                }
            }else{
                return folder;
            }
        }
        setNodes((prev) => updateChildren(prev));

        setOpenFiles([]);

        setActiveFile(null);
        if (dirId === nodes.id) {
          toast.dismiss()
          toast.success("Files and folders updated")
      }
  }, [nodes.id]);


  const renameFolder = useCallback((dirId: Id, newName: FileName) : boolean => {
    const rename = (folder: FileSystemItem): FileSystemItem | null => {
      if(folder.type == "directory" && folder.children){
          const isDuplicate = folder.children.some((child) => 
            child.name === newName &&
           child.id !== dirId && child.type === "directory") ;

           if(isDuplicate){
                toast.error("Folder already exists")
                return null;  
           }

           return {
              ...folder, 
              children: folder.children.map((child) => {
                  if(child.id == dirId){
                      return {
                          ...child,
                          name: newName
                      }
                  }else if(folder.children){
                      const recursion = rename(child);
                      return{
                         ...child,
                         children: recursion ? recursion.children : child.children
                  }
                  }else{
                      return child;
                  }
              })
           }

      }else{
        return folder;
      }
  
    };
    const updatedChildren = rename(nodes);
      if(updatedChildren == null) return false;

      setNodes((prev) => updatedChildren || prev);
    

    return true; 
  }, [nodes,setNodes]);

  const deleteFolder = useCallback((dirId: Id) => { 
    const deleteDir = (folder: FileSystemItem): FileSystemItem | null => {
          if(folder.type === "directory" && folder.id === dirId){
              return null;
          }else if(folder.children){
              
              const updatedChildren =folder.children.map(deleteDir).filter((child) => child !== null) as FileSystemItem[];
              return {
                  ...folder,
                  children: updatedChildren
              }
          }else{
            return folder;
          }
    }
  },[nodes,setNodes]);

  const updateFileContent = useCallback((fileId: Id, newContent: string) => {
      const updateFile = (folder: FileSystemItem): FileSystemItem => {
          if(folder.type === "file" && folder.id ===fileId){
              return {
                  ...folder,
                  content: newContent
              }
          }else if(folder.children){
              return {
                  ...folder,
                  children: folder.children.map(updateFile)
              }
          }else{
            return folder;
          }
      }

      setNodes((prev) => updateFile(prev));
      if(openFiles.some((file) => file.id === fileId)){
          setOpenFiles((prev) => prev.map((file) => file.id === fileId ? {...file,content: newContent} : file));
      }
  },[openFiles]);
  const openFile = (fileId: Id) => {
    
          const file = getFileById(fileId,nodes);

          if(file){
              updateFileContent(fileId,file.content || "");

              if(!openFiles.some((f) => f.id === fileId)){
                  setOpenFiles((prev) => [...prev,file]);
              }
              setOpenFiles((prevOpenFiles) =>
                prevOpenFiles.map((file) => {
                    if (file.id === activeFile?.id) {
                        return {
                            ...file,
                            content: activeFile.content || "",
                        }
                    } else {
                        return file
                    }
                }),
            )              
          setActiveFile(file);
          }

  }

  const closeFile = (fileId: Id) => {
    if(activeFile?.id === fileId){
        updateFileContent(fileId,activeFile.content || "");
        const findFile = openFiles.findIndex((file) => file.id === fileId);
        if(findFile !== -1 && openFiles.length > 1){
          if(findFile > 0){
              setActiveFile(openFiles[findFile -1]);
          }else{
              setActiveFile(openFiles[findFile + 1]);
          }
        }else{
          setActiveFile(null);
        }
        
    }
    setOpenFiles((prev) => prev.filter((file) => file.id !== fileId));
  
  }

  const createFile = useCallback((parentDirId: Id, file: FileName | FileSystemItem) :Id => {

      if(!parentDirId) parentDirId = nodes.id;
      const parentDir = getParentDir(nodes,parentDirId);
      if(!parentDir)  throw new Error("Parent directory not found");


      let newFile: FileSystemItem ;
      let num = 1; 
      if(typeof file === "string"){
          let name = file; 
          let fileExists = isFileExist(parentDir,name);
          while (fileExists) {
            name = `${name.split(".")[0]}(${num}).${name.split(".")[1]}`
            fileExists = isFileExist(parentDir, name)
            num++
          }
          newFile = {
              id: uuidv4(),
              type: "file",
              name,
              content: ""
          }
        }else{
          newFile = file;
        }
        const updateDirectory = (
          directory: FileSystemItem,
               ): FileSystemItem => {
          if (directory.id === parentDir.id) {
              // If directory matches parentDir, return updated directory with new file
              return {
                  ...directory,
                  children: [...(directory.children || []), newFile],
                  isOpen: true,
              }
          } else if (directory.children) {
              // If directory has children, recursively update each child
              return {
                  ...directory,
                  children: directory.children.map(updateDirectory),
              }
          } else {
              // Otherwise, return unchanged directory
              return directory
          }
      }


      setNodes((prev) => updateDirectory(prev));
      setOpenFiles((prev) => [...prev,newFile]);
      setActiveFile(newFile);

      return newFile.id;
  },[nodes]);


  const renameFile  = useCallback((fileId: Id, newName: FileName) : boolean => {

      const renameInDirectory = (
        directory: FileSystemItem,
    ): FileSystemItem => {
        if (directory.type === "directory" && directory.children) {
            return {
                ...directory,
                children: directory.children.map((item) => {
                    if (item.type === "file" && item.id === fileId) {
                        return {
                            ...item,
                            name: newName,
                        }
                    } else {
                        return item
                    }
                }),
            }
        } else {
            return directory
        }
    }
    setNodes((prev) => renameInDirectory(prev));
    setOpenFiles((prevOpenFiles) =>
      prevOpenFiles.map((file) => {
          if (file.id === fileId) {
              return {
                  ...file,
                  name: newName,
              }
          } else {
              return file
          }
      }),
    )
    if (fileId === activeFile?.id) {
      setActiveFile((prevActiveFile) => {
          if (prevActiveFile) {
              return {
                  ...prevActiveFile,
                  name: newName,
              }
          } else {
              return null
          }
      })
    }


    return true; 

  },[activeFile?.id]);

  const deleteFile = useCallback(
    (fileId: string) => {
        
        const deleteFileFromDirectory = (
            directory: FileSystemItem,
        ): FileSystemItem => {
            if (directory.type === "directory" && directory.children) {
                const updatedChildren = directory.children
                    .map((child) => {
                        // Recursively process directories
                        if (child.type === "directory") {
                            return deleteFileFromDirectory(child)
                        }
                        // Filter out the file with matching id
                        if (child.id !== fileId) {
                            return child
                        }
                        return null
                    })
                    .filter((child) => child !== null)

                // Return updated directory with filtered children
                return {
                    ...directory,
                    children: updatedChildren as FileSystemItem[],
                }
            } else {
                // If it's not a directory or doesn't have children, return as is
                return directory
            }
        }

        setNodes((prevFileStructure) =>
            deleteFileFromDirectory(prevFileStructure),
        )

        if (openFiles.some((file) => file.id === fileId)) {
            setOpenFiles((prevOpenFiles) =>
                prevOpenFiles.filter((file) => file.id !== fileId),
            )
        }

        if (activeFile?.id === fileId) {
            setActiveFile(null)
        }

        toast.success("File deleted successfully")

    },
    [activeFile?.id, openFiles],
  )
  const handleFileStructureSync = useCallback(
    ({
        fileStructure,
        openFiles,
        activeFile,
    }: {
        fileStructure: FileSystemItem
        openFiles: FileSystemItem[]
        activeFile: FileSystemItem | null
    }) => {
        setNodes(fileStructure)
        setOpenFiles(openFiles)
        setActiveFile(activeFile)
        toast.dismiss()
    },
    [],)

  //   const handleDirCreated = useCallback(
  //     ({
  //         parentDirId,
  //         newDirectory,
  //     }: {
  //         parentDirId: Id
  //         newDirectory: FileSystemItem
  //     }) => {
  //         createFolder(parentDirId, newDirectory)
  //     },
  //     [createFolder],
  // )

  // const handleDirUpdated = useCallback(
  //     ({ dirId, children }: { dirId: Id; children: FileSystemItem[] }) => {
  //         updateFolder(dirId, children)
  //     },
  //     [updateFolder],
  // )

  // const handleDirRenamed = useCallback(
  //     ({ dirId, newName }: { dirId: Id; newName: FileName }) => {
  //         renameFolder(dirId, newName)
  //     },
  //     [renameFolder],
  // )

  // const handleDirDeleted = useCallback(
  //     ({ dirId }: { dirId: Id }) => {
  //         deleteFolder(dirId)
  //     },
  //     [deleteFolder],
  // )

  // const handleFileCreated = useCallback(
  //     ({
  //         parentDirId,
  //         newFile,
  //     }: {
  //         parentDirId: Id
  //         newFile: FileSystemItem
  //     }) => {
  //         createFile(parentDirId, newFile)
  //     },
  //     [createFile],
  // )

  // const handleFileUpdated = useCallback(
  //     ({ fileId, newContent }: { fileId: Id; newContent: FileContent }) => {
  //         updateFileContent(fileId, newContent)
  //         // Update the content of the active file if it's the same file
  //         if (activeFile?.id === fileId) {
  //             setActiveFile({ ...activeFile, content: newContent })
  //         }
  //     },
  //     [activeFile, updateFileContent],
  // )

  // const handleFileRenamed = useCallback(
  //     ({ fileId, newName }: { fileId: string; newName: FileName }) => {
  //         renameFile(fileId, newName)
  //     },
  //     [renameFile],
  // )

  // const handleFileDeleted = useCallback(
  //     ({ fileId }: { fileId: Id }) => {
  //         deleteFile(fileId)
  //     },
  //     [deleteFile],
  // )

  return (
    <FileContext.Provider value={{ nodes, openFiles,activeFile,setActiveFile,createFolder,toggleFolder,collapseFolders,
    updateFolder,renameFolder,deleteFolder,
    updateFileContent,openFile,closeFile,createFile,deleteFile,renameFile }}>
      {children}
    </FileContext.Provider>
  );
}

export default FileContextProvider;
