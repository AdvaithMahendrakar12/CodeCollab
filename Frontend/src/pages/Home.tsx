
// import React, { useState } from 'react';
// import GlowyButton from '@/components/acertUI/GlowyButton';
// import { CardContainer, CardBody, CardItem } from '@/components/acertUI/3d-card';

// const Home = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const navigationLinks = [
//     { title: 'Search Pens', icon: '🔍' },
//     { title: 'Challenges', icon: '🏆' },
//     { title: 'Spark', icon: '⚡' },
//     { title: 'CodeCollab PRO', icon: '⭐' }
//   ];

//   const featureCards = [
//     {
//       title: 'HTML Features',
//       description: 'Write and test your HTML code with live previews.',
//       gradient: 'from-red-500 to-pink-500',
//       position: 'top-10 left-10'
//     },
//     {
//       title: 'CSS Features',
//       description: 'Style your designs with ease using powerful CSS tools.',
//       gradient: 'from-blue-500 to-purple-500',
//       position: 'top-40 left-1/3'
//     },
//     {
//       title: 'JavaScript Features',
//       description: 'Experiment with JavaScript logic and animations live.',
//       gradient: 'from-yellow-500 to-orange-500',
//       position: 'top-60 left-[60%]  '
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-900 flex">
//       {/* Sidebar */}
//       <aside className="w-1/5 bg-gray-800 text-white flex flex-col p-6 space-y-6 shadow-lg">
//         <div className="flex items-center justify-center p-4">
//           <img
//             src="../assets/logo.png"
//             alt="CodePen Logo"
//             // className="w-32 h-auto rounded-lg transition-transform hover:scale-105"
//           />
//         </div>

//         <nav className="mt-8 flex flex-col space-y-4">
//           {navigationLinks.map(({ title, icon }) => (
//             <a
//               key={title}
//               href="#"
//               className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 group"
//             >
//               <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
//               <span className="group-hover:text-teal-300 transition-colors">{title}</span>
//             </a>
//           ))}
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="bg-gray-700 flex justify-end items-center py-3 px-8 shadow-lg sticky top-0 z-10">
//         <div className='hover:scale-105 transition-transform'>
//             <GlowyButton 
//                 text={isLoggedIn ? "Log Out" : "Log In"} 
            
//               />
//         </div>
          
//         </header>

//         {/* Main Content Area */}
//         <main className="flex-1 relative overflow-hidden">
//           {/* Background with Overlay */}
//           <div className="absolute inset-0 z-0">
//             <div
//               className="absolute inset-0 bg-cover bg-center transform scale-105"
//               style={{
//                 backgroundImage: "url('https://images.pexels.com/photos/965345/pexels-photo-965345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
//                 filter: "blur(2px)"
//               }}
//             />
//             <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90" />
//           </div>

//           {/* Content */}
//           <div className="relative z-10 p-1">
//             <h2 className="text-5xl font-bold text-white mb-6 text-center tracking-tight">
//               Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Features</span>
//             </h2>

//             <div className="relative h-full bottom-24">
//               {featureCards.map((card) => (
//                 <CardContainer
//                   key={card.title}
//                   containerClassName={`absolute ${card.position} transform transition-all duration-300 hover:scale-105`}
//                 >
//                   <CardBody>
//                     <CardItem
//                       className={`bg-gradient-to-r ${card.gradient} text-white p-8 rounded-xl shadow-2xl w-80 backdrop-blur-sm`}
//                       translateZ={50}
//                     >
//                       <h3 className="text-2xl font-semibold">{card.title}</h3>
//                       <p className="mt-3 text-sm opacity-90">{card.description}</p>
//                     </CardItem>
//                   </CardBody>
//                 </CardContainer>
//               ))}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Home;

import {useNavigate} from 'react-router-dom';
import { Users, Code, Zap, Check, Mail, MapPin, Phone, Twitter, Github, Linkedin } from 'lucide-react';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#111] text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="text-xl font-bold">CodeCollab</div>
        <div className="flex items-center gap-8">
          <a href="#" className="text-gray-300 hover:text-white">Home</a>
          <a href="#" className="text-gray-300 hover:text-white">Features</a>
          <a href="#" className="text-gray-300 hover:text-white">About</a>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center mt-24 px-4">
        <h1 className="text-6xl font-bold mb-4">
          Code Together,
          <br />
          <span className="text-indigo-600">Create Together</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-12">
          Choose your coding experience - collaborate in real-time with peers or code solo
          in our powerful editor.
        </p>

        {/* Choose Experience Cards */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="bg-[#222] p-8 rounded-lg w-96">
            <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Collaborative Coding</h3>
            <p className="text-gray-400 mb-6">Code with your team in real-time</p>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg w-full hover:bg-indigo-700" onClick={() => navigate('/collaborate')}>
              Start Collaborating
            </button>
          </div>

          <div className="bg-[#222] p-8 rounded-lg w-96">
            <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Code className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Solo Editor</h3>
            <p className="text-gray-400 mb-6">Code independently in our powerful editor</p>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg w-full hover:bg-indigo-700" onClick={() => navigate('/editor')}>
              Start Coding
            </button>
          </div>
        </div>

        {/* Instant Coding Notice */}
        <div className="flex items-center justify-center gap-2 text-gray-400 mb-24">
          <Zap className="w-5 h-5" />
          <span>Start coding instantly - no setup required</span>
        </div>

        {/* Features Section */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold mb-4">Powerful Features for Every Developer</h2>
          <p className="text-gray-400 text-xl mb-12">Everything you need for a seamless coding experience</p>

          <div className="flex justify-center gap-6">
            <div className="bg-gray-50 p-6 rounded-lg w-96">
              <div className="bg-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-black text-xl font-bold mb-2">Real-time Collaboration</h3>
              <p className="text-gray-600">Code together with your team in real-time. See changes instantly and collaborate seamlessly.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg w-96">
              <div className="bg-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-black text-xl font-bold mb-2">Smart Syntax Highlighting</h3>
              <p className="text-gray-600">Support for multiple programming languages with intelligent syntax highlighting.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg w-96">
              <div className="bg-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-black text-xl font-bold mb-2">Intelligent Auto-completion</h3>
              <p className="text-gray-600">Smart code suggestions and auto-completion to boost your productivity.</p>
            </div>
          </div>
        </div>

        {/* Editor Options Section */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold mb-4">Choose Your Coding Experience</h2>
          <p className="text-gray-400 text-xl mb-12">Whether you're coding solo or collaborating with a team, we've got you covered</p>

          <div className="flex justify-center gap-6">
            <div className="bg-[#222] p-8 rounded-lg w-96">
              <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-6">Collaborative Editor</h3>
              <div className="flex flex-col gap-4 mb-8 text-left">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-400">Real-time collaboration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-400">Live cursor tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-400">Team chat integration</span>
                </div>
              </div>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg w-full hover:bg-indigo-700" onClick={() => navigate('/collaborate')}>
                Start Collaborating
              </button>
            </div>

            <div className="bg-[#222] p-8 rounded-lg w-96">
              <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-6">Solo Editor</h3>
              <div className="flex flex-col gap-4 mb-8 text-left">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-400">Distraction-free coding</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-400">Local file support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-indigo-600" />
                  <span className="text-gray-400">Offline mode</span>
                </div>
              </div>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg w-full hover:bg-indigo-700" onClick={() => navigate('/editor')}>
                Start Coding
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-black text-center mb-4">
            How CodeCollab Works
          </h2>
          <p className="text-gray-600 text-xl text-center mb-16">
            Get started with CodeCollab in three simple steps
          </p>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-100" />

            {/* Step 1 */}
            <div className="relative flex items-start mb-24">
              <div className="w-1/2 pr-16 text-right">
                <div className="bg-[#5850EC] w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold absolute right-[-24px]">
                  1
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">Choose Your Mode</h3>
                <p className="text-gray-600">
                  Select between collaborative coding for team projects or solo mode
                  for individual work. Each mode is optimized for its specific use case.
                </p>
              </div>
              <div className="w-1/2 pl-16">
                <div className="bg-indigo-50 w-12 h-12 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-[#5850EC]" />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-start mb-24">
              <div className="w-1/2 pr-16"></div>
              <div className="w-1/2 pl-16">
                <div className="bg-[#5850EC] w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold absolute left-[-24px]">
                  2
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">Start Coding</h3>
                <p className="text-gray-600">
                  Jump right into our powerful editor with syntax highlighting, auto-completion,
                  and real-time collaboration features.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-start">
              <div className="w-1/2 pr-16 text-right">
                <div className="bg-[#5850EC] w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold absolute right-[-24px]">
                  3
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">Share & Collaborate</h3>
                <p className="text-gray-600">
                  Invite team members with a simple link, communicate through built-in
                  chat, and code together in real-time.
                </p>
              </div>
              <div className="w-1/2 pl-16">
                <div className="bg-indigo-50 w-12 h-12 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#5850EC]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-[#0F0F0F] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-[#1F1F1F] p-6 rounded-lg">
              <div className="flex flex-col items-center text-center">
                <Mail className="w-6 h-6 text-[#5850EC] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-gray-400">support@codecollab.com</p>
              </div>
            </div>
            <div className="bg-[#1F1F1F] p-6 rounded-lg">
              <div className="flex flex-col items-center text-center">
                <MapPin className="w-6 h-6 text-[#5850EC] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="text-gray-400">San Francisco, CA</p>
              </div>
            </div>
            <div className="bg-[#1F1F1F] p-6 rounded-lg">
              <div className="flex flex-col items-center text-center">
                <Phone className="w-6 h-6 text-[#5850EC] mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phone</h3>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0F0F0F] py-16 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-10">
            {/* Brand Column */}
            <div className="col-span-1">
              <h2 className="text-xl font-bold mb-4">CodeCollab</h2>
              <p className="text-gray-400 mb-4">
                Empowering developers to code together in real-time.
                Build better software with seamless collaboration.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
    
  );
}
export default Home;