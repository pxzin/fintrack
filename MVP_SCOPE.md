# FinTrack MVP - Definição de Escopo

## 🎯 Objetivo

Transformar o FinTrack single-user atual em uma aplicação multi-usuário hospedada gratuitamente, mantendo as funcionalidades essenciais e preparando para escalabilidade.

## ⭐ Funcionalidades MVP (4 semanas)

### 1. Autenticação e Usuários

- **Registro/Login** com email + senha
- **Logout** com limpeza de sessão
- **Proteção de rotas** (middleware)
- **Reset de senha** (básico via email)

### 2. Gestão de Contas

- **CRUD completo** de contas bancárias
- **Tipos suportados:** Corrente, Poupança, Cartão, Dinheiro
- **Saldos automáticos** (inicial + atual)
- **Isolamento por usuário**

### 3. Sistema de Categorias

- **Criação dinâmica** com ícones
- **Edição/exclusão** com validações
- **Categorias padrão** no primeiro login
- **Busca e filtros**

### 4. Transações Core

- **Receitas e despesas** com valores automáticos
- **Vinculação** conta + categoria
- **Transações recorrentes** (mensal/anual)
- **Lista paginada** com filtros por data

### 5. Dashboard Essencial

- **Resumo do mês** atual (receita/despesa/saldo)
- **Saldos por conta** em tempo real
- **Últimas transações** (10 mais recentes)
- **Gráfico simples** de evolução mensal

### 6. Projeções Básicas

- **6 meses à frente** baseado em recorrências
- **Visualização em cards** ou lista simples
- **Consideração de saldos atuais**

## 🚫 Fora do MVP (Fase 2)

### Funcionalidades Avançadas

- Sistema de orçamentos/metas
- Transferências entre contas
- Sistema de parcelas/installments
- Importação CSV
- Relatórios avançados/PDF
- Compartilhamento familiar
- Notificações push
- Mobile app

### Integrações Externas

- Open Banking
- APIs de bancos
- Webhooks externos

## 🏗️ Arquitetura MVP

### Stack Técnica

- **Frontend/Backend:** SvelteKit (API routes)
- **Database:** Turso (LibSQL)
- **Auth:** lucia-auth
- **Deploy:** Vercel
- **Monitoring:** Vercel Analytics + Sentry free

### Estrutura de Projeto

```
fintrack/
├── src/
│   ├── lib/
│   │   ├── server/
│   │   │   ├── auth.ts           # lucia-auth setup
│   │   │   ├── db.ts             # Turso client
│   │   │   └── schemas/          # Database schemas
│   │   ├── components/
│   │   │   ├── ui/               # Base components
│   │   │   ├── auth/             # Auth forms
│   │   │   ├── accounts/         # Account components
│   │   │   ├── categories/       # Category components
│   │   │   ├── transactions/     # Transaction components
│   │   │   └── dashboard/        # Dashboard components
│   │   ├── stores/
│   │   │   ├── auth.ts           # Auth state
│   │   │   └── toast.ts          # Notifications
│   │   └── utils/
│   │       ├── projections.ts    # Financial projections
│   │       ├── formatters.ts     # Money/date formatting
│   │       └── validators.ts     # Form validation
│   └── routes/
│       ├── (auth)/
│       │   ├── login/
│       │   ├── register/
│       │   └── reset-password/
│       ├── (app)/               # Protected routes
│       │   ├── dashboard/
│       │   ├── accounts/
│       │   ├── categories/
│       │   ├── transactions/
│       │   └── projections/
│       └── api/                 # Server endpoints
│           ├── auth/
│           ├── accounts/
│           ├── categories/
│           └── transactions/
├── static/
├── tests/
└── docs/
```

### Database Schema

```sql
-- Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table (lucia-auth)
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);

-- Existing tables with user_id added
ALTER TABLE accounts ADD COLUMN user_id TEXT NOT NULL REFERENCES users(id);
ALTER TABLE categories ADD COLUMN user_id TEXT NOT NULL REFERENCES users(id);
ALTER TABLE transactions ADD COLUMN user_id TEXT NOT NULL REFERENCES users(id);
```

## 📈 Métricas de Sucesso MVP

### Técnicas

- **Load time:** < 2s primeira visita
- **Bundle size:** < 500KB inicial
- **Database queries:** < 100ms médio
- **Uptime:** > 99% (Vercel SLA)

### Produto

- **Onboarding:** < 2min do registro ao primeira transação
- **Core flow:** Adicionar transação em < 30s
- **Data accuracy:** 100% consistência de saldos
- **Mobile responsive:** Funcional em viewport 320px+

### Negócio

- **User retention:** > 60% após 7 dias
- **Feature adoption:** > 80% criam pelo menos 1 conta
- **Support tickets:** < 5% dos usuários ativos

## 🕐 Timeline MVP (4 semanas)

### Semana 1: Foundation

- Setup projeto SvelteKit + Turso
- Implementar lucia-auth
- Rotas protegidas
- Deploy pipeline Vercel

### Semana 2: Core Features

- Gestão de contas (CRUD)
- Sistema de categorias
- Transações básicas
- Database com isolamento

### Semana 3: Dashboard & UX

- Dashboard resumo
- Lista de transações
- Projeções simples
- UI/UX responsivo

### Semana 4: Polish & Launch

- Testes automatizados
- Performance optimization
- Error handling
- Beta launch

## 🎯 Critérios de Ready

### Must Have ✅

- [ ] Login/Logout funcional
- [ ] CRUD contas isolado por usuário
- [ ] Transações com categorias
- [ ] Saldos calculados corretamente
- [ ] Deploy automático funcionando
- [ ] Responsive mobile

### Nice to Have 🎁

- [ ] Reset password por email
- [ ] Dark mode toggle
- [ ] Export básico (JSON)
- [ ] Testes E2E básicos

Este MVP garante um produto funcional e escalável, validando o conceito sem comprometer recursos ou tempo de desenvolvimento.
