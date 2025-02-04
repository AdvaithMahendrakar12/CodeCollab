
type FileName = string
type FileContent = string

export interface FileSystemItem {
    id: string
    name: FileName
    type: "file" | "directory"
    children?: FileSystemItem[]
    content?: FileContent
    isOpen?: boolean
}

export type FileContextType = {
    fileSystem: FileSystemItem[]
    setFileSystem: React.Dispatch<React.SetStateAction<FileSystemItem[]>>
    currentFile: FileSystemItem | null
    setCurrentFile: React.Dispatch<React.SetStateAction<FileSystemItem | null>>
    createFile: (name: FileName, type: "file" | "directory") => void
    deleteFile: (id: string) => void
    updateFile: (id: string, content: FileContent) => void
    openFile: (id: string) => void
    closeFile: (id: string) => void
    renameFile: (id: string, name: FileName) => void
}



