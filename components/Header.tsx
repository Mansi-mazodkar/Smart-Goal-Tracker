import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-surface/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">✨ Smart Goal Tracker</h1>
          <p className="text-text-secondary">Your daily partner in achievement and reflection.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;