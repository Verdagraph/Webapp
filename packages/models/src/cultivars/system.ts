/**
 * The cultivar collection every garden inherits from. It is owned by no user and no garden:
 * the permission rules only let a user write collections they own or administer, so only
 * a trusted seed using the service token can create or change it, while its PUBLIC visibility
 * lets everyone read it.
 */
export const DEFAULT_CULTIVAR_COLLECTION_ID = 'west-coast-seeds';
