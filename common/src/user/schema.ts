import { Schema as S, ClientSchema, Entity, Roles } from '@triplit/client';

export const roles: Roles = {
    user: {
      match: {
        type: 'user',
        uid: '$userId',
      },
    },
  };

export const userSchema = {
    profiles: {
        schema: S.Schema({
        id: S.Id(),
        /** Username. Unique and used within the app to search for users. */
        username: S.String(),
        /** Date of user creation. */
        createdAt: S.Date({ default: S.Default.now() }),
    }),
    
    /** Profile objects can only be modified by the server but viewed by anyone. */
    permissions: {
        user: {
            read: {
                filter: [true]
            }
        }
    }
    },
    accounts: {
        schema: S.Schema({
            id: S.Id(),

            /** The ID of the associated profile. */
            profileId: S.String(),
            profile: S.RelationOne('profiles', {
                where: [['id', '=', '$profileId']]
            }),

            /** Hashed password */
            passwordHash: S.String(),
        
            /** Primary email address. Only verified emails use this attribute. */
            verifiedEmail: S.Optional(S.String()),
        
            /** 
             * Secondary email. Used to avoid replacing primary email when switching emails. 
             * Upon verification, should be nulled and used to set primaryEmail.
             */
            unverifiedEmail: S.Optional(S.Record({
                /** Address of the email. */
                address: S.String(),
                /** JWT confirmation key which is sent to the user for verification. */
                confirmationKey: S.String()
            })),
        
            /** JWT confirmation key used to confirm a password reset. */
            passwordResetConfirmationKey: S.Optional(S.String()),
            
            /** Set to false for inactive users. */
            isActive: S.Boolean({default: true}),
        }),
    /** Accounts objects can only be modified by the server and viewed by the user. */
    permissions: {
        user: {
            read: {
                filter: [['id', '=', '$role.userId']]
            }
        }
    }
    }

} satisfies ClientSchema ;
export type UserProfile = Entity<typeof userSchema, 'profiles'>
export type UserAccount = Entity<typeof userSchema, 'accounts'>