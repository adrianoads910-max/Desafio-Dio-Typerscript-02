import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import { validateEmail, validatePassword } from '../utils/auth';

const Card: React.FC = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Informe um e-mail válido.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('A senha deve ter no mínimo 6 caracteres, uma maiúscula e um número.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    const success = login(email, password);
    if (!success) {
      setLoginError('E-mail ou senha incorretos.');
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-green-700 mb-2 text-center">Bem-vindo ao DIO Bank</h2>
      <p className="text-gray-500 text-sm text-center mb-6">Faça login para acessar sua conta</p>

      <form onSubmit={handleSubmit} noValidate>
        {/* E-mail */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
              emailError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>

        {/* Senha */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
              passwordError ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>

        {loginError && (
          <div className="mb-4 bg-red-50 border border-red-300 text-red-600 text-sm rounded px-3 py-2">
            {loginError}
          </div>
        )}

        <Button type="submit">Entrar</Button>
      </form>

      <p className="text-xs text-gray-400 text-center mt-4">
        Credencial de teste: adriano@diobank.com / Dio@1234
      </p>
    </div>
  );
};

export default Card;
