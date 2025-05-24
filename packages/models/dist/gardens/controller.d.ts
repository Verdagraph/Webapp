import { type GardenCreateCommand, type GardenMembershipAcceptCommand, type GardenMembershipCreateCommand, type GardenMembershipDeleteCommand, type GardenMembershipRevokeCommand, type GardenMembershipRoleChangeCommand } from '@vdg-webapp/models';
import type { Garden, User } from '@vdg-webapp/models';
import { type ActionType } from '$lib/permissions';
import { type ControllerContext } from '../controller.js';
/** Helpers. */
/**
 * Given a garden and an action, retrieve the client
 * and throw an error if the client does not have at least
 * that role.
 * @param gardenId The garden to retrieve.
 * @param action The action to authorize for.
 * @returns The client and garden objects.
 */
export declare function requireRole(gardenId: string, action: ActionType, ctx: ControllerContext): Promise<{
    client: User;
    garden: Garden;
}>;
/** Commands. */
/**
 * Creates a new garden.
 */
export declare const gardenCreate: {
    schema: import("zod").ZodObject<{
        id: import("zod").ZodString;
        name: import("zod").ZodString;
        description: import("zod").ZodDefault<import("zod").ZodString>;
        visibility: import("zod").ZodDefault<import("zod").ZodEnum<["HIDDEN", "UNLISTED", "PUBLIC"]>>;
        adminInvites: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
        editorInvites: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
        viewerInvites: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        id: string;
        name: string;
        visibility: "HIDDEN" | "UNLISTED" | "PUBLIC";
        description: string;
        adminInvites: string[];
        editorInvites: string[];
        viewerInvites: string[];
    }, {
        id: string;
        name: string;
        visibility?: "HIDDEN" | "UNLISTED" | "PUBLIC" | undefined;
        description?: string | undefined;
        adminInvites?: string[] | undefined;
        editorInvites?: string[] | undefined;
        viewerInvites?: string[] | undefined;
    }>;
    mutation: (data: GardenCreateCommand) => Promise<Garden>;
};
/**
 * Invites users to an existing garden.
 */
export declare const gardenMembershipCreate: {
    schema: import("zod").ZodObject<{
        gardenId: import("zod").ZodString;
        adminInvites: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
        editorInvites: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
        viewerInvites: import("zod").ZodDefault<import("zod").ZodArray<import("zod").ZodString, "many">>;
    }, "strip", import("zod").ZodTypeAny, {
        gardenId: string;
        adminInvites: string[];
        editorInvites: string[];
        viewerInvites: string[];
    }, {
        gardenId: string;
        adminInvites?: string[] | undefined;
        editorInvites?: string[] | undefined;
        viewerInvites?: string[] | undefined;
    }>;
    mutation: (data: GardenMembershipCreateCommand) => Promise<void>;
};
/**
 * Sends a garden membership acceptance request.
 */
export declare const gardenMembershipAccept: {
    schema: import("zod").ZodObject<{
        gardenId: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        gardenId: string;
    }, {
        gardenId: string;
    }>;
    mutation: (data: GardenMembershipAcceptCommand) => Promise<void>;
};
/**
 * Deletes a user's own membership in a garden.
 */
export declare const gardenMembershipDelete: {
    schema: import("zod").ZodObject<{
        gardenId: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        gardenId: string;
    }, {
        gardenId: string;
    }>;
    mutation: (data: GardenMembershipDeleteCommand) => Promise<void>;
};
/**
 * Revokes a membership of a different user.
 */
export declare const gardenMembershipRevoke: {
    schema: import("zod").ZodObject<{
        gardenId: import("zod").ZodString;
        profileId: import("zod").ZodString;
    }, "strip", import("zod").ZodTypeAny, {
        profileId: string;
        gardenId: string;
    }, {
        profileId: string;
        gardenId: string;
    }>;
    mutation: (data: GardenMembershipRevokeCommand) => Promise<void>;
};
/**
 * Revokes a membership of a different user.
 */
export declare const gardenMembershipRoleChange: {
    schema: import("zod").ZodObject<{
        gardenId: import("zod").ZodString;
        profileId: import("zod").ZodString;
        newRole: import("zod").ZodEnum<["ADMIN", "EDITOR", "VIEWER"]>;
    }, "strip", import("zod").ZodTypeAny, {
        profileId: string;
        gardenId: string;
        newRole: "ADMIN" | "EDITOR" | "VIEWER";
    }, {
        profileId: string;
        gardenId: string;
        newRole: "ADMIN" | "EDITOR" | "VIEWER";
    }>;
    mutation: (data: GardenMembershipRoleChangeCommand) => Promise<void>;
};
//# sourceMappingURL=controller.d.ts.map