This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# 🧱 Clean Architecture – Next.js Template

A modular, scalable folder structure for building Next.js apps with Clean Architecture principles.

---

## 📁 Folder Structure

```
/src
├── domain/                  ← Pure business logic (no Next.js, no HTTP)
│   ├── entities/            ← e.g. Todo, User
│   ├── use-cases/           ← e.g. createTodo.ts, deleteUser.ts
│   └── interfaces/          ← e.g. TodoRepository (abstract interface)

├── infrastructure/          ← Implements interfaces (DB, API clients, etc.)
│   └── repositories/

├── application/             ← Services, coordinators, adapters
│   ├── services/
│   ├── hooks/
│   └── utils/

├── features/                ← Only contains UI + page-specific logic
│   ├── todos/
│   │   ├── components/
│   │   └── pages/
│   ├── auth/
│   │   └── pages/

├── shared/                  ← UI components, global types, etc.
├── pages/                   ← API routes and Next.js pages (if not using App Router)
└── config/                  ← Env, constants, DI setup
```

### `🧩 How Layers Interact/`
---
```
[ UI (features/pages/components) ]
         ↓
[ Application (services/hooks) ]
         ↓
[ Domain (use-cases/entities/interfaces) ]
         ↓
[ Infrastructure (implementations of interfaces) ]
```

## 🔄 Layers Overview

### `domain/`
- Pure business rules
- Entities, use-cases, interfaces

### `infrastructure/`
- External tech (DBs, APIs)
- Implements domain interfaces

### `application/`
- Services and hooks
- Bridges domain and UI

### `features/`
- UI per domain module
- Presentation logic only

### `app/`
- Next.js routing layer
- API routes and pages

### `shared/`
- UI components, utils, types
- Reused across features

### `config/`
- Environment and setup files

---

## ✅ Usage Examples

| Goal                       | Add Here                                     |
|----------------------------|----------------------------------------------|
| CreateTodo logic          | `domain/use-cases/`, `application/services/` |
| Login form                | `features/auth/components/`                  |
| Prisma repo               | `infrastructure/repositories/`              |
| New route                 | `app/your-page/page.tsx`                     |
| Shared type               | `shared/types/`                              |

---

## 🏁 Getting Started

```bash
npm install
npm run dev
```

---

Made with ❤️ using Clean Code Principles.
