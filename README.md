# DIO Bank – Desafio TypeScript 02

Desenvolvido com **React + TypeScript + Tailwind CSS**.

---

## ✅ Desafios Implementados

### [x] Validação da senha no campo de login
- Validação de e-mail (formato correto)
- Validação de senha (mínimo 6 caracteres, 1 maiúscula, 1 número)
- Testes unitários com TDD em `src/tests/auth.test.ts`

### [x] Sistema de login com Context API
- `AuthContext` com estado global de autenticação
- `localStorage` para persistência da sessão
- Se o usuário já estiver logado, a tela de login não é exibida

### [x] Página de perfil do usuário
- Exibe nome e e-mail do usuário logado
- Rota protegida – redireciona para login se não autenticado
- Testes unitários em `src/tests/components.test.tsx`

### [x] Deploy no Netlify
- Configurado via `netlify.toml`

---

## 🚀 Como rodar

```bash
npm install
npm start
```

## 🧪 Testes

```bash
npm test
```

## 🔑 Credenciais de teste

| Campo | Valor              |
|-------|--------------------|
| E-mail | adriano@diobank.com |
| Senha  | Dio@1234           |

---

## 📁 Estrutura

```
src/
├── context/
│   └── AuthContext.tsx      # Context API de autenticação
├── components/
│   ├── Header.tsx
│   ├── Button.tsx
│   └── Card.tsx             # Formulário de login
├── pages/
│   ├── LoginPage.tsx
│   └── ProfilePage.tsx      # Página protegida
├── utils/
│   └── auth.ts              # Funções puras de validação/autenticação
├── tests/
│   ├── auth.test.ts         # Testes TDD das funções utilitárias
│   └── components.test.tsx  # Testes dos componentes
└── types/
    └── index.ts
```
