
import React from "react";
import { useState } from "react";

import Floating from "../assets/Floating.png";
import Logo from "../assets/Logo.webp";
import { useNavigate } from "react-router-dom";


const Collaborate = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const generateRoomId = () => {
    const id = Math.random().toString(36).substring(2, 9);
    setRoomId(id);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-between">
        {/* Left side with illustration */}
        <div className="my-8 animate-up-down sm:my-0 sm:mr-10 ml-8">
         <img
            src={Floating}
            alt="Floating Illustration"
            className="mx-auto w-[250px] sm:w-[450px] drop-shadow-lg"
          />
        </div>

        {/* Right side with form */}
        <div className="w-500 lg:w-1/2 max-w-md mr-9">
          <div className="mb-8 flex items-center">
            <div className="w-8 h-8 mr-2">
              <svg viewBox="0 0 24 24" className="text-violet-400 fill-current">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 5V3m0 18v-2m7-7h2M3 12h2m12.7-7l1.4-1.4M4.9 19.1l1.4-1.4m0-12.7L4.9 4.9m14.2 14.2l-1.4-1.4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CodeCollab</h1>
              <p className="text-gray-400 text-sm">Code, Chat and Collaborate.</p>
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Room Id"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-400"
            />
            
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-400"
            />

            <button className="w-full py-3 bg-violet-600 hover:bg-sky-800 text-gray-900 font-semibold rounded-lg transition-colors" onClick={() => navigate(`/collaborate/${roomId}/${username}`)}>
              Join
            </button>

            <button
              onClick={generateRoomId}
              className="w-full text-violet-400 hover:text-sky-300 text-sm font-medium transition-colors"
            >
              Generate Unique Room Id
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaborate;