import React from 'react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'DIO Bank' }) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-green-700 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold tracking-wide">{title}</h1>
      {isAuthenticated && (
        <button
          onClick={logout}
          className="bg-white text-green-700 font-semibold px-4 py-1 rounded hover:bg-green-100 transition"
        >
          Sair
        </button>
      )}
    </header>
  );
};

export default Header;
