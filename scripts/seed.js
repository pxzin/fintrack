import { seedDatabase } from '../src/lib/server/seed.js';

seedDatabase()
	.then(() => {
		console.warn('✅ Seed completed successfully');
		process.exit(0);
	})
	.catch((error) => {
		console.error('❌ Seed failed:', error);
		process.exit(1);
	});
