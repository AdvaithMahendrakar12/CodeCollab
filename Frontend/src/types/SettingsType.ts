
export interface Settings{
    theme: string
    language: string
    fontSize: number
    fontFamily: string

}
export  interface SettingContextType extends Settings{
    setTheme: (theme: string) => void
    setLanguage: (language: string) => void
    setFontSize: (fontSize: number) => void
    setFontFamily: (fontFamily: string) => void
    resetSettings: () => void
}