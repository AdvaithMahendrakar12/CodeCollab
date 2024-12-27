import React, { useState } from 'react';
import GlowyButton from '@/components/acertUI/GlowyButton';
import { CardContainer, CardBody, CardItem } from '@/components/acertUI/3d-card';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-900 flex justify-between items-center p-6 shadow-md sticky top-0 z-10">
        <h1 className="text-white text-3xl font-bold tracking-wide">CodePen</h1>
        <GlowyButton text={isLoggedIn ? "Log Out" : "Log In"} />
      </header>

      <div className="flex h-screen overflow-hidden">
        <aside className="w-1/5 bg-gray-900 text-white flex flex-col p-6 space-y-6">
          <img
            src="/assets/logo.png"
            alt="CodePen Logo"
            className="w-full h-auto rounded-lg mb-6"
          />
          <GlowyButton text="Start Coding" />
          <nav className="mt-8 flex flex-col space-y-4">
            <a href="#" className="hover:text-teal-300 transition-colors">Search Pens</a>
            <a href="#" className="hover:text-teal-300 transition-colors">Challenges</a>
            <a href="#" className="hover:text-teal-300 transition-colors">Spark</a>
            <a href="#" className="hover:text-teal-300 transition-colors">CodePen PRO</a>
          </nav>
        </aside>

        <main className="flex-1 relative overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-90"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-6">
            <h2 className="text-4xl font-bold text-white mb-6 text-center">Explore Features</h2>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* HTML Card */}
              <CardContainer containerClassName="flex justify-center">
                <CardBody>
                  <CardItem
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-8 rounded-xl shadow-2xl w-80"
                    translateZ={50}
                  >
                    <h3 className="text-2xl font-semibold">HTML Features</h3>
                    <p className="mt-2 text-sm">Write and test your HTML code with live previews.</p>
                  </CardItem>
                </CardBody>
              </CardContainer>

              {/* CSS Card */}
              <CardContainer containerClassName="flex justify-center">
                <CardBody>
                  <CardItem
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-xl shadow-2xl w-80"
                    translateZ={50}
                  >
                    <h3 className="text-2xl font-semibold">CSS Features</h3>
                    <p className="mt-2 text-sm">Style your designs with ease using powerful CSS tools.</p>
                  </CardItem>
                </CardBody>
              </CardContainer>

              {/* JavaScript Card */}
              <CardContainer containerClassName="flex justify-center">
                <CardBody>
                  <CardItem
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-8 rounded-xl shadow-2xl w-80"
                    translateZ={50}
                  >
                    <h3 className="text-2xl font-semibold">JavaScript Features</h3>
                    <p className="mt-2 text-sm">Experiment with JavaScript logic and animations live.</p>
                  </CardItem>
                </CardBody>
              </CardContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
