<script lang="ts">
	import { z } from 'zod';

	import { Checkbox, Collapsible, Form, Input, Select } from '$core';
	import type { ControlProps } from '$core';
	import {
		type FormState,
		getSchemaDescription,
		getValueAtPath,
		setValueAtPath,
		unwrapForTraversal
	} from '$state/form';

	import SchemaFields from './SchemaFields.svelte';

	type Props = {
		/** The form whose data holds the values. */
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		form: FormState<z.ZodTypeAny, any>;
		/** The object schema to render a field for each key of. */
		schema: z.ZodTypeAny;
		/** Path of the object in the form data, e.g. "attributes.color". */
		path: string;
		/** Nested objects are rendered as collapsed sections. */
		depth?: number;
	};
	let { form, schema, path, depth = 0 }: Props = $props();

	const shape = $derived.by(() => {
		const unwrapped = unwrapForTraversal(schema);
		return unwrapped instanceof z.ZodObject
			? (unwrapped.shape as Record<string, z.ZodTypeAny>)
			: {};
	});

	/** Turns a camelCase key into a label. */
	function humanize(key: string): string {
		const spaced = key.replace(/([A-Z])/g, ' $1').trim();
		return spaced.charAt(0).toUpperCase() + spaced.slice(1);
	}

	/** Turns an enum option such as FULL_SUN into Full sun. */
	function humanizeOption(option: string): string {
		const spaced = option.toLowerCase().replace(/_/g, ' ');
		return spaced.charAt(0).toUpperCase() + spaced.slice(1);
	}

	/** A range is an object of exactly a min and a max: it is shown as two inline inputs. */
	function isRange(fieldSchema: z.ZodTypeAny): boolean {
		const unwrapped = unwrapForTraversal(fieldSchema);
		if (!(unwrapped instanceof z.ZodObject)) return false;
		const keys = Object.keys(unwrapped.shape);
		return keys.length === 2 && keys.includes('min') && keys.includes('max');
	}

	/** The element schema of an array field, if it is one. */
	function arrayElement(fieldSchema: z.ZodTypeAny): z.ZodTypeAny | null {
		const unwrapped = unwrapForTraversal(fieldSchema);
		return unwrapped instanceof z.ZodArray
			? unwrapForTraversal(unwrapped.element)
			: null;
	}

	/** Sets one end of a range, and removes the range once both ends are empty. */
	function setRangeEnd(rangePath: string, end: 'min' | 'max', raw: string) {
		setValueAtPath(
			`${rangePath}.${end}`,
			form.data,
			raw === '' ? undefined : Number(raw)
		);
		const range = getValueAtPath(rangePath, form.data) as
			| Record<string, unknown>
			| undefined;
		if (range && Object.keys(range).length === 0) {
			setValueAtPath(rangePath, form.data, undefined);
		}
	}

	/** Adds or removes one option of a list of enum values, and removes the list once empty. */
	function toggleOption(
		listPath: string,
		current: string[],
		option: string,
		checked: boolean
	) {
		const next = checked
			? [...current, option]
			: current.filter((entry) => entry !== option);
		setValueAtPath(listPath, form.data, next.length > 0 ? next : undefined);
	}

	/** The enum option value which clears an optional enum field. */
	const UNSET = '__unset';
</script>

{#each Object.entries(shape) as [key, fieldSchema] (key)}
	{@const fieldPath = `${path}.${key}`}
	{@const unwrapped = unwrapForTraversal(fieldSchema)}
	{@const description = getSchemaDescription(fieldSchema)}
	{@const value = getValueAtPath(fieldPath, form.data)}

	{#if isRange(fieldSchema)}
		<!-- A range: min and max side by side. -->
		<div class="grid grid-cols-2 gap-2">
			{#each ['min', 'max'] as const as end (end)}
				<Form.Field {form} name={`${fieldPath}.${end}` as never}>
					<Form.Control>
						{#snippet children({ props }: { props: ControlProps })}
							<Form.Label
								description={end === 'min' ? description : undefined}
								optional={true}
							>
								{humanize(key)} ({end})
							</Form.Label>
							<Input.Root
								{...props}
								type="number"
								step="any"
								value={(value as Record<string, number> | undefined)?.[end] ?? ''}
								oninput={(event) =>
									setRangeEnd(fieldPath, end, event.currentTarget.value)}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			{/each}
		</div>
	{:else if arrayElement(fieldSchema) instanceof z.ZodEnum}
		{@const options = (arrayElement(fieldSchema) as z.ZodEnum<[string, ...string[]]>)
			.options}
		{@const selected = (value as string[] | undefined) ?? []}
		<!-- A list of enum values: one checkbox each. -->
		<Form.Field {form} name={fieldPath as never}>
			<Form.Control>
				{#snippet children({ props }: { props: ControlProps })}
					<Form.Label {description} optional={true}>{humanize(key)}</Form.Label>
					<div class="flex flex-wrap gap-x-4 gap-y-2" id={props.id}>
						{#each options as option (option)}
							<label class="flex items-center gap-2 text-sm">
								<Checkbox.Root
									checked={selected.includes(option)}
									onCheckedChange={(checked) =>
										toggleOption(fieldPath, selected, option, checked)}
								/>
								{humanizeOption(option)}
							</label>
						{/each}
					</div>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	{:else if arrayElement(fieldSchema)}
		<!-- A list of text values: comma separated. -->
		<Form.Field {form} name={fieldPath as never}>
			<Form.Control>
				{#snippet children({ props }: { props: ControlProps })}
					<Form.Label {description} optional={true}
						>{humanize(key)} (comma separated)</Form.Label
					>
					<Input.Root
						{...props}
						type="text"
						value={((value as string[] | undefined) ?? []).join(', ')}
						oninput={(event) => {
							const entries = event.currentTarget.value
								.split(',')
								.map((entry) => entry.trim())
								.filter((entry) => entry.length > 0);
							setValueAtPath(
								fieldPath,
								form.data,
								entries.length > 0 ? entries : undefined
							);
						}}
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	{:else if unwrapped instanceof z.ZodObject}
		<!-- Nested objects: one collapsed section each. -->
		<Collapsible.Root class="border-neutral-5 rounded-md border">
			<div class="flex items-center justify-between px-3 py-2">
				<Collapsible.Trigger class="flex grow items-center gap-2 text-left">
					<span class="font-medium">{humanize(key)}</span>
					{#if value !== undefined}
						<span class="text-neutral-11 text-xs">set</span>
					{/if}
				</Collapsible.Trigger>
				{#if value !== undefined}
					<button
						type="button"
						class="text-neutral-11 hover:text-neutral-12 text-xs"
						onclick={() => setValueAtPath(fieldPath, form.data, undefined)}
					>
						Clear
					</button>
				{/if}
			</div>
			<Collapsible.Content class="space-y-4 px-3 pb-3">
				{#if description}
					<p class="text-neutral-11 text-sm">{description}</p>
				{/if}
				<SchemaFields {form} schema={fieldSchema} path={fieldPath} depth={depth + 1} />
			</Collapsible.Content>
		</Collapsible.Root>
	{:else if unwrapped instanceof z.ZodNumber || unwrapped instanceof z.ZodString || unwrapped instanceof z.ZodBoolean || unwrapped instanceof z.ZodEnum}
		<Form.Field {form} name={fieldPath as never}>
			<Form.Control>
				{#snippet children({ props }: { props: ControlProps })}
					<Form.Label {description} optional={true}>{humanize(key)}</Form.Label>
					{#if unwrapped instanceof z.ZodNumber}
						<Input.Root
							{...props}
							type="number"
							step="any"
							value={value ?? ''}
							oninput={(event) => {
								const raw = event.currentTarget.value;
								setValueAtPath(
									fieldPath,
									form.data,
									raw === '' ? undefined : Number(raw)
								);
							}}
						/>
					{:else if unwrapped instanceof z.ZodString}
						<Input.Root
							{...props}
							type="text"
							value={value ?? ''}
							oninput={(event) => {
								const raw = event.currentTarget.value;
								setValueAtPath(fieldPath, form.data, raw === '' ? undefined : raw);
							}}
						/>
					{:else if unwrapped instanceof z.ZodBoolean}
						<Checkbox.Root
							checked={value === true}
							onCheckedChange={(checked) =>
								setValueAtPath(fieldPath, form.data, checked)}
						/>
					{:else if unwrapped instanceof z.ZodEnum}
						<Select.Root
							type="single"
							value={(value as string | undefined) ?? UNSET}
							onValueChange={(selected) =>
								setValueAtPath(
									fieldPath,
									form.data,
									selected === UNSET ? undefined : selected
								)}
						>
							<Select.Trigger class="w-full" {...props}>
								{value ? humanizeOption(value as string) : 'Unset'}
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									<Select.Item value={UNSET} label="Unset">Unset</Select.Item>
									{#each unwrapped.options as option (option)}
										<Select.Item value={option} label={humanizeOption(option)}
											>{humanizeOption(option)}</Select.Item
										>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					{/if}
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	{/if}
{/each}
