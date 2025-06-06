import z from 'zod';
/** Field specifications. */
const usernameSchema = z
    .string()
    .trim()
    .min(3, 'Must be at least 3 characters.')
    .max(50, 'May be at most 50 characters.')
    .regex(/^[a-zA-Z0-9-_]*$/, 'Must contain only letters, numbers, hyphens, and underscores.')
    .describe('Unique username to identify yourself in the application. May be changed later.');
const emailSchema = z
    .string()
    .email('Must be a valid email address.')
    .describe('Must be a valid email address.');
const passwordSchema = z
    .string()
    .min(6, 'Must be at least 6 characters.')
    .max(255, 'Must be at most 255 characters.')
    .describe('Must be between 6 and 255 characters long.');
export const userFields = { usernameSchema, emailSchema, passwordSchema };
/**
 * Command to authenticate a user.
 */
export const UserLoginCommandSchema = z.object({
    email: emailSchema,
    password: z.string()
});
/**
 * Command to register a new user.
 */
export const UserCreateCommandSchema = z
    .object({
    email: emailSchema,
    password1: passwordSchema,
    password2: passwordSchema,
    username: usernameSchema
})
    .refine((data) => data.password1 == data.password2, {
    message: 'Passwords must match',
    path: ['password2']
});
/**
 * Command to update a user.
 */
export const UserUpdateCommandSchema = z
    .object({
    newEmail: emailSchema.optional(),
    newPassword1: passwordSchema.optional(),
    newPassword2: passwordSchema.optional(),
    newUsername: usernameSchema.optional(),
    password: passwordSchema
})
    .refine((data) => data.newPassword1 == data.newPassword2, {
    message: 'Passwords must match',
    path: ['newPassword2']
});
/**
 * Command to request a verification email be sent.
 */
export const UserRequestEmailConfirmationCommandSchema = z.object({
    email: emailSchema
});
/**
 * Command to respond to a verification email.
 */
export const UserConfirmEmailConfirmationCommandSchema = z.object({
    token: z.string()
});
/**
 * Command to request a password reset email be sent.
 */
export const UserRequestPasswordResetCommandSchema = z.object({
    email: emailSchema
});
/**
 * Command to respont to a password reset email.
 */
export const UserConfirmPasswordResetCommandSchema = z
    .object({
    userId: z.string().nanoid(),
    token: z.string(),
    password1: passwordSchema,
    password2: passwordSchema
})
    .refine((data) => data.password1 == data.password2, {
    message: 'Passwords must match',
    path: ['password2']
});
//# sourceMappingURL=commands.js.map