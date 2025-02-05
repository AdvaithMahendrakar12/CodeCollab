import {FileSystemItem} from '../types/FileTypes.ts';
import {Id} from '../types/FileTypes.ts';
import {v4 as uuidv4} from 'uuid';
const initialCode = `function sayHi() {
    console.log("👋 Hello world");
  }
  
  sayHi()`;

  
export const initialFileStructure: FileSystemItem = {
    name: "root",
    id: uuidv4(),
    type: "directory",
    children: [
        {
            id: uuidv4(),
            type: "file",
            name: "index.js",
            content: initialCode,
        },
    ],
}


export const getFileById = (id : Id,nodes : FileSystemItem): FileSystemItem | null => {
        const searchFile = (folder: FileSystemItem): FileSystemItem | null => {

            if(folder.id === id){
                return folder;
            }else if(folder.children){
                for(const child of folder.children){
                    const found = searchFile(child);
                    if(found){
                        return found;
                    }
                }
            }

            return null;
        }

        return searchFile(nodes);
}

export const getParentDir = (directory : FileSystemItem , parentDirId : Id):FileSystemItem | null=> {
    if (directory.id === parentDirId && directory.type === "directory") {
        return directory
    }

    if (directory.type === "directory" && directory.children) {
        for (const child of directory.children) {
            const found = getParentDir(child, parentDirId)
            if (found) {
                return found
            }
        }
    }

    // Return null if not found
    return null
}
export const isFileExist = (parentDir: FileSystemItem, name: string) => {
    if (!parentDir.children) return false
    return parentDir.children.some((file) => file.name === name)
}