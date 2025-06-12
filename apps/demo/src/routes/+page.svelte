<script lang="ts">
	import { goto } from '$app/navigation';

	import type { DemoId } from '../lib/demos';

	const defaultDemo: DemoId = 'workspace-editor';
	const url = '/demos/' + defaultDemo;

	goto(url);
</script>
