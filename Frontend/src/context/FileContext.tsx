import React , {useCallback, useState} from 'react'
import { createContext } from 'react'

import { FileContextType,FileSystemItem } from '../types/FileTypes'; 




export const FileContext = createContext<FileContextType|null>(null);


function FileProviderWrapper({children}: {children: React.ReactNode}) {
 
    const [nodes , setNodes] = useState<FileSystemItem>(); 

    // create a file

    
    return (
        <FileContext.Provider value={{}}>
            {children}
        </FileContext.Provider>
    )
}

export default FileProviderWrapper; 
