import React from 'react'
import { createContext } from 'react'
import { FileContextType } from '../types/FIleTypes'



const FileContext = createContext<FileContextType>(null); 


function FileProvider({children}: {children: React.ReactNode}) {
    
    return (
        <FileContext.Provider value={{}}>
            {children}
        </FileContext.Provider>
    )
}

export default FileProvider; 
