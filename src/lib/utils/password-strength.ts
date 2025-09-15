export interface PasswordStrength {
	score: number; // 0-4 (muito fraca, fraca, moderada, forte, muito forte)
	level: 'very-weak' | 'weak' | 'moderate' | 'strong' | 'very-strong';
	feedback: string[];
}

export function calculatePasswordStrength(password: string): PasswordStrength {
	if (!password) {
		return {
			score: 0,
			level: 'very-weak',
			feedback: []
		};
	}

	let score = 0;
	const feedback: string[] = [];

	// Length check
	if (password.length >= 8) {
		score += 1;
	} else {
		feedback.push('password.feedback.minLength');
	}

	if (password.length >= 12) {
		score += 1;
	}

	// Character variety checks
	const hasLowerCase = /[a-z]/.test(password);
	const hasUpperCase = /[A-Z]/.test(password);
	const hasNumbers = /\d/.test(password);
	const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

	if (hasLowerCase && hasUpperCase) {
		score += 1;
	} else {
		feedback.push('password.feedback.mixedCase');
	}

	if (hasNumbers) {
		score += 1;
	} else {
		feedback.push('password.feedback.includeNumbers');
	}

	if (hasSymbols) {
		score += 1;
	} else {
		feedback.push('password.feedback.includeSymbols');
	}

	// Common patterns check (reduce score)
	const commonPatterns = [
		/123456/,
		/password/i,
		/qwerty/i,
		/abc/i,
		/(.)\1{2,}/ // repeated characters
	];

	for (const pattern of commonPatterns) {
		if (pattern.test(password)) {
			score = Math.max(0, score - 1);
			feedback.push('password.feedback.avoidCommon');
			break;
		}
	}

	// Determine level based on score
	let level: PasswordStrength['level'];
	if (score === 0) {
		level = 'very-weak';
	} else if (score === 1) {
		level = 'weak';
	} else if (score === 2 || score === 3) {
		level = 'moderate';
	} else if (score === 4) {
		level = 'strong';
	} else {
		level = 'very-strong';
	}

	return {
		score: Math.min(5, score),
		level,
		feedback
	};
}

export function getPasswordStrengthColor(level: PasswordStrength['level']): string {
	switch (level) {
		case 'very-weak':
			return 'bg-red-500';
		case 'weak':
			return 'bg-orange-500';
		case 'moderate':
			return 'bg-yellow-500';
		case 'strong':
			return 'bg-green-500';
		case 'very-strong':
			return 'bg-green-600';
		default:
			return 'bg-gray-300';
	}
}

export function getPasswordStrengthWidth(score: number): string {
	const percentage = Math.max(10, (score / 5) * 100);
	return `${percentage}%`;
}
