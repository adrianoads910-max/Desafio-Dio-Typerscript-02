import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/Card';
import ProfilePage from '../pages/ProfilePage';
import { AuthContext } from '../context/AuthContext';
import { AuthContextType } from '../types';

// ─── Helpers ────────────────────────────────────────────────────────────────

function renderWithAuth(ui: React.ReactElement, contextValue: Partial<AuthContextType>) {
  const defaultContext: AuthContextType = {
    user: null,
    login: jest.fn(),
    logout: jest.fn(),
    isAuthenticated: false,
    ...contextValue,
  };
  return render(
    <AuthContext.Provider value={defaultContext}>{ui}</AuthContext.Provider>
  );
}

// ─── Card (Login Form) ───────────────────────────────────────────────────────

describe('Card (formulário de login)', () => {
  it('deve renderizar os campos de e-mail e senha', () => {
    renderWithAuth(<Card />, {});
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
  });

  it('deve exibir erro de e-mail inválido ao submeter', () => {
    renderWithAuth(<Card />, {});
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
    expect(screen.getByText(/informe um e-mail válido/i)).toBeInTheDocument();
  });

  it('deve exibir erro de senha fraca ao submeter', () => {
    renderWithAuth(<Card />, {});
    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'adriano@diobank.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));
    expect(screen.getByText(/senha deve ter/i)).toBeInTheDocument();
  });

  it('deve chamar login com e-mail e senha corretos', () => {
    const mockLogin = jest.fn().mockReturnValue(true);
    renderWithAuth(<Card />, { login: mockLogin });

    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'adriano@diobank.com' },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'Dio@1234' },
    });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(mockLogin).toHaveBeenCalledWith('adriano@diobank.com', 'Dio@1234');
  });

  it('deve exibir mensagem de erro quando login falhar', () => {
    const mockLogin = jest.fn().mockReturnValue(false);
    renderWithAuth(<Card />, { login: mockLogin });

    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'adriano@diobank.com' },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'SenhaErrada1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(screen.getByText(/e-mail ou senha incorretos/i)).toBeInTheDocument();
  });
});

// ─── ProfilePage ──────────────────────────────────────────────────────────────

describe('ProfilePage', () => {
  const mockUser = { name: 'Adriano Silva', email: 'adriano@diobank.com' };

  it('deve exibir o nome do usuário logado', () => {
    renderWithAuth(<ProfilePage />, { user: mockUser, isAuthenticated: true });
    expect(screen.getByText('Adriano Silva')).toBeInTheDocument();
  });

  it('deve exibir o e-mail do usuário logado', () => {
    renderWithAuth(<ProfilePage />, { user: mockUser, isAuthenticated: true });
    expect(screen.getAllByText('adriano@diobank.com').length).toBeGreaterThan(0);
  });

  it('deve chamar logout ao clicar em "Sair da conta"', () => {
    const mockLogout = jest.fn();
    renderWithAuth(<ProfilePage />, { user: mockUser, logout: mockLogout, isAuthenticated: true });
    fireEvent.click(screen.getByRole('button', { name: /sair da conta/i }));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
