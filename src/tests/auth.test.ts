import {
  validateEmail,
  validatePassword,
  authenticate,
  saveUserToStorage,
  getUserFromStorage,
  removeUserFromStorage,
} from '../utils/auth';

// ─── validateEmail ────────────────────────────────────────────────────────────

describe('validateEmail', () => {
  it('deve retornar true para um e-mail válido', () => {
    expect(validateEmail('adriano@diobank.com')).toBe(true);
  });

  it('deve retornar false para string vazia', () => {
    expect(validateEmail('')).toBe(false);
  });

  it('deve retornar false para e-mail sem @', () => {
    expect(validateEmail('adrianodiobank.com')).toBe(false);
  });

  it('deve retornar false para e-mail sem domínio', () => {
    expect(validateEmail('adriano@')).toBe(false);
  });

  it('deve retornar false para e-mail com espaços', () => {
    expect(validateEmail('adriano @diobank.com')).toBe(false);
  });
});

// ─── validatePassword ────────────────────────────────────────────────────────

describe('validatePassword', () => {
  it('deve retornar true para senha válida com maiúscula e número', () => {
    expect(validatePassword('Dio@1234')).toBe(true);
  });

  it('deve retornar false para senha com menos de 6 caracteres', () => {
    expect(validatePassword('Ab1')).toBe(false);
  });

  it('deve retornar false para senha sem letra maiúscula', () => {
    expect(validatePassword('abcdef1')).toBe(false);
  });

  it('deve retornar false para senha sem número', () => {
    expect(validatePassword('AbcdefG')).toBe(false);
  });

  it('deve retornar false para string vazia', () => {
    expect(validatePassword('')).toBe(false);
  });
});

// ─── authenticate ─────────────────────────────────────────────────────────────

describe('authenticate', () => {
  it('deve retornar o usuário com credenciais corretas', () => {
    const user = authenticate({ email: 'adriano@diobank.com', password: 'Dio@1234' });
    expect(user).not.toBeNull();
    expect(user?.name).toBe('Adriano Silva');
    expect(user?.email).toBe('adriano@diobank.com');
  });

  it('não deve retornar a senha do usuário', () => {
    const user = authenticate({ email: 'adriano@diobank.com', password: 'Dio@1234' });
    expect(user).not.toHaveProperty('password');
  });

  it('deve retornar null para senha incorreta', () => {
    const user = authenticate({ email: 'adriano@diobank.com', password: 'SenhaErrada1' });
    expect(user).toBeNull();
  });

  it('deve retornar null para e-mail incorreto', () => {
    const user = authenticate({ email: 'outro@diobank.com', password: 'Dio@1234' });
    expect(user).toBeNull();
  });

  it('deve retornar null para e-mail com formato inválido', () => {
    const user = authenticate({ email: 'nao-e-email', password: 'Dio@1234' });
    expect(user).toBeNull();
  });

  it('deve retornar null para senha que não atende os critérios', () => {
    const user = authenticate({ email: 'adriano@diobank.com', password: '123' });
    expect(user).toBeNull();
  });

  it('deve ser case-insensitive para o e-mail', () => {
    const user = authenticate({ email: 'ADRIANO@DIOBANK.COM', password: 'Dio@1234' });
    expect(user).not.toBeNull();
  });
});

// ─── localStorage helpers ─────────────────────────────────────────────────────

describe('localStorage helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('deve salvar e recuperar o usuário do localStorage', () => {
    const mockUser = { name: 'Adriano', email: 'adriano@diobank.com' };
    saveUserToStorage(mockUser);
    const retrieved = getUserFromStorage();
    expect(retrieved).toEqual(mockUser);
  });

  it('deve retornar null quando não há usuário no localStorage', () => {
    expect(getUserFromStorage()).toBeNull();
  });

  it('deve remover o usuário do localStorage', () => {
    saveUserToStorage({ name: 'Adriano', email: 'adriano@diobank.com' });
    removeUserFromStorage();
    expect(getUserFromStorage()).toBeNull();
  });

  it('deve retornar null quando o localStorage contém JSON inválido', () => {
    localStorage.setItem('diobank_user', 'json-invalido{{{');
    expect(getUserFromStorage()).toBeNull();
  });
});
