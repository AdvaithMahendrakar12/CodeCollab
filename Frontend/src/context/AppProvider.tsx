import React from 'react'
import  FileContextProvider  from './FileContext'

function AppProvider({children} : {children: React.ReactNode}) {
  return (
        <FileContextProvider>
            {children}
        </FileContextProvider>
  )
}

export default AppProvider
