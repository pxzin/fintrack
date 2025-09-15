import { hash, verify } from '@node-rs/argon2';
import { executeQuery } from './db';
import type { InArgs } from '@libsql/client';

// Types
export interface User {
	id: string;
	email: string;
	full_name: string;
	email_verified: number;
	created_at: Date;
	updated_at: Date;
}

export interface Session {
	id: string;
	user_id: string;
	expires_at: Date;
}

export interface SessionWithUser extends Session {
	user: User;
}

// Constants
const SESSION_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 30; // 30 days

// Utility functions
export function generateId(): string {
	const array = new Uint8Array(21);
	crypto.getRandomValues(array);
	return Array.from(array, (byte) => byte.toString(36).padStart(2, '0')).join('');
}

// Password functions
export async function hashPassword(password: string): Promise<string> {
	return await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
	return await verify(hash, password);
}

// User functions
export async function createUser(email: string, password: string, fullName: string): Promise<User> {
	const id = generateId();
	const passwordHash = await hashPassword(password);
	const now = Math.floor(Date.now() / 1000);

	await executeQuery(
		'INSERT INTO users (id, email, password_hash, full_name, email_verified, created_at, updated_at) VALUES (?, ?, ?, ?, 0, ?, ?)',
		[id, email.toLowerCase(), passwordHash, fullName, now, now] as InArgs
	);

	return {
		id,
		email: email.toLowerCase(),
		full_name: fullName,
		email_verified: 0,
		created_at: new Date(now * 1000),
		updated_at: new Date(now * 1000)
	};
}

export async function getUserByEmail(email: string): Promise<User | null> {
	const result = await executeQuery(
		'SELECT id, email, full_name, email_verified, created_at, updated_at FROM users WHERE email = ?',
		[email.toLowerCase()] as InArgs
	);

	if (result.rows.length === 0) {
		return null;
	}

	const row = result.rows[0];
	return {
		id: row[0] as string,
		email: row[1] as string,
		full_name: row[2] as string,
		email_verified: row[3] as number,
		created_at: new Date((row[4] as number) * 1000),
		updated_at: new Date((row[5] as number) * 1000)
	};
}

export async function getUserById(id: string): Promise<User | null> {
	const result = await executeQuery(
		'SELECT id, email, full_name, email_verified, created_at, updated_at FROM users WHERE id = ?',
		[id] as InArgs
	);

	if (result.rows.length === 0) {
		return null;
	}

	const row = result.rows[0];
	return {
		id: row[0] as string,
		email: row[1] as string,
		full_name: row[2] as string,
		email_verified: row[3] as number,
		created_at: new Date((row[4] as number) * 1000),
		updated_at: new Date((row[5] as number) * 1000)
	};
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
	const result = await executeQuery(
		'SELECT id, email, password_hash, full_name, email_verified, created_at, updated_at FROM users WHERE email = ?',
		[email.toLowerCase()] as InArgs
	);

	if (result.rows.length === 0) {
		return null;
	}

	const row = result.rows[0];
	const passwordHash = row[2] as string;

	const isValidPassword = await verifyPassword(passwordHash, password);
	if (!isValidPassword) {
		return null;
	}

	return {
		id: row[0] as string,
		email: row[1] as string,
		full_name: row[3] as string,
		email_verified: row[4] as number,
		created_at: new Date((row[5] as number) * 1000),
		updated_at: new Date((row[6] as number) * 1000)
	};
}

// Session functions
export async function createSession(userId: string): Promise<Session> {
	const id = generateId();
	const now = Math.floor(Date.now() / 1000);
	const expiresAt = now + SESSION_EXPIRES_IN_SECONDS;

	await executeQuery('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)', [
		id,
		userId,
		expiresAt
	] as InArgs);

	return {
		id,
		user_id: userId,
		expires_at: new Date(expiresAt * 1000)
	};
}

export async function validateSession(sessionId: string): Promise<SessionWithUser | null> {
	const now = Math.floor(Date.now() / 1000);

	// Delete expired sessions first
	await executeQuery('DELETE FROM sessions WHERE expires_at <= ?', [now] as InArgs);

	const result = await executeQuery(
		`SELECT
			s.id, s.user_id, s.expires_at,
			u.id, u.email, u.full_name, u.email_verified, u.created_at, u.updated_at
		FROM sessions s
		JOIN users u ON s.user_id = u.id
		WHERE s.id = ? AND s.expires_at > ?`,
		[sessionId, now] as InArgs
	);

	if (result.rows.length === 0) {
		return null;
	}

	const row = result.rows[0];

	return {
		id: row[0] as string,
		user_id: row[1] as string,
		expires_at: new Date((row[2] as number) * 1000),
		user: {
			id: row[3] as string,
			email: row[4] as string,
			full_name: row[5] as string,
			email_verified: row[6] as number,
			created_at: new Date((row[7] as number) * 1000),
			updated_at: new Date((row[8] as number) * 1000)
		}
	};
}

export async function invalidateSession(sessionId: string): Promise<void> {
	await executeQuery('DELETE FROM sessions WHERE id = ?', [sessionId] as InArgs);
}

export async function invalidateAllUserSessions(userId: string): Promise<void> {
	await executeQuery('DELETE FROM sessions WHERE user_id = ?', [userId] as InArgs);
}

// Email verification functions
export async function createEmailVerificationToken(userId: string, email: string): Promise<string> {
	const tokenId = generateId();
	const expiresAt = Math.floor(Date.now() / 1000) + 24 * 60 * 60; // 24 hours
	const now = Math.floor(Date.now() / 1000);

	// Delete existing tokens for this user
	await executeQuery('DELETE FROM email_verification_tokens WHERE user_id = ?', [userId] as InArgs);

	// Create new token
	await executeQuery(
		'INSERT INTO email_verification_tokens (id, user_id, email, expires_at, created_at) VALUES (?, ?, ?, ?, ?)',
		[tokenId, userId, email.toLowerCase(), expiresAt, now] as InArgs
	);

	return tokenId;
}

export async function validateEmailVerificationToken(
	tokenId: string
): Promise<{ userId: string; email: string } | null> {
	const now = Math.floor(Date.now() / 1000);

	// Delete expired tokens first
	await executeQuery('DELETE FROM email_verification_tokens WHERE expires_at <= ?', [
		now
	] as InArgs);

	const result = await executeQuery(
		'SELECT user_id, email FROM email_verification_tokens WHERE id = ? AND expires_at > ?',
		[tokenId, now] as InArgs
	);

	if (result.rows.length === 0) {
		return null;
	}

	const row = result.rows[0];
	return {
		userId: row[0] as string,
		email: row[1] as string
	};
}

export async function markEmailAsVerified(userId: string): Promise<void> {
	const now = Math.floor(Date.now() / 1000);

	await executeQuery('UPDATE users SET email_verified = 1, updated_at = ? WHERE id = ?', [
		now,
		userId
	] as InArgs);

	// Delete all verification tokens for this user
	await executeQuery('DELETE FROM email_verification_tokens WHERE user_id = ?', [userId] as InArgs);
}

// Cookie helpers
export function setSessionCookie(cookies: any, sessionId: string, expiresAt: Date): void {
	cookies.set('session', sessionId, {
		path: '/',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		expires: expiresAt
	});
}

export function deleteSessionCookie(cookies: any): void {
	cookies.delete('session', {
		path: '/'
	});
}
