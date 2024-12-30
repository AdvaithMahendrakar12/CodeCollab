
import React, { useState } from 'react';
import GlowyButton from '@/components/acertUI/GlowyButton';
import { CardContainer, CardBody, CardItem } from '@/components/acertUI/3d-card';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigationLinks = [
    { title: 'Search Pens', icon: '🔍' },
    { title: 'Challenges', icon: '🏆' },
    { title: 'Spark', icon: '⚡' },
    { title: 'CodeCollab PRO', icon: '⭐' }
  ];

  const featureCards = [
    {
      title: 'HTML Features',
      description: 'Write and test your HTML code with live previews.',
      gradient: 'from-red-500 to-pink-500',
      position: 'top-10 left-10'
    },
    {
      title: 'CSS Features',
      description: 'Style your designs with ease using powerful CSS tools.',
      gradient: 'from-blue-500 to-purple-500',
      position: 'top-40 left-1/3'
    },
    {
      title: 'JavaScript Features',
      description: 'Experiment with JavaScript logic and animations live.',
      gradient: 'from-yellow-500 to-orange-500',
      position: 'top-60 left-[60%]  '
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-800 text-white flex flex-col p-6 space-y-6 shadow-lg">
        <div className="flex items-center justify-center p-4">
          <img
            src="../assets/logo.png"
            alt="CodePen Logo"
            // className="w-32 h-auto rounded-lg transition-transform hover:scale-105"
          />
        </div>

        <nav className="mt-8 flex flex-col space-y-4">
          {navigationLinks.map(({ title, icon }) => (
            <a
              key={title}
              href="#"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
              <span className="group-hover:text-teal-300 transition-colors">{title}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-700 flex justify-end items-center py-3 px-8 shadow-lg sticky top-0 z-10">
        <div className='hover:scale-105 transition-transform'>
            <GlowyButton 
                text={isLoggedIn ? "Log Out" : "Log In"} 
            
              />
        </div>
          
        </header>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-hidden">
          {/* Background with Overlay */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center transform scale-105"
              style={{
                backgroundImage: "url('https://images.pexels.com/photos/965345/pexels-photo-965345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
                filter: "blur(2px)"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-1">
            <h2 className="text-5xl font-bold text-white mb-6 text-center tracking-tight">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Features</span>
            </h2>

            <div className="relative h-full bottom-24">
              {featureCards.map((card) => (
                <CardContainer
                  key={card.title}
                  containerClassName={`absolute ${card.position} transform transition-all duration-300 hover:scale-105`}
                >
                  <CardBody>
                    <CardItem
                      className={`bg-gradient-to-r ${card.gradient} text-white p-8 rounded-xl shadow-2xl w-80 backdrop-blur-sm`}
                      translateZ={50}
                    >
                      <h3 className="text-2xl font-semibold">{card.title}</h3>
                      <p className="mt-3 text-sm opacity-90">{card.description}</p>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;