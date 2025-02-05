
export type FileName = string
type FileContent = string
export type Id = string

export interface FileSystemItem {
    id: string
    name: FileName
    type: "file" | "directory"
    children?: FileSystemItem[]
    content?: FileContent
    isOpen?: boolean
}

export interface FileContextType {
    nodes: FileSystemItem
    openFiles: FileSystemItem[]
    activeFile: FileSystemItem | null
    setActiveFile: (file: FileSystemItem) => void
    closeFile: (fileId: Id) => void
    toggleFolder: (dirId: Id) => void
    collapseFolders: () => void
    createFolder: (parentDirId: Id, name: FileName) => Id
    updateFolder: (dirId: Id, children: FileSystemItem[]) => void
    renameFolder: (dirId: Id, newName: FileName) => void
    deleteFolder: (dirId: Id) => void
    createFile: (parentDirId: Id, name: FileName) => Id
    updateFileContent: (fileId: Id, content: FileContent) => void
    openFile: (fileId: Id) => void
    renameFile: (fileId: Id, newName: FileName) => boolean
    deleteFile: (fileId: Id) => void
    // downloadFilesAndFolders: () => void
}



