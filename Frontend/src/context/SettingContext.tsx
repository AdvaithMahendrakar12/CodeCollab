
import React, { useEffect,useState } from 'react'
import { createContext } from 'react'
import { SettingContextType,Settings} from '@/types/SettingsType';
import useLocalStorage from '@/hooks/useLocalStorage';


export const SettingContext = createContext<SettingContextType|null>(null); 

export const useSettingContext = (): SettingContextType=> {
    const context = React.useContext(SettingContext);
    if(!context) throw new Error('useSettingContext must be used within a SettingContextProvider');

    return context;

}
const defaultSettings: Settings = {
    theme: "Dracula",
    language: "Javascript",
    fontSize: 16,
    fontFamily: "Space Mono",
   
}
function SettingContextProvider({children}: {children: React.ReactNode}) {

    const {getItem} = useLocalStorage();
    
    const storedSettings = JSON.parse(getItem('settings') || '{}');

    const storedTheme =
    storedSettings.theme !== undefined
        ? storedSettings.theme
        : defaultSettings.theme
    const storedLanguage =
        storedSettings.language !== undefined
            ? storedSettings.language
            : defaultSettings.language
    const storedFontSize =
        storedSettings.fontSize !== undefined
            ? storedSettings.fontSize
            : defaultSettings.fontSize
    const storedFontFamily =
        storedSettings.fontFamily !== undefined
            ? storedSettings.fontFamily
            : defaultSettings.fontFamily


    const [theme, setTheme] = useState<string>(storedTheme)
    const [language, setLanguage] = useState<string>(storedLanguage)
    const [fontSize, setFontSize] = useState<number>(storedFontSize)
    const [fontFamily, setFontFamily] = useState<string>(storedFontFamily)



    const resetSettings = () => {
        setTheme(defaultSettings.theme)
        setLanguage(defaultSettings.language)
        setFontSize(defaultSettings.fontSize)
        setFontFamily(defaultSettings.fontFamily); 

    }

    useEffect(() => {

        const updatedSettings = {
            theme,
            language,
            fontSize,
            fontFamily
        }

        localStorage.setItem('settings', JSON.stringify(updatedSettings)); 
        
    }, [theme,language,fontFamily,fontSize])
  return (
    <SettingContext.Provider value={{theme,setTheme,language, setLanguage,fontSize,setFontSize,fontFamily,setFontFamily,resetSettings}}>
        {children}
    </SettingContext.Provider>
  )
}

export default SettingContextProvider
