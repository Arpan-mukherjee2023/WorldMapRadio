import React from 'react';
import Header from './Header.js'
import Footer from './Footer.js'
import WorldMap from './WorldMap.js'


function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <main className="flex-grow overflow-x-auto bg-gray-100 p-4">
        <WorldMap />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
