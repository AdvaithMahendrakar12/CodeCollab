import React from 'react';
import { MessageCircleIcon, Files } from 'lucide-react';

function SideBar() {
  return (
    <div className="w-16 h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4 flex flex-col items-center gap-6 border-r border-gray-700">
      <Files size="24" className="text-gray-400 cursor-pointer hover:text-blue-400 transition-colors duration-200" />
      <MessageCircleIcon size="24" className="text-gray-400 cursor-pointer hover:text-blue-400 transition-colors duration-200" />
    </div>
  );
}

export default SideBar;