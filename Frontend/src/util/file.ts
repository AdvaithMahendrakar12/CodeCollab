import {FileSystemItem} from '../types/FileTypes.ts';
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