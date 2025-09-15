import { getUserByEmail, createUser } from './auth';
import { runMigrations } from './migrate';

export async function seedDatabase() {
	console.log('🌱 Seeding database...');

	try {
		// Run migrations first
		await runMigrations();

		// Check if initial user already exists
		const existingUser = await getUserByEmail('email@email.com');

		if (existingUser) {
			console.log('👤 Initial user already exists: email@email.com');
			return;
		}

		// Create initial user
		console.log('👤 Creating initial user: email@email.com');
		await createUser('email@email.com', 'mudar123', 'Usuário Inicial');

		console.log('✅ Database seeded successfully');
		console.log('📧 Login: email@email.com');
		console.log('🔐 Password: mudar123');
	} catch (error) {
		console.error('❌ Database seeding failed:', error);
		throw error;
	}
}

// Run seed if called directly
if (import.meta.url.endsWith(process.argv[1])) {
	seedDatabase()
		.then(() => process.exit(0))
		.catch(() => process.exit(1));
}
