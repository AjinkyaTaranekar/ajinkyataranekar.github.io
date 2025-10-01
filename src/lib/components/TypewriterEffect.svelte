<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		text: string;
		speed?: number;
		delay?: number;
		class?: string;
	}

	let { text, speed = 100, delay = 0, class: className = '' }: Props = $props();
	let displayText = $state('');
	let currentIndex = $state(0);
	let isComplete = $state(false);

	onMount(() => {
		const startTyping = () => {
			if (currentIndex < text.length) {
				displayText = text.substring(0, currentIndex + 1);
				currentIndex++;
				setTimeout(startTyping, speed);
			} else {
				isComplete = true;
			}
		};

		const delayTimer = setTimeout(() => {
			startTyping();
		}, delay);

		return () => {
			clearTimeout(delayTimer);
		};
	});
</script>

<span class={className}>
	{displayText}<span class="animate-pulse {isComplete ? 'opacity-0' : 'opacity-100'}">|</span>
</span>
