import React from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto text-center">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-green-700 text-white text-3xl font-bold flex items-center justify-center mx-auto mb-4">
          {user?.name.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-1">{user?.name}</h2>
        <p className="text-gray-500 text-sm mb-6">{user?.email}</p>

        <div className="bg-gray-50 rounded-lg p-4 text-left mb-6 space-y-2">
          <div>
            <span className="text-xs text-gray-400 uppercase tracking-wide">Nome</span>
            <p className="text-gray-700 font-medium">{user?.name}</p>
          </div>
          <div>
            <span className="text-xs text-gray-400 uppercase tracking-wide">E-mail</span>
            <p className="text-gray-700 font-medium">{user?.email}</p>
          </div>
        </div>

        <Button onClick={logout} variant="secondary">
          Sair da conta
        </Button>
      </div>
    </main>
  );
};

export default ProfilePage;
