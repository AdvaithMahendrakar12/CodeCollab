
import React from 'react'
import { createContext } from 'react';
import { AppContextType } from '../types/Apps.ts';


function AppContext() {

    const AppContext = createContext<AppContextType|null>(null);
    return (
        <div>
        
        </div>
    )
}

export default AppContext
