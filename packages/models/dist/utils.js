/**
 * Validates a single field against a schema.
 * @param value The value to validate.
 * @param schema The schema to validate it against.
 * @returns A list of errors, or undefined if validation was successful.
 */
export function validateField(value, schema) {
    const parseResult = schema.safeParse(value);
    if (parseResult.success) {
        return;
    }
    return parseResult.error.issues.map((error) => error.message);
}
//# sourceMappingURL=utils.js.map