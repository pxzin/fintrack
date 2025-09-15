# FinTrack - Sistema de Gestão Financeira Pessoal

## Documentação Técnica Completa para Desenvolvimento Multi-usuário

### Versão Atual: 0.0.7 (Single-User POC)

### Data: Setembro 2025

---

## 📋 Visão Geral

O **FinTrack** é um sistema completo de gestão financeira pessoal desenvolvido como proof-of-concept (POC) no contexto de um website pessoal. O sistema demonstra excelente arquitetura para evolução para uma plataforma multi-usuário robusta.

### Tecnologias Core

- **Frontend:** SvelteKit 2.37.0 + Svelte 5.38.6
- **Database:** Turso (LibSQL) - SQLite distribuído
- **Styling:** TailwindCSS + DaisyUI
- **Testes:** Vitest + Testing Library

---

## 🏗️ Arquitetura Atual

### Estrutura de Arquivos

```
src/
├── lib/
│   ├── components/finance/          # Componentes UI especializados
│   │   ├── page/                   # Componentes de página
│   │   ├── forms/                  # Formulários especializados
│   │   └── monthly/                # Componentes mensais
│   ├── helpers/                    # Funções auxiliares
│   │   ├── financeHelpers.ts       # Utilitários de negócio
│   │   ├── financeActions.ts       # Ações do sistema
│   │   └── monthlyCalculations.ts  # Cálculos mensais
│   ├── utils/
│   │   └── financeProjections.ts   # Sistema de projeções
│   └── server/
│       └── turso.ts               # Cliente de banco
└── routes/tools/finance/          # Rotas da aplicação
    ├── +page.svelte              # Dashboard principal
    ├── +page.server.ts           # Server actions
    └── import/                   # Importação CSV
```

---

## 📊 Modelo de Dados Atual

### Entidades Core

#### 1. Accounts (Contas)

```sql
CREATE TABLE accounts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN (
    'CHECKING', 'SAVINGS', 'CREDIT_CARD', 'INVESTMENT',
    'BUSINESS', 'CASH', 'CRYPTO', 'LOAN', 'PENSION', 'OTHER'
  )),
  initial_balance REAL NOT NULL,
  current_balance REAL NOT NULL,
  credit_limit REAL,
  due_day INTEGER
);
```

#### 2. Categories (Categorias)

```sql
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('INCOME', 'EXPENSE')),
  icon TEXT DEFAULT '📁'
);
```

#### 3. Transactions (Transações)

```sql
CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  description TEXT NOT NULL,
  amount REAL NOT NULL,
  date TEXT NOT NULL,
  account_id TEXT NOT NULL,
  category_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
  is_recurrent INTEGER DEFAULT 0,
  recurrence_interval TEXT CHECK(recurrence_interval IN ('MONTHLY', 'YEARLY')),
  installments_total INTEGER,
  installments_paid INTEGER,
  installment_start_date TEXT,
  FOREIGN KEY (account_id) REFERENCES accounts(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

#### 4. Recurrence Adjustments (Ajustes de Recorrência)

```sql
CREATE TABLE recurrence_adjustments (
  id TEXT PRIMARY KEY,
  transaction_id TEXT NOT NULL,
  year_month TEXT NOT NULL,
  original_amount REAL NOT NULL,
  adjusted_amount REAL NOT NULL,
  reason TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
  UNIQUE (transaction_id, year_month)
);
```

---

## ⚙️ Funcionalidades Implementadas

### 1. Gestão de Contas

- **Criação/Edição/Exclusão** de contas
- **Tipos suportados:** Corrente, Poupança, Cartão de Crédito, Investimento, etc.
- **Saldos automáticos:** inicial e atual
- **Limite de crédito** e dias de vencimento
- **Validações:** não permite exclusão com transações vinculadas

### 2. Sistema de Categorias

- **Criação dinâmica** com seleção de ícones
- **Busca e navegação** por teclado
- **Estatísticas automáticas** por categoria
- **Integração com transações**

### 3. Transações Avançadas

#### Tipos Base

- **Receitas (income):** valores positivos automáticos
- **Despesas (expense):** valores negativos automáticos

#### Recursos Especiais

- **Transações recorrentes:** mensal/anual
- **Sistema de parcelas:** total/pagas com datas
- **Transferências entre contas:** criação automática de transações paired
- **Ajustes de recorrência:** modificação pontual de valores

### 4. Sistema de Projeções

- **Cálculo automático** de saldos futuros
- **Consideração de recorrências** e parcelas
- **Ajustes personalizados** por período
- **Visualização em carrossel**

### 5. Análises Mensais

#### Métricas Calculadas

- **Receita real vs projetada**
- **Gastos por categoria**
- **Fluxo de caixa líquido**
- **Taxa de economia**
- **Gastos em cartão de crédito**

#### Insights Automatizados

- **Padrões de gastos**
- **Alertas de orçamento**
- **Comparações mensais**

### 6. Importação e Backup

- **Import CSV:** extratos bancários e faturas
- **Backup completo:** export/import JSON
- **Validação de dados** na importação

### 7. UX/UI Avançada

- **Atalhos de teclado** para operações comuns
- **Busca em tempo real** em categorias
- **Modais responsivos**
- **Toast notifications**
- **Debug drawer** para desenvolvimento

---

## 🔧 Server Actions Implementadas

### Contas

- `addAccount` - Criar conta
- `updateAccount` - Atualizar nome e saldo inicial
- `deleteAccount` - Remover (com validação)

### Categorias

- `addCategory` - Criar categoria com ícone
- `deleteCategory` - Remover (com validação)

### Transações

- `addTransaction` - Criar transação com validações
- `addTransactionByName` - Criar por nome (import)
- `deleteTransaction` - Remover com ajuste de saldo
- `updateTransactionAccount` - Mover entre contas

### Recorrências

- `makeRecurrent` - Tornar transação recorrente
- `removeRecurrence` - Remover recorrência
- `adjustRecurrence` - Ajustar valor pontual
- `interruptRecurrence` - Pausar recorrência
- `resumeRecurrence` - Reativar recorrência

### Transferências

- `transfer` - Transferir entre contas (cria transações paired)

### Dados

- `importBackup` - Importar backup JSON
- `clearAllData` - Limpar dados (dev only)
- `clearTransactions` - Limpar transações (dev only)
- `refreshProjections` - Recalcular projeções
- `debugData` - Info debug do sistema

---

## 🎯 Sugestões para Evolução Multi-usuário

### 1. Arquitetura Proposta

#### Backend Separado (Recomendado)

```
fintrack-api/               # API Backend
├── src/
│   ├── auth/              # Autenticação JWT
│   ├── users/             # Gestão de usuários
│   ├── accounts/          # Módulo de contas
│   ├── transactions/      # Módulo de transações
│   ├── categories/        # Módulo de categorias
│   ├── projections/       # Sistema de projeções
│   └── shared/            # Utilitários compartilhados
├── prisma/                # Schema e migrações
└── tests/                 # Testes automatizados

fintrack-web/               # Frontend SvelteKit
├── src/
│   ├── lib/
│   │   ├── api/          # Cliente API
│   │   ├── auth/         # Store de autenticação
│   │   └── components/   # Componentes reutilizáveis
│   └── routes/           # Páginas da aplicação
```

#### Stack Tecnológica Sugerida (Hospedagem Gratuita)

**Opção 1: Full-Stack SvelteKit (Recomendada)**

- **Framework:** SvelteKit com server-side API routes
- **Database:** Turso (LibSQL) - free tier 500MB + 1B row reads
- **Auth:** lucia-auth ou Auth.js
- **Deploy:** Vercel (frontend) + Turso (database)
- **Custo:** $0/mês até escala considerável

**Opção 2: Backend Separado (Escalável)**

- **Backend:** Node.js + Hono/Fastify + Prisma
- **Database:** PlanetScale (MySQL) ou Neon (PostgreSQL) - free tiers
- **Auth:** JWT + refresh tokens
- **Frontend:** SvelteKit (mantido)
- **Deploy:** Railway/Render (backend) + Vercel (frontend)
- **Custo:** $0-5/mês inicialmente

### 2. Modelo de Dados Multi-usuário

#### Adição da Entidade Users

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  timezone TEXT DEFAULT 'America/Sao_Paulo',
  currency TEXT DEFAULT 'BRL',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  email_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE
);
```

#### Modificações nas Entidades Existentes

```sql
-- Adicionar user_id em todas as tabelas
ALTER TABLE accounts ADD COLUMN user_id UUID NOT NULL REFERENCES users(id);
ALTER TABLE categories ADD COLUMN user_id UUID NOT NULL REFERENCES users(id);
ALTER TABLE transactions ADD COLUMN user_id UUID NOT NULL REFERENCES users(id);
ALTER TABLE recurrence_adjustments ADD COLUMN user_id UUID NOT NULL REFERENCES users(id);

-- Novos índices para performance
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_categories_user_id ON categories(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(date);
```

### 3. Novas Funcionalidades Sugeridas

#### 3.1 Sistema de Autenticação

- **Registro/Login** com email
- **Verificação de email**
- **Reset de senha**
- **Autenticação 2FA** (opcional)
- **Sessions management**

#### 3.2 Perfil e Configurações

- **Timezone personalizado**
- **Moeda base configurável**
- **Temas personalizados**
- **Preferências de notificação**

#### 3.3 Orçamentos e Metas

- **Orçamentos mensais** por categoria
- **Metas de economia**
- **Alertas de gastos**
- **Tracking de progresso**

#### 3.4 Relatórios Avançados

- **Dashboard executivo**
- **Comparativos anuais**
- **Análise de tendências**
- **Export para PDF/Excel**

#### 3.5 Compartilhamento Familiar

- **Contas compartilhadas**
- **Permissões granulares**
- **Visões consolidadas**
- **Controle parental**

#### 3.6 Integração Externa

- **Open Banking API**
- **Import automático** de extratos
- **Notificações push**
- **Webhook para sistemas externos**

#### 3.7 Mobile App

- **React Native/Flutter**
- **Sincronização offline**
- **Widgets de dashboard**
- **Camera para notas fiscais**

### 4. Considerações de Segurança

#### 4.1 Autenticação e Autorização

- **JWT com refresh tokens**
- **Rate limiting** por usuário
- **RBAC** (Role-Based Access Control)
- **Audit logs** completos

#### 4.2 Proteção de Dados

- **Criptografia de dados sensíveis**
- **HTTPS obrigatório**
- **Sanitização de inputs**
- **Proteção CSRF**

#### 4.3 Compliance

- **LGPD compliance**
- **Backup automatizado**
- **Retenção de dados**
- **Right to deletion**

### 5. Performance e Escalabilidade (Free Tier Friendly)

#### 5.1 Database Optimization

- **Índices estratégicos**
- **Turso embedded replicas** (edge locations)
- **Connection pooling nativo**
- **Query optimization**

#### 5.2 Caching Strategy (Gratuito)

- **SvelteKit load caching**
- **Browser caching headers**
- **Vercel edge caching**
- **Service worker para offline**

#### 5.3 Monitoring (Free Tiers)

- **Vercel Analytics** (gratuito)
- **Sentry free tier** (5K errors/mês)
- **Uptime Robot** (50 monitors gratuitos)
- **Built-in health checks**

---

## 🚀 Plano de Migração (Free-Tier First)

### Fase 1: Setup & Auth (2-3 semanas)

1. **Novo projeto SvelteKit** com Turso
2. **Sistema de autenticação** (lucia-auth)
3. **Modelo de dados multi-usuário**
4. **Deploy pipeline** (Vercel + Turso)

### Fase 2: Core Migration (3-4 semanas)

1. **Migração das funcionalidades** existentes
2. **Isolamento por usuário**
3. **Testes automatizados**
4. **Dashboard funcional**

### Fase 3: MVP Features (4-6 semanas)

1. **Sistema de orçamentos básico**
2. **Compartilhamento familiar**
3. **Relatórios essenciais**
4. **Mobile-responsive UI**

### Fase 4: Scale Preparation (2-3 semanas)

1. **Performance optimization**
2. **Monitoring setup**
3. **Beta testing**
4. **Launch preparation**

**Total:** ~3-4 meses para MVP completo

---

## 🆓 Estratégia de Hospedagem Gratuita

### Free Tiers Disponíveis (Capacidade para ~1000 usuários)

**Turso Database (Recomendado)**

- ✅ 500MB storage gratuito
- ✅ 1 billion row reads/mês
- ✅ Edge locations globais
- ✅ Compatible com SQLite atual
- ✅ Scaling automático

**Vercel (Frontend + API)**

- ✅ 100GB bandwidth/mês
- ✅ Serverless functions ilimitadas
- ✅ Edge caching global
- ✅ Zero config deployment

**Alternativas para Escalabilidade:**

- **PlanetScale:** 10GB + 1B reads (MySQL)
- **Neon:** 0.5GB + compute time (PostgreSQL)
- **Railway:** $5/mês com uso incluído
- **Render:** Free tier + $7/mês upgrade

### Estimativa de Custos por Usuário

- **0-1000 usuários:** $0/mês
- **1K-5K usuários:** $5-20/mês
- **5K-20K usuários:** $20-100/mês
- **20K+ usuários:** Migração para infra paga

---

## 📋 Checklist para Início

### Setup Inicial (Free-Tier)

- [ ] Criar novo projeto SvelteKit
- [ ] Configurar Turso database
- [ ] Setup Vercel deployment
- [ ] Implementar lucia-auth

### Core Features

- [ ] Sistema multi-usuário
- [ ] Migração de dados existente
- [ ] Server actions com auth
- [ ] Componentes reutilizáveis

### Qualidade & Deploy

- [ ] Testes automatizados
- [ ] Vercel Analytics setup
- [ ] Sentry error tracking
- [ ] Performance monitoring

---

## 📚 Recursos de Referência

### Documentação Técnica

- **SvelteKit:** https://kit.svelte.dev
- **Prisma:** https://prisma.io/docs
- **Turso:** https://turso.tech/docs

### Patterns e Arquitetura

- **Clean Architecture** para backend
- **Repository Pattern** para data access
- **CQRS** para operações complexas
- **Event Sourcing** para audit trail

---

## 💡 Recomendações para Manter Baixo Custo

### Arquitetura Simplificada

1. **SvelteKit Full-Stack:** Use API routes em vez de backend separado
2. **Turso como única DB:** Evite Redis/cache external inicialmente
3. **Server-side Auth:** lucia-auth em vez de serviços externos
4. **Static assets:** Use Vercel CDN incluído no free tier

### Otimizações de Performance (Gratuitas)

1. **Bundle optimization:** Vite tree-shaking automático
2. **Image optimization:** svelte/enhanced-img built-in
3. **Preloading:** SvelteKit prefetch inteligente
4. **Service Workers:** Cache offline nativo

### Monitoring Essencial (Free)

1. **Vercel Analytics:** Métricas de uso incluídas
2. **Console.log structure:** Para debug em produção
3. **Error boundaries:** Capture de erros no frontend
4. **Health check endpoint:** Status da aplicação

---

## 📞 Próximos Passos Recomendados

1. **Definir MVP scope** - quais funcionalidades priorizar
2. **Criar projeto SvelteKit** com Turso
3. **Implementar auth system** (lucia-auth)
4. **Migrar modelo de dados** com user_id
5. **Deploy pipeline** Vercel + Turso

**Vantagem da Abordagem:** Validação rápida com custo zero, migração incremental para infra paga conforme crescimento.

Esta documentação serve como base sólida para iniciar o desenvolvimento do **FinTrack** como produto independente e robusto, priorizando hospedagem gratuita sem comprometer qualidade ou escalabilidade futura.
