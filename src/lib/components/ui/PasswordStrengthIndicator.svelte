<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { calculatePasswordStrength, type PasswordStrength } from '$lib/utils/password-strength';

	interface Props {
		password: string;
		class?: string;
	}

	const { password, class: className = '' }: Props = $props();

	const strength: PasswordStrength = $derived(calculatePasswordStrength(password));

	// Calculate width percentage for the progress bar
	const widthPercentage = $derived(Math.max(8, (strength.score / 5) * 100));

	// Function to get color for the progress bar
	function getBarColor(level: PasswordStrength['level']): string {
		switch (level) {
			case 'very-weak':
				return '#ef4444'; // red-500
			case 'weak':
				return '#f97316'; // orange-500
			case 'moderate':
				return '#eab308'; // yellow-500
			case 'strong':
				return '#22c55e'; // green-500
			case 'very-strong':
				return '#16a34a'; // green-600
			default:
				return '#9ca3af'; // gray-400
		}
	}

	function getStrengthLabel(level: PasswordStrength['level']): string {
		switch (level) {
			case 'very-weak':
				return $LL.auth.password.strength.levels.veryWeak();
			case 'weak':
				return $LL.auth.password.strength.levels.weak();
			case 'moderate':
				return $LL.auth.password.strength.levels.moderate();
			case 'strong':
				return $LL.auth.password.strength.levels.strong();
			case 'very-strong':
				return $LL.auth.password.strength.levels.veryStrong();
			default:
				return '';
		}
	}

	function getFeedbackText(feedbackKey: string): string {
		switch (feedbackKey) {
			case 'password.feedback.minLength':
				return $LL.auth.password.feedback.minLength();
			case 'password.feedback.mixedCase':
				return $LL.auth.password.feedback.mixedCase();
			case 'password.feedback.includeNumbers':
				return $LL.auth.password.feedback.includeNumbers();
			case 'password.feedback.includeSymbols':
				return $LL.auth.password.feedback.includeSymbols();
			case 'password.feedback.avoidCommon':
				return $LL.auth.password.feedback.avoidCommon();
			default:
				return feedbackKey;
		}
	}
</script>

{#if password}
	<div class="space-y-2 {className}">
		<!-- Strength bar -->
		<div class="space-y-1">
			<div class="flex items-center justify-between text-xs">
				<span class="text-gray-600 dark:text-gray-400">
					{$LL.auth.password.strength.title()}
				</span>
				<span
					class="font-medium"
					class:text-red-500={strength.level === 'very-weak'}
					class:text-orange-500={strength.level === 'weak'}
					class:text-yellow-500={strength.level === 'moderate'}
					class:text-green-500={strength.level === 'strong'}
					class:text-green-600={strength.level === 'very-strong'}
				>
					{getStrengthLabel(strength.level)}
				</span>
			</div>

			<!-- Progress bar -->
			<div
				style="width: 100%; height: 12px; background-color: #e5e7eb; border-radius: 6px; border: 1px solid #d1d5db; overflow: hidden;"
			>
				<div
					style="height: 100%; border-radius: 6px; background-color: {getBarColor(
						strength.level
					)}; width: {widthPercentage}%; transition: all 0.3s ease;"
				></div>
			</div>
		</div>

		<!-- Feedback -->
		{#if strength.feedback.length > 0}
			<div class="space-y-1">
				{#each strength.feedback as feedback (feedback)}
					<div class="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
						<span class="w-1 h-1 bg-gray-400 rounded-full"></span>
						<span>{getFeedbackText(feedback)}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
{/if}
