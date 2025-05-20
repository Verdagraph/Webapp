import { Schema as S } from '@triplit/client';
export const roles = {
    anon: {
        match: {
            'x-triplit-token-type': 'anon'
        }
    },
    user: {
        match: {
            type: 'user',
            accountId: '$accountId',
            profileId: '$profileId',
            username: '$username'
        }
    }
};
export const userSchema = S.Collections({
    /** User profiles. */
    profiles: {
        schema: S.Schema({
            id: S.Id(),
            /** Username. Unique and used within the app to search for users. */
            username: S.String(),
            /** Date of user creation. */
            createdAt: S.Date({ default: S.Default.now() })
        }),
        /** Profile objects can only be modified by the server but viewed by anyone. */
        permissions: {
            anon: {
                read: {
                    filter: [true]
                }
            },
            user: {
                read: {
                    filter: [true]
                }
            }
        }
    },
    /** User accounts. */
    accounts: {
        schema: S.Schema({
            id: S.Id(),
            /** The ID of the associated profile. */
            profileId: S.String(),
            /** Hashed password */
            passwordHash: S.String(),
            /** Primary email address. Only verified emails use this attribute. */
            verifiedEmail: S.String({ nullable: true }),
            /**
             * Secondary email. Used to avoid replacing primary email when switching emails.
             * Upon verification, should be nulled and used to set primaryEmail.
             */
            unverifiedEmail: S.Record({
                /** Address of the email. */
                address: S.String({ nullable: true, default: null }),
                /** JWT confirmation token which is sent to the user for verification. */
                token: S.String({ nullable: true, default: null })
            }),
            /** JWT confirmation key used to confirm a password reset. */
            passwordResetToken: S.String({ nullable: true, default: null }),
            /** Set to false for inactive users. */
            isActive: S.Boolean({ default: true })
        }),
        relationships: {
            profile: S.RelationById('profiles', '$profileId')
        },
        /** Accounts objects can only be modified by the server and viewed by the user. */
        permissions: {
            user: {
                read: { filter: [['id', '=', '$role.accountId']] }
            }
        }
    }
});
//# sourceMappingURL=schema.js.map