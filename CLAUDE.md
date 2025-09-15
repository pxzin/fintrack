# FinTrack - Sistema de Gestão Financeira Multi-usuário

> **IMPORTANTE:** Always use context7 when I need code generation, setup or configuration steps, or library/API documentation. This means you should automatically use the Context7 MCP tools to resolve library id and get library docs without me having to explicitly ask.

## 🎯 Contexto do Projeto

FinTrack é uma aplicação de gestão financeira pessoal sendo migrada de single-user para multi-user. O projeto está na **versão MVP** com foco em hospedagem gratuita e escalabilidade futura.

## 🏗️ Stack Tecnológica

- **Framework:** SvelteKit 2.37.0 + Svelte 5.38.6
- **Database:** Turso (LibSQL) - SQLite distribuído
- **Auth:** lucia-auth (a implementar)
- **Styling:** UnoCSS + Radix Colors
- **Deploy:** Vercel (free tier)
- **Tests:** Vitest + Testing Library
- **Package Manager:** pnpm

## 📋 Status do Projeto

### ✅ Concluído

- Análise completa do sistema original
- Documentação técnica (`FINTRACK_DOCUMENTATION.md`)
- Definição de MVP (`MVP_SCOPE.md`)
- Setup inicial do SvelteKit

### ⏳ Próximo

- Setup Turso database
- Implementação lucia-auth
- Migração de funcionalidades core

## 🚀 Comandos Essenciais

```bash
# Desenvolvimento completo (Turso + SvelteKit)
pnpm dev:full

# Desenvolvimento separado
pnpm db:start    # Turso com persistência
pnpm db:dev      # Turso ephemeral
pnpm dev         # SvelteKit apenas

# Build & Preview
pnpm build
pnpm preview

# Testes
pnpm test
pnpm test:ui

# Lint & Format
pnpm lint
pnpm format

# Deploy
vercel --prod
```

## 📊 Schema de Banco Multi-usuário

### Tabelas Core

```sql
-- Usuários
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Sessões (lucia-auth)
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  expires_at INTEGER NOT NULL
);

-- Contas (com isolamento por usuário)
CREATE TABLE accounts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
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

-- Categorias
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('INCOME', 'EXPENSE')),
  icon TEXT DEFAULT '📁'
);

-- Transações
CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  description TEXT NOT NULL,
  amount REAL NOT NULL,
  date TEXT NOT NULL,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  category_id TEXT NOT NULL REFERENCES categories(id),
  type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
  is_recurrent INTEGER DEFAULT 0,
  recurrence_interval TEXT CHECK(recurrence_interval IN ('MONTHLY', 'YEARLY'))
);
```

## 🎯 MVP Features

### 1. Autenticação

- Registro/Login com email + senha
- Logout com limpeza de sessão
- Proteção de rotas (middleware)
- Reset de senha básico

### 2. Gestão de Contas

- CRUD completo com isolamento por usuário
- Tipos: Corrente, Poupança, Cartão, Dinheiro
- Saldos automáticos (inicial + atual)

### 3. Sistema de Categorias

- Criação dinâmica com ícones
- Edição/exclusão com validações
- Categorias padrão no primeiro login

### 4. Transações Core

- Receitas e despesas
- Vinculação conta + categoria
- Transações recorrentes (mensal/anual)
- Lista paginada com filtros

### 5. Dashboard Essencial

- Resumo do mês atual
- Saldos por conta em tempo real
- Últimas transações
- Evolução mensal simples

### 6. Projeções Básicas

- 6 meses à frente baseado em recorrências
- Visualização em cards
- Consideração de saldos atuais

## 📁 Estrutura do Projeto

```
src/
├── lib/
│   ├── server/
│   │   ├── auth.ts           # lucia-auth setup
│   │   ├── db.ts             # Turso client
│   │   └── schemas/          # Database schemas
│   ├── components/
│   │   ├── ui/               # Base components
│   │   ├── auth/             # Auth forms
│   │   ├── accounts/         # Account components
│   │   ├── categories/       # Category components
│   │   ├── transactions/     # Transaction components
│   │   └── dashboard/        # Dashboard components
│   ├── stores/
│   │   ├── auth.svelte.ts    # Auth state (exported state)
│   │   └── toast.svelte.ts   # Notifications (exported state)
│   └── utils/
│       ├── projections.ts    # Financial projections
│       ├── formatters.ts     # Money/date formatting
│       └── validators.ts     # Form validation
└── routes/
    ├── (auth)/
    │   ├── login/
    │   ├── register/
    │   └── reset-password/
    ├── (app)/               # Protected routes
    │   ├── dashboard/
    │   ├── accounts/
    │   ├── categories/
    │   ├── transactions/
    │   └── projections/
    └── api/                 # Server endpoints
        ├── auth/
        ├── accounts/
        ├── categories/
        └── transactions/
```

## 🎨 Design System (Baseado no Figma)

### Color Palette

- **Primary:** #4F83FF (azul brand)
- **Success:** #10B981 (verde completed)
- **Processing:** #8B5CF6 (roxo processing)
- **Info:** #06B6D4 (cyan primary label)
- **Background Light:** #F8F9FA
- **Background Dark:** #2E3A52

### Components Patterns

- **Sidebar:** 256px width, logo + navigation
- **Cards:** Rounded 8px, shadow-card
- **Buttons:** Rounded 8px, primary blue
- **Badges:** Status colors (primary, success, processing)
- **Typography:** Inter font family
- **Layout:** 8px grid system

## 🔧 Dependências Necessárias

```bash
# Core
pnpm add @libsql/client lucia @lucia-auth/adapter-sqlite
pnpm add zod

# Dev
pnpm add -D @types/better-sqlite3 vitest @testing-library/svelte
pnpm add -D unocss @unocss/reset @iconify-json/lucide @iconify-json/heroicons
pnpm add -D concurrently
```

## 🎯 Funcionalidades do Sistema Original

### Server Actions Implementadas

- `addAccount`, `updateAccount`, `deleteAccount`
- `addCategory`, `deleteCategory`
- `addTransaction`, `deleteTransaction`
- `makeRecurrent`, `adjustRecurrence`
- `transfer` (entre contas)
- `importBackup`, `clearAllData`

### Componentes Mapeados

- `AccountForm`, `CategoryForm`, `TransactionForm`
- `CurrentMonthSummary`, `ProjectionsCarousel`
- `TransactionsList`, `FinancePageHeader`
- Sistema modular e bem estruturado

## 💡 Padrões de Desenvolvimento

### Convenções de Código

**IMPORTANTES: Regras Obrigatórias do Svelte 5**

1. **Props em Componentes:**
   - Para props somente leitura: `const { prop1, prop2 } = $props()`
   - Para props com $bindable: `let { prop = $bindable() } = $props()` (bindable requer let)
   - Props normais são somente leitura e devem ser tratadas como `const`

2. **Botões HTML:**
   - Sempre adicionar `type="button"` ou `type="submit"` em todos os elementos `<button>`
   - Necessário para conformidade com regras do Svelte

3. **Loops com Keys:**
   - Sempre usar keys em `{#each}` blocks: `{#each items as item (item.id)}`
   - Melhora performance e evita bugs de renderização

4. **Evitar Tipos 'any':**
   - Sempre definir tipos específicos quando possível
   - Usar `unknown` ao invés de `any` quando o tipo é realmente desconhecido
   - Para componentes de desenvolvimento (DevStoreInspector), aceitar `any` é permitido

5. **Console.logs:**
   - Remover `console.log` de código de produção
   - Usar `console.warn` ou `console.error` apenas para logs importantes
   - Para debugging em Svelte, preferir `$inspect(variavel)` que é reativo
   - Exemplo: `$inspect(storeValue)` mostra mudanças em tempo real

6. **Catch Blocks:**
   - Nunca deixar catch blocks vazios: `catch {}`
   - Sempre adicionar comentário: `catch { // reason for empty catch }`
   - Para errors não utilizados: `catch (_error) { }`

7. **Navegação:**
   - Para links internos, usar `data-sveltekit-preload-data` quando possível
   - Para `goto()`, considerar usar `{ replaceState: true }` quando apropriado

## 🛠️ Dev Store Inspector (Desenvolvimento)

Para inspecionar valores das stores em ambiente de desenvolvimento, existe um painel flutuante acessível em todas as rotas.

**Como adicionar novas stores ao painel:**

1. Crie sua store normalmente em `src/lib/stores/NOME_DA_STORE.svelte.ts`.
2. Exporte a store em `src/lib/stores/index.ts` adicionando:

```ts
export * from './NOME_DA_STORE.svelte';
```

3. O painel detecta automaticamente todas as stores exportadas pelo índice.
4. Não é necessário modificar o componente do painel para novas stores.
5. Para visualizar, rode o projeto em modo desenvolvimento (`pnpm dev`).

**Importante:**

- O painel só aparece em ambiente de desenvolvimento.
- Use para debug e inspeção rápida dos estados globais.

### Padrões de Segurança

- Isolamento por usuário em todas queries
- Validação server-side obrigatória
- Sanitização de inputs
- Rate limiting (futuro)

### Performance

- Lazy loading de componentes
- Pagination em listas grandes
- Bundle optimization automático
- Edge caching (Vercel)

## 🚫 Limitações MVP

**Funcionalidades adiadas para Fase 2:**

- Sistema de orçamentos/metas
- Transferências entre contas
- Sistema de parcelas
- Importação CSV
- Relatórios avançados/PDF
- Compartilhamento familiar
- Notificações push
- Mobile app

## 📈 Métricas de Sucesso

### Técnicas

- Load time: < 2s primeira visita
- Bundle size: < 500KB inicial
- Database queries: < 100ms médio
- Uptime: > 99%

### Produto

- Onboarding: < 2min registro → primeira transação
- Core flow: Adicionar transação em < 30s
- Data accuracy: 100% consistência de saldos
- Mobile responsive: 320px+

## 💰 Hospedagem Gratuita

### Free Tiers Utilizados

- **Turso:** 500MB + 1B reads/mês
- **Vercel:** 100GB bandwidth/mês
- **Capacidade:** ~1000 usuários ativos
- **Escalabilidade:** $5-20/mês para 1K-5K usuários

### Monitoring Gratuito

- Vercel Analytics (incluído)
- Sentry free tier (5K errors/mês)
- Console.log estruturado
- Health check endpoints

## 📋 Critérios de Ready

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

## 📚 Documentação de Referência

1. **FINTRACK_DOCUMENTATION.md** - Análise técnica completa
2. **MVP_SCOPE.md** - Escopo detalhado do MVP
3. **CONTEXT.md** - Status atual e próximos passos

## 🆘 Troubleshooting Comum

### Database Issues

- Verificar conexão Turso em `src/lib/server/db.ts`
- Validar schema com migrations
- Check user isolation em queries

### Auth Problems

- Verificar lucia-auth setup
- Session validation middleware
- Cookie configuration

### Performance Issues

- Bundle analyzer: `pnpm build -- --analyze`
- Database query optimization
- Component lazy loading
- UnoCSS inspector: `http://localhost:5173/__unocss`

---

## 🌍 Internacionalização (i18n)

### ✅ Configuração Completa

- **Library:** typesafe-i18n com adapter Svelte
- **Idiomas:** Português (Brasil) como padrão + English (US) + Italiano
- **Type-safety:** Completa com autocomplete no TypeScript
- **Detecção:** Automática por navegador + persistência em localStorage

### 📁 Estrutura i18n

```
src/i18n/
├── en/index.ts           # Traduções em inglês (base locale)
├── it/index.ts           # Traduções em italiano
├── pt-br/index.ts        # Traduções em português
├── i18n-types.ts         # Tipos gerados automaticamente
├── i18n-svelte.ts        # Store para Svelte
├── i18n-util.ts          # Utilitários
└── formatters.ts         # Formatadores
```

### 🔧 Como Usar

**1. Em componentes Svelte:**

```svelte
<script>
	import LL from '$i18n/i18n-svelte';
</script>

<h1>{$LL.auth.login.title()}</h1><p>{$LL.errors.minLength({ min: 8 })}</p>
```

**2. Em arquivos TypeScript:**

```typescript
import { get } from 'svelte/store';
import LL from '$i18n/i18n-svelte';

const message = get(LL).auth.login.title();
```

**3. Alternando idiomas:**

```typescript
import { changeLocale } from '$lib/stores/locale.svelte.js';

await changeLocale('en'); // 'pt-br', 'it'
```

### 📝 Convenções de Tradução

**IMPORTANTE: SEMPRE criar strings em todos os idiomas (pt-br, en, it)**

1. **Estrutura hierárquica:**

   ```typescript
   auth: {
     login: {
       title: 'Login to Account',
       subtitle: 'Please enter your email and password'
     }
   }
   ```

2. **Parâmetros tipados:**

   ```typescript
   minLength: 'Minimum {min:number} characters';
   ```

3. **Organização por feature:**
   - `auth.*` - Autenticação
   - `common.*` - Textos comuns (botões, labels)
   - `nav.*` - Navegação
   - `dashboard.*` - Dashboard
   - `accounts.*` - Contas
   - `transactions.*` - Transações
   - `categories.*` - Categorias
   - `errors.*` - Mensagens de erro
   - `success.*` - Mensagens de sucesso

### 🛠️ Comandos i18n

```bash
# Gerar tipos após alterar traduções
npx typesafe-i18n --no-watch

# Modo watch durante desenvolvimento
npx typesafe-i18n

# Desenvolvimento com i18n
pnpm dev
```

### 🎯 Regras Obrigatórias

1. **Nunca** usar strings hardcoded no código
2. **Sempre** adicionar traduções em pt-br, en E it
3. **Sempre** usar tipagem correta para parâmetros
4. **Sempre** organizar por namespace lógico
5. **Sempre** testar alternância de idiomas

### 🔗 Componentes i18n

- `LocaleSwitcher.svelte` - Alternador de idiomas
- Integrado com `ThemeToggle` na página de login
- Persistência automática em localStorage
- Detecção de idioma do navegador

**Próximo passo:** Setup Turso + Auth implementation

- Sempre que for inserir strings, separar para internacionalização

## 🎯 Workflow de Desenvolvimento

### Comandos Obrigatórios após Mudanças

1. **Sempre executar após implementar funcionalidades:**

   ```bash
   pnpm check    # Verificação TypeScript
   pnpm lint     # ESLint com correções
   pnpm format   # Prettier formatting
   ```

2. **Nunca rode `pnpm dev`** - O utilizador rodará em terminal separado
3. **Sempre peça** para o utilizador verificar por falhas visuais ou no console após suas modificações

### Regras de Qualidade de Código

1. **Zero Tolerância para:**
   - Erros TypeScript (`pnpm check` deve passar sem erros)
   - Catch blocks vazios sem comentários
   - Botões sem atributo `type`
   - `{#each}` sem keys

2. **Warnings Aceitáveis:**
   - `console.warn` e `console.error` em código de server/desenvolvimento
   - Tipos `any` em componentes de debugging (DevStoreInspector)
   - `console.log` apenas temporariamente durante desenvolvimento

3. **Sempre consulte context7** para contexto atualizado do Svelte e outras bibliotecas
