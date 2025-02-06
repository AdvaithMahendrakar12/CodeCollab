import React from 'react'
import  FileContextProvider  from './FileContext'
import SettingContextProvider from './SettingContext'

function AppProvider({children} : {children: React.ReactNode}) {
  return (
    <SettingContextProvider>
        <FileContextProvider>
            {children}
        </FileContextProvider>
    </SettingContextProvider>
  )
}

export default AppProvider
