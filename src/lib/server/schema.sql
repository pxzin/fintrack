-- FinTrack Database Schema
-- Multi-user architecture for financial tracking application
-- Compatible with Turso (LibSQL/SQLite)

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  timezone TEXT DEFAULT 'America/Sao_Paulo',
  currency TEXT DEFAULT 'BRL',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  email_verified INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1
);

-- Sessions table for lucia-auth
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);

-- Account types for financial accounts
CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN (
    'CHECKING', 'SAVINGS', 'CREDIT_CARD', 'INVESTMENT', 
    'BUSINESS', 'CASH', 'CRYPTO', 'LOAN', 'PENSION', 'OTHER'
  )),
  initial_balance REAL NOT NULL DEFAULT 0,
  current_balance REAL NOT NULL DEFAULT 0,
  credit_limit REAL DEFAULT NULL,
  due_day INTEGER DEFAULT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Categories for transaction classification
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('INCOME', 'EXPENSE')),
  icon TEXT DEFAULT '📁',
  created_at TEXT DEFAULT (datetime('now'))
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  amount REAL NOT NULL,
  date TEXT NOT NULL,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  category_id TEXT NOT NULL REFERENCES categories(id),
  type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
  is_recurrent INTEGER DEFAULT 0,
  recurrence_interval TEXT CHECK(recurrence_interval IN ('MONTHLY', 'YEARLY')),
  installments_total INTEGER DEFAULT NULL,
  installments_paid INTEGER DEFAULT NULL,
  installment_start_date TEXT DEFAULT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Recurrence adjustments for modifying recurring transactions
CREATE TABLE IF NOT EXISTS recurrence_adjustments (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  transaction_id TEXT NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
  year_month TEXT NOT NULL, -- Format: YYYY-MM
  original_amount REAL NOT NULL,
  adjusted_amount REAL NOT NULL,
  reason TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE (transaction_id, year_month)
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_categories_user_id ON categories(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_account_id ON transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_transactions_category_id ON transactions(category_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_recurrence_adjustments_user_id ON recurrence_adjustments(user_id);
CREATE INDEX IF NOT EXISTS idx_recurrence_adjustments_transaction_id ON recurrence_adjustments(transaction_id);

-- Default categories for new users (will be inserted via application)
-- INCOME: Salary, Freelance, Investment, Other Income
-- EXPENSE: Food, Transport, Shopping, Bills, Health, Entertainment, Other