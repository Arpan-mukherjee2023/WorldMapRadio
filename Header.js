import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md border-b-4 border-red-500 text-center">
      <h1 className="text-2xl font-bold">World Map Radio</h1>
      <p className="text-sm text-gray-300">Click anywhere on the map to listen live</p>
    </header>
  );
};

export default Header;
