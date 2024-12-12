import z from 'zod';

/** Field specifications. */
export const workspaceFields = {
	workspaceName: z
		.string()
		.trim()
		.min(3, 'Must be at least 3 characters.')
		.max(30, 'May be at most 30 characters.')
		.regex(
			/^[a-zA-Z0-9 _-]*$/,
			'Must contain only alphanumeric characters, spaces, hyphens, and  underscores.'
		)
		.describe(
			'Must be between 3 and 30 characters long and contain only alphanumeric characters, spaces, hyphens, and  underscores. Must be unique within a garden.'
		),
	workspaceDescription: z
		.string()
		.trim()
		.max(700, 'May be at most 1400 characters.')
		.describe('May be at most 1400 characters.')
};

/**
 * Command to create a new workspace.
 */
export const WorkspaceCreateCommand = z.object({
	gardenId: z.string(),
	name: workspaceFields.workspaceName,
	description: workspaceFields.workspaceDescription.optional()
});
