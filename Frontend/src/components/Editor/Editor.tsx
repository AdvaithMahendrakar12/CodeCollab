import React from "react";
import { X } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { editorThemes } from "@/lib/themes";
import { useFileContext } from "@/context/FileContext";
import { useSettingContext } from "@/context/SettingContext";
import useResponsive from "@/hooks/useResponsive";

const Editor = () => {
  const { theme, fontSize } = useSettingContext();
  const { viewHeight } = useResponsive();
  const { activeFile, setActiveFile, openFiles, closeFile } = useFileContext();

  return (
    // <div className="flex flex-col flex-1 bg-slate-900 text-white">
      
    //   {/* Tab Bar for Open Files */}
    //   <div className="flex items-center space-x-2 px-2 py-1 bg-slate-800 border-b border-gray-700 overflow-auto">
    //     {openFiles.map((file) => (
    //       <div
    //         key={file.id}
    //         className={`flex items-center px-3 py-1 rounded-t-md cursor-pointer ${
    //           activeFile?.id === file.id ? "bg-slate-700 text-blue-400" : "bg-slate-600 text-gray-300"
    //         }`}
    //         onClick={() => setActiveFile(file)}
    //       >
    //         <span>{file.name}</span>
    //         <button
    //           className="ml-2 hover:text-red-500"
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             closeFile(file.id);
    //           }}
    //         >
    //           <X size={14} />
    //         </button>
    //       </div>
    //     ))}
    //   </div>

      <CodeMirror
        key={activeFile?.id} // Ensure it updates only when a new file is opened
        theme={editorThemes[theme]}
        value={activeFile?.content || ""}
        minHeight="100%"
        style={{ fontSize: `${fontSize}px`, height: viewHeight }}
    />

    // </div>
  );
};

export default Editor;
