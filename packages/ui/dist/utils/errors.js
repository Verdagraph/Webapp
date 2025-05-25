import { toast } from 'svelte-sonner';
import {} from '@vdg-webapp/models';
/**
 * Provides common error handling for AppErrors.
 * Renders a toast for every nonFormError
 * @param errors AppErrors.
 */
export function handleErrors(errors) {
    if (errors.nonFormErrors) {
        for (const errorMessage of errors.nonFormErrors) {
            /** Toast */
            toast.error(errorMessage);
        }
    }
}
