import { LoginCredentials, User } from '../types';

// Usuário mock – em produção viria de uma API
export const MOCK_USER: User & { password: string } = {
  name: 'Adriano Silva',
  email: 'adriano@diobank.com',
  password: 'Dio@1234',
};

/**
 * Valida se o e-mail tem formato correto.
 */
export function validateEmail(email: string): boolean {
  if (!email || email.trim() === '') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Valida se a senha atende os requisitos mínimos:
 * - mínimo 6 caracteres
 * - pelo menos uma letra maiúscula
 * - pelo menos um número
 */
export function validatePassword(password: string): boolean {
  if (!password || password.length < 6) return false;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasUpperCase && hasNumber;
}

/**
 * Verifica as credenciais contra o usuário mock.
 * Retorna o User sem senha em caso de sucesso, ou null em caso de falha.
 */
export function authenticate(credentials: LoginCredentials): User | null {
  const { email, password } = credentials;

  if (!validateEmail(email)) return null;
  if (!validatePassword(password)) return null;

  if (
    email.trim().toLowerCase() === MOCK_USER.email.toLowerCase() &&
    password === MOCK_USER.password
  ) {
    return { name: MOCK_USER.name, email: MOCK_USER.email };
  }

  return null;
}

/**
 * Salva o usuário no localStorage.
 */
export function saveUserToStorage(user: User): void {
  localStorage.setItem('diobank_user', JSON.stringify(user));
}

/**
 * Recupera o usuário do localStorage.
 */
export function getUserFromStorage(): User | null {
  try {
    const raw = localStorage.getItem('diobank_user');
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

/**
 * Remove o usuário do localStorage.
 */
export function removeUserFromStorage(): void {
  localStorage.removeItem('diobank_user');
}
