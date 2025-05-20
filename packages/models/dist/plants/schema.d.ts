import { type Entity, type QueryResult } from '@triplit/client';
/**
 *
 */
export declare const OriginEnumOptions: readonly ["DIRECT_SEED", "SEED_TO_TRANSPLANT", "SEEDLING_TO_TRANSPLANT"];
export declare const HarvestQualityEnumOptions: readonly ["COMPOST", "LOW", "MEDIUM", "HIGH", "PERFECT"];
export declare const plantSchema: {
    /** Harvest schema. */
    harvests: {
        schema: import("@triplit/client").RecordType<{
            id: import("@triplit/client").StringType<{
                nullable: false;
                default: {
                    func: string;
                    args: string[] | null;
                };
            }>;
            /** Garden the entity is located within - required for access control. */
            gardenId: import("@triplit/client").StringType<{}>;
            /** The date of the harvest. */
            date: import("@triplit/client").DateType<{}>;
            /** The mass of the harvest in kilograms. */
            mass: import("@triplit/client").TypeInterface<"number", {
                optional: true;
            }> & Omit<import("@triplit/client").NumberType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
            /**
             * The number of units. This may differ in meaning depending on the plant.
             * For example, for carrots, it could mean the number of roots.
             * For lettuce, it could mean the number of leaves.
             */
            units: import("@triplit/client").TypeInterface<"number", {
                optional: true;
            }> & Omit<import("@triplit/client").NumberType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
            /** The quality of the harvest. */
            quality: import("@triplit/client").TypeInterface<"string", {
                enum: ("COMPOST" | "LOW" | "MEDIUM" | "HIGH" | "PERFECT")[];
            } & {
                optional: true;
            }> & Omit<import("@triplit/client").StringType<{
                enum: ("COMPOST" | "LOW" | "MEDIUM" | "HIGH" | "PERFECT")[];
            }>, keyof import("@triplit/client").TypeInterface<string, {}>>;
            /** Optional description. */
            description: import("@triplit/client").StringType<{
                default: string;
            }>;
        }, {}>;
        relationships: {
            garden: {
                query: {
                    collectionName: "gardens";
                    where: any;
                };
                cardinality: "one";
            };
        };
        permissions: {
            anon: {
                read: {
                    /** Allow anonymous reads if the garden is not hidden. */
                    filter: ["garden.visibility", string, string][];
                };
            };
            user: {
                read: {
                    /** Allow reads if the garden is not hidden or the user is a member. */
                    filter: {
                        mod: "or";
                        filters: (["garden.visibility", string, string] | ["garden.adminIds", string, string] | ["garden.editorIds", string, string] | ["garden.viewerIds", string, string])[];
                    }[];
                };
                insert: {
                    /** Allow new harvests to be created by admins and editors. */
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                update: {
                    /** Restrict harvest updates to admins and editors. */
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                delete: {
                    /** Restrict harvest deletes to admins and editors. */
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
            };
        };
    };
    /** Lifespan schema. */
    lifespans: {
        schema: import("@triplit/client").RecordType<{
            id: import("@triplit/client").StringType<{
                nullable: false;
                default: {
                    func: string;
                    args: string[] | null;
                };
            }>;
            /** Garden the entity is located within - required for access control. */
            gardenId: import("@triplit/client").StringType<{}>;
            /** The origin of the lifespan. */
            origin: import("@triplit/client").StringType<{
                enum: ("DIRECT_SEED" | "SEED_TO_TRANSPLANT" | "SEEDLING_TO_TRANSPLANT")[];
            }>;
            /** The geometries of the lifespan. */
            geometryHistoryId: import("@triplit/client").TypeInterface<"string", {
                optional: true;
            }> & Omit<import("@triplit/client").StringType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
            /** The locations of the lifespan& */
            locationHistoryId: import("@triplit/client").TypeInterface<"string", {
                optional: true;
            }> & Omit<import("@triplit/client").StringType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
            /** The dates of the lifespan. */
            dates: import("@triplit/client").RecordType<{
                /** The date at which the plant is seeded. */
                seedDate: import("@triplit/client").TypeInterface<"date", {
                    optional: true;
                }> & Omit<import("@triplit/client").DateType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                /** The date at which the seed germinated. */
                germDate: import("@triplit/client").TypeInterface<"date", {
                    optional: true;
                }> & Omit<import("@triplit/client").DateType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                /** The date at which the plant is removed from the space. */
                expiryDate: import("@triplit/client").TypeInterface<"date", {
                    optional: true;
                }> & Omit<import("@triplit/client").DateType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                /**
                 * This is defined only for biennial or perennial plants.
                 * A set of dates which the plant became dormant until the following year.
                 * For example, includes the dates a berry bush has stopped producing fruit and vegetation.
                 */
                dormancyDates: import("@triplit/client").TypeInterface<"set", {
                    optional: true;
                }> & Omit<import("@triplit/client").SetType<import("@triplit/client").DateType<{}>, {}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                /**
                 * This is defined only for biennial or perennial plants.
                 * A set of dates which the plant exited dormancy for the year.
                 * For example, includes the dates a berry bush has begun vegetative growth again.
                 */
                growthDates: import("@triplit/client").TypeInterface<"set", {
                    optional: true;
                }> & Omit<import("@triplit/client").SetType<import("@triplit/client").DateType<{}>, {}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
            }, {}>;
            /** A set of harvests over the lifespan. */
            harvestIds: import("@triplit/client").SetType<import("@triplit/client").StringType<{}>, {}>;
        }, {}>;
        relationships: {
            garden: {
                query: {
                    collectionName: "gardens";
                    where: any;
                };
                cardinality: "one";
            };
            geometryHistory: {
                query: {
                    collectionName: "geometryHistories";
                    where: any;
                };
                cardinality: "one";
            };
            locationHistory: {
                query: {
                    collectionName: "locationHistories";
                    where: any;
                };
                cardinality: "one";
            };
            harvests: {
                query: {
                    collectionName: "harvests";
                } & {
                    where: ["id", string, string][];
                };
                cardinality: "many";
            };
        };
        permissions: {
            anon: {
                read: {
                    /** Allow anonymous reads if the garden is not hidden. */
                    filter: ["garden.visibility", string, string][];
                };
            };
            user: {
                read: {
                    /** Allow reads if the garden is not hidden or the user is a member. */
                    filter: {
                        mod: "or";
                        filters: (["garden.visibility", string, string] | ["garden.adminIds", string, string] | ["garden.editorIds", string, string] | ["garden.viewerIds", string, string])[];
                    }[];
                };
                insert: {
                    /** Allow new lifespans to be created by admins and editors. */
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                update: {
                    /** Restrict lifespans updates to admins and editors. */
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                delete: {
                    /** Restrict lifespans deletes to admins and editors. */
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
            };
        };
    };
    /** Plant schema. */
    plants: {
        schema: import("@triplit/client").RecordType<{
            id: import("@triplit/client").StringType<{
                nullable: false;
                default: {
                    func: string;
                    args: string[] | null;
                };
            }>;
            /** Garden the entity is located within - required for access control. */
            gardenId: import("@triplit/client").StringType<{}>;
            /**
             * The name correlating with one of the common names specified by a cultivar.
             * Will match the plant with a cultivar in one of the garden's cultivar collections.
             */
            cultivarName: import("@triplit/client").StringType<{}>;
            /** A set of cultivar attributes to override those from the collections. */
            cultivarAttributes: import("@triplit/client").RecordType<{
                annualLifeCycle: import("@triplit/client").TypeInterface<"record", {
                    optional: true;
                }> & Omit<import("@triplit/client").RecordType<{
                    sowToGerm: import("@triplit/client").TypeInterface<"number", {
                        optional: true;
                    }> & Omit<import("@triplit/client").NumberType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                    germToTransplant: import("@triplit/client").TypeInterface<"number", {
                        optional: true;
                    }> & Omit<import("@triplit/client").NumberType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                    germToFirstHarvest: import("@triplit/client").TypeInterface<"number", {
                        optional: true;
                    }> & Omit<import("@triplit/client").NumberType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                    firstToLastHarvest: import("@triplit/client").TypeInterface<"number", {
                        optional: true;
                    }> & Omit<import("@triplit/client").NumberType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                }, {}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                frostDatePlantingWindows: import("@triplit/client").TypeInterface<"record", {
                    optional: true;
                }> & Omit<import("@triplit/client").RecordType<{
                    lastFrostWindowOpen: import("@triplit/client").TypeInterface<"number", {
                        optional: true;
                    }> & Omit<import("@triplit/client").NumberType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                    lastFrostWindowClose: import("@triplit/client").TypeInterface<"number", {
                        optional: true;
                    }> & Omit<import("@triplit/client").NumberType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                    firstFrostWindowOpen: import("@triplit/client").TypeInterface<"number", {
                        optional: true;
                    }> & Omit<import("@triplit/client").NumberType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                    firstFrostWindowClose: import("@triplit/client").TypeInterface<"number", {
                        optional: true;
                    }> & Omit<import("@triplit/client").NumberType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                }, {}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                origin: import("@triplit/client").TypeInterface<"record", {
                    optional: true;
                }> & Omit<import("@triplit/client").RecordType<{
                    transplantable: import("@triplit/client").TypeInterface<"boolean", {
                        optional: true;
                    }> & Omit<import("@triplit/client").BooleanType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                }, {}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
            }, {}>;
            /** Lifespan attributes populated from the expected attributes based on the cultivar. */
            expectedLifespanId: import("@triplit/client").StringType<{}>;
            /** Lifespan attributes populated by observations of users. */
            recordedLifespanId: import("@triplit/client").StringType<{}>;
            /** If true, this plant entity represents multiple distinct plants which are managed together. */
            aggregate: import("@triplit/client").BooleanType<{
                default: boolean;
            }>;
        }, {}>;
        relationships: {
            garden: {
                query: {
                    collectionName: "gardens";
                    where: any;
                };
                cardinality: "one";
            };
            expectedLifespan: {
                query: {
                    collectionName: "lifespans";
                    where: any;
                };
                cardinality: "one";
            };
            recordedLifespan: {
                query: {
                    collectionName: "lifespans";
                    where: any;
                };
                cardinality: "one";
            };
        };
        permissions: {
            anon: {
                read: {
                    /** Allow anonymous reads if the garden is not hidden. */
                    filter: ["garden.visibility", string, string][];
                };
            };
            user: {
                read: {
                    /** Allow reads if the garden is not hidden or the user is a member. */
                    filter: {
                        mod: "or";
                        filters: (["garden.visibility", string, string] | ["garden.adminIds", string, string] | ["garden.editorIds", string, string] | ["garden.viewerIds", string, string])[];
                    }[];
                };
                insert: {
                    /** Allow new location history to be created by admins and editors. */
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                update: {
                    /** Restrict location history updates to admins. */
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                delete: {
                    /** Restrict location histories deletes to admins. */
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
            };
        };
    };
    /** Plant groups. */
    plantGroups: {
        schema: import("@triplit/client").RecordType<{
            id: import("@triplit/client").StringType<{
                nullable: false;
                default: {
                    func: string;
                    args: string[] | null;
                };
            }>;
            /** Garden the entity is located within - required for access control. */
            gardenId: import("@triplit/client").StringType<{}>;
            /** Name. */
            name: import("@triplit/client").StringType<{}>;
            /** A set of plants contained with the group. */
            plantIds: import("@triplit/client").SetType<import("@triplit/client").StringType<{}>, {}>;
            /** Optional description. */
            description: import("@triplit/client").StringType<{
                default: string;
            }>;
        }, {}>;
        relationships: {
            garden: {
                query: {
                    collectionName: "gardens";
                    where: any;
                };
                cardinality: "one";
            };
            plants: {
                query: {
                    collectionName: "plants";
                } & {
                    where: ["id", string, string][];
                };
                cardinality: "many";
            };
        };
        permissions: {
            anon: {
                read: {
                    /** Allow anonymous reads if the garden is not hidden. */
                    filter: ["garden.visibility", string, string][];
                };
            };
            user: {
                read: {
                    /** Allow reads if the garden is not hidden or the user is a member. */
                    filter: {
                        mod: "or";
                        filters: (["garden.visibility", string, string] | ["garden.adminIds", string, string] | ["garden.editorIds", string, string] | ["garden.viewerIds", string, string])[];
                    }[];
                };
                insert: {
                    /** Allow new location history to be created by admins and editors. */
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                update: {
                    /** Restrict location history updates to admins. */
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                delete: {
                    /** Restrict location histories deletes to admins. */
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
            };
        };
    };
    environments: {
        schema: import("@triplit/client").RecordType<{
            id: import("@triplit/client").StringType<{
                nullable: false;
                default: {
                    func: string;
                    args: string[] | null;
                };
            }>;
            name: import("@triplit/client").StringType<{}>;
            description: import("@triplit/client").StringType<{
                default: string;
            }>;
            parentType: import("@triplit/client").StringType<{
                enum: ("GARDEN" | "WORKSPACE" | "PLANTING_AREA" | "INDEPENDENT")[];
                default: string;
            }>;
            gardenId: import("@triplit/client").StringType<{}>;
            workspaceIds: import("@triplit/client").TypeInterface<"set", {
                optional: true;
            }> & Omit<import("@triplit/client").SetType<import("@triplit/client").StringType<{}>, {}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
            plantingAreaIds: import("@triplit/client").TypeInterface<"set", {
                optional: true;
            }> & Omit<import("@triplit/client").SetType<import("@triplit/client").StringType<{}>, {}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
            geometryHistoryId: import("@triplit/client").TypeInterface<"string", {
                optional: true;
            }> & Omit<import("@triplit/client").StringType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
            locationHistoryId: import("@triplit/client").TypeInterface<"string", {
                optional: true;
            }> & Omit<import("@triplit/client").StringType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
            inherit: import("@triplit/client").BooleanType<{
                default: boolean;
            }>;
            attributes: import("@triplit/client").RecordType<{
                frostDates: import("@triplit/client").TypeInterface<"record", {
                    optional: true;
                }> & Omit<import("@triplit/client").RecordType<{
                    lastFrostDate: import("@triplit/client").TypeInterface<"date", {
                        optional: true;
                    }> & Omit<import("@triplit/client").DateType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                    firstFrostDate: import("@triplit/client").TypeInterface<"date", {
                        optional: true;
                    }> & Omit<import("@triplit/client").DateType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                }, {}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                annualTemperature: import("@triplit/client").TypeInterface<"record", {
                    optional: true;
                }> & Omit<import("@triplit/client").RecordType<{
                    minimum: import("@triplit/client").TypeInterface<"number", {
                        optional: true;
                    }> & Omit<import("@triplit/client").NumberType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                    maximum: import("@triplit/client").TypeInterface<"number", {
                        optional: true;
                    }> & Omit<import("@triplit/client").NumberType<{}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
                }, {}>, keyof import("@triplit/client").TypeInterface<string, {}>>;
            }, {}>;
        }, {}>;
        relationships: {
            garden: {
                query: {
                    collectionName: "gardens";
                    where: any;
                };
                cardinality: "one";
            };
            workspaces: {
                query: {
                    collectionName: "workspaces";
                } & {
                    where: ["id", string, string][];
                };
                cardinality: "many";
            };
            plantingAreas: {
                query: {
                    collectionName: "plantingAreas";
                } & {
                    where: ["id", string, string][];
                };
                cardinality: "many";
            };
            geometriHistory: {
                query: {
                    collectionName: "geometryHistories";
                    where: any;
                };
                cardinality: "one";
            };
            locationHistory: {
                query: {
                    collectionName: "locationHistories";
                    where: any;
                };
                cardinality: "one";
            };
        };
        permissions: {
            anon: {
                read: {
                    filter: ["garden.visibility", string, string][];
                };
            };
            user: {
                read: {
                    filter: {
                        mod: "or";
                        filters: (["garden.visibility", string, string] | ["garden.adminIds", string, string] | ["garden.editorIds", string, string] | ["garden.viewerIds", string, string])[];
                    }[];
                };
                insert: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                update: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                delete: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
            };
        };
    };
    coordinates: {
        schema: import("@triplit/client").RecordType<{
            id: import("@triplit/client").StringType<{
                nullable: false;
                default: {
                    func: string;
                    args: string[] | null;
                };
            }>;
            gardenId: import("@triplit/client").StringType<{}>;
            x: import("@triplit/client").NumberType<{}>;
            y: import("@triplit/client").NumberType<{}>;
            z: import("@triplit/client").NumberType<{
                nullable: true;
                default: number;
            }>;
            createdAt: import("@triplit/client").DateType<{
                default: {
                    func: string;
                    args: null;
                };
            }>;
        }, {}>;
        relationships: {
            garden: {
                query: {
                    collectionName: "gardens";
                    where: any;
                };
                cardinality: "one";
            };
        };
        permissions: {
            anon: {
                read: {
                    filter: ["garden.visibility", string, string][];
                };
            };
            user: {
                read: {
                    filter: {
                        mod: "or";
                        filters: (["garden.visibility", string, string] | ["garden.adminIds", string, string] | ["garden.editorIds", string, string] | ["garden.viewerIds", string, string])[];
                    }[];
                };
                insert: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                update: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                delete: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
            };
        };
    };
    geometries: {
        schema: import("@triplit/client").RecordType<{
            id: import("@triplit/client").StringType<{
                nullable: false;
                default: {
                    func: string;
                    args: string[] | null;
                };
            }>;
            gardenId: import("@triplit/client").StringType<{}>;
            type: import("@triplit/client").StringType<{
                enum: ("RECTANGLE" | "POLYGON" | "ELLIPSE" | "LINES")[];
            }>;
            date: import("@triplit/client").DateType<{}>;
            scaleFactor: import("@triplit/client").NumberType<{
                default: number;
            }>;
            rotation: import("@triplit/client").NumberType<{
                default: number;
            }>;
            rectangleLength: import("@triplit/client").NumberType<{
                default: number;
            }>;
            rectangleWidth: import("@triplit/client").NumberType<{
                default: number;
            }>;
            polygonNumSides: import("@triplit/client").NumberType<{
                default: number;
            }>;
            polygonRadius: import("@triplit/client").NumberType<{
                default: number;
            }>;
            ellipseLength: import("@triplit/client").NumberType<{
                default: number;
            }>;
            ellipseWidth: import("@triplit/client").NumberType<{
                default: number;
            }>;
            linesCoordinateIds: import("@triplit/client").SetType<import("@triplit/client").StringType<{}>, {
                default: {
                    func: string;
                    args: null;
                };
            }>;
            linesClosed: import("@triplit/client").BooleanType<{
                default: boolean;
            }>;
        }, {}>;
        relationships: {
            garden: {
                query: {
                    collectionName: "gardens";
                    where: any;
                };
                cardinality: "one";
            };
            linesCoordinates: {
                query: {
                    collectionName: "coordinates";
                } & {
                    where: ["id", string, string][];
                    order: ["createdAt", "ASC"][];
                };
                cardinality: "many";
            };
        };
        permissions: {
            anon: {
                read: {
                    filter: ["garden.visibility", string, string][];
                };
            };
            user: {
                read: {
                    filter: {
                        mod: "or";
                        filters: (["garden.visibility", string, string] | ["garden.adminIds", string, string] | ["garden.editorIds", string, string] | ["garden.viewerIds", string, string])[];
                    }[];
                };
                insert: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                update: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                delete: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
            };
        };
    };
    geometryHistories: {
        schema: import("@triplit/client").RecordType<{
            id: import("@triplit/client").StringType<{
                nullable: false;
                default: {
                    func: string;
                    args: string[] | null;
                };
            }>;
            gardenId: import("@triplit/client").StringType<{}>;
            geometryIds: import("@triplit/client").SetType<import("@triplit/client").StringType<{}>, {}>;
        }, {}>;
        relationships: {
            garden: {
                query: {
                    collectionName: "gardens";
                    where: any;
                };
                cardinality: "one";
            };
            geometries: {
                query: {
                    collectionName: "geometries";
                } & {
                    where: ["id", string, string][];
                    order: ["date", "ASC"][];
                };
                cardinality: "many";
            };
        };
        permissions: {
            anon: {
                read: {
                    filter: ["garden.visibility", string, string][];
                };
            };
            user: {
                read: {
                    filter: {
                        mod: "or";
                        filters: (["garden.visibility", string, string] | ["garden.adminIds", string, string] | ["garden.editorIds", string, string] | ["garden.viewerIds", string, string])[];
                    }[];
                };
                insert: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                update: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                delete: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
            };
        };
    };
    locations: {
        schema: import("@triplit/client").RecordType<{
            id: import("@triplit/client").StringType<{
                nullable: false;
                default: {
                    func: string;
                    args: string[] | null;
                };
            }>;
            gardenId: import("@triplit/client").StringType<{}>;
            workspaceId: import("@triplit/client").StringType<{}>;
            x: import("@triplit/client").NumberType<{}>;
            y: import("@triplit/client").NumberType<{}>;
            z: import("@triplit/client").NumberType<{
                nullable: true;
                default: number;
            }>;
            date: import("@triplit/client").DateType<{}>;
        }, {}>;
        relationships: {
            garden: {
                query: {
                    collectionName: "gardens";
                    where: any;
                };
                cardinality: "one";
            };
            workspace: {
                query: {
                    collectionName: "workspaces";
                    where: any;
                };
                cardinality: "one";
            };
        };
        permissions: {
            anon: {
                read: {
                    filter: ["garden.visibility", string, string][];
                };
            };
            user: {
                read: {
                    filter: {
                        mod: "or";
                        filters: (["garden.visibility", string, string] | ["garden.adminIds", string, string] | ["garden.editorIds", string, string] | ["garden.viewerIds", string, string])[];
                    }[];
                };
                insert: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                update: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                delete: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
            };
        };
    };
    locationHistories: {
        schema: import("@triplit/client").RecordType<{
            id: import("@triplit/client").StringType<{
                nullable: false;
                default: {
                    func: string;
                    args: string[] | null;
                };
            }>;
            gardenId: import("@triplit/client").StringType<{}>;
            locationIds: import("@triplit/client").SetType<import("@triplit/client").StringType<{}>, {}>;
            workspaceIds: import("@triplit/client").SetType<import("@triplit/client").StringType<{}>, {}>;
        }, {}>;
        relationships: {
            garden: {
                query: {
                    collectionName: "gardens";
                    where: any;
                };
                cardinality: "one";
            };
            locations: {
                query: {
                    collectionName: "locations";
                } & {
                    where: ["id", string, string][];
                    order: ["date", "ASC"][];
                };
                cardinality: "many";
            };
        };
        permissions: {
            anon: {
                read: {
                    filter: ["garden.visibility", string, string][];
                };
            };
            user: {
                read: {
                    filter: {
                        mod: "or";
                        filters: (["garden.visibility", string, string] | ["garden.adminIds", string, string] | ["garden.editorIds", string, string] | ["garden.viewerIds", string, string])[];
                    }[];
                };
                insert: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                update: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
                delete: {
                    filter: {
                        mod: "or";
                        filters: (["garden.adminIds", string, string] | ["garden.editorIds", string, string])[];
                    }[];
                };
            };
        };
    };
    plantingAreas: {
        schema: import("@triplit/client").RecordType<{
            id: import("@triplit/client").StringType<{
                nullable: false;
                default: {
                    func: string;
                    args: string[] | null;
                };
            }>;
            gardenId: import("@triplit/client").StringType<{}>;
            name: import("@triplit/client").StringType<{}>;
            geometryId: import("@triplit/client").StringType<{}>;
            locationHistoryId: import("@triplit/client").StringType<{}>;
            depth: import("@triplit/client").NumberType<{
                default: number;
            }>;
            description: import("@triplit/client").StringType<{
                default: string;
            }>;
        }, {}>;
        relationships: {
            garden: {
                query: {
                    collectionName: "gardens";
                    where: any;
                };
                cardinality: "one";
            };
            geometry: {
                query: {
                    collectionName: "geometries";
                    where: any;
                };
                cardinality: "one";
            };
            locationHistory: {
                query: {
                    collectionName: "locationHistories";
                    where: any;
                };
                cardinality: "one";
            };
        };
        permissions: {
            anon: {
                read: {
                    filter: ["garden.visibility", string, string][];
                };
            };
            user: {
                read: {
                    filter: {
                        mod: "or";
                        filters: (["garden.visibility", string, string] | ["garden.adminIds", string, string] | ["garden.editorIds", string, string] | ["garden.viewerIds", string, string])[];
                    }[];
                };
                insert: {
                    filter: ["garden.adminIds", string, string][];
                };
                update: {
                    filter: ["garden.adminIds", string, string][];
                };
                delete: {
                    filter: ["garden.adminIds", string, string][];
                };
            };
        };
    };
    workspaces: {
        schema: import("@triplit/client").RecordType<{
            id: import("@triplit/client").StringType<{
                nullable: false;
                default: {
                    func: string;
                    args: string[] | null;
                };
            }>;
            gardenId: import("@triplit/client").StringType<{}>;
            name: import("@triplit/client").StringType<{}>;
            slug: import("@triplit/client").StringType<{}>;
            description: import("@triplit/client").StringType<{
                default: string;
            }>;
        }, {}>;
        relationships: {
            garden: {
                query: {
                    collectionName: "gardens";
                    where: any;
                };
                cardinality: "one";
            };
        };
        permissions: {
            anon: {
                read: {
                    filter: ["garden.visibility", string, string][];
                };
            };
            user: {
                read: {
                    filter: {
                        mod: "or";
                        filters: (["garden.visibility", string, string] | ["garden.adminIds", string, string] | ["garden.editorIds", string, string] | ["garden.viewerIds", string, string])[];
                    }[];
                };
                insert: {
                    filter: ["garden.adminIds", string, string][];
                };
                update: {
                    filter: ["garden.adminIds", string, string][];
                };
                delete: {
                    filter: ["garden.adminIds", string, string][];
                };
            };
        };
    };
    gardens: {
        schema: import("@triplit/client").RecordType<{
            id: import("@triplit/client").StringType<{
                nullable: false;
                default: {
                    func: string;
                    args: string[] | null;
                };
            }>;
            name: import("@triplit/client").StringType<{}>;
            visibility: import("@triplit/client").StringType<{
                enum: ("HIDDEN" | "UNLISTED" | "PUBLIC")[];
            }>;
            description: import("@triplit/client").StringType<{
                nullable: true;
                default: null;
            }>;
            isActive: import("@triplit/client").BooleanType<{
                default: boolean;
            }>;
            creatorId: import("@triplit/client").StringType<{
                nullable: true;
            }>;
            adminIds: import("@triplit/client").SetType<import("@triplit/client").StringType<{}>, {}>;
            editorIds: import("@triplit/client").SetType<import("@triplit/client").StringType<{}>, {
                default: {
                    func: string;
                    args: null;
                };
            }>;
            viewerIds: import("@triplit/client").SetType<import("@triplit/client").StringType<{}>, {
                default: {
                    func: string;
                    args: null;
                };
            }>;
            createdAt: import("@triplit/client").DateType<{
                default: {
                    func: string;
                    args: null;
                };
            }>;
        }, {}>;
        relationships: {
            creator: {
                query: {
                    collectionName: "profiles";
                    where: any;
                };
                cardinality: "one";
            };
            adminMemberships: {
                query: {
                    collectionName: "gardenMemberships";
                } & {
                    where: ["userId", string, string][];
                };
                cardinality: "many";
            };
            editorMemberships: {
                query: {
                    collectionName: "gardenMemberships";
                } & {
                    where: ["userId", string, string][];
                };
                cardinality: "many";
            };
            viewerMemberships: {
                query: {
                    collectionName: "gardenMemberships";
                } & {
                    where: ["userId", string, string][];
                };
                cardinality: "many";
            };
        };
        permissions: {
            anon: {
                read: {
                    filter: ["visibility", string, string][];
                };
            };
            user: {
                read: {
                    filter: {
                        mod: "or";
                        filters: (["visibility", string, string] | ["adminIds", string, string] | ["editorIds", string, string] | ["viewerIds", string, string])[];
                    }[];
                };
                insert: {
                    filter: ["creatorId", string, string][];
                };
                update: {
                    filter: ["adminIds", string, string][];
                };
            };
        };
    };
    gardenMemberships: {
        schema: import("@triplit/client").RecordType<{
            id: import("@triplit/client").StringType<{
                nullable: false;
                default: {
                    func: string;
                    args: string[] | null;
                };
            }>;
            gardenId: import("@triplit/client").StringType<{}>;
            userId: import("@triplit/client").StringType<{}>;
            role: import("@triplit/client").StringType<{
                enum: ("ADMIN" | "EDITOR" | "VIEWER")[];
            }>;
            inviterId: import("@triplit/client").StringType<{
                nullable: true;
            }>;
            status: import("@triplit/client").StringType<{
                enum: ("CREATED" | "PENDING" | "ACCEPTED")[];
            }>;
            acceptedAt: import("@triplit/client").DateType<{
                nullable: true;
                default: null;
            }>;
            favorite: import("@triplit/client").BooleanType<{
                default: boolean;
            }>;
        }, {}>;
        relationships: {
            garden: {
                query: {
                    collectionName: "gardens";
                    where: any;
                };
                cardinality: "one";
            };
            user: {
                query: {
                    collectionName: "profiles";
                    where: any;
                };
                cardinality: "one";
            };
            inviter: {
                query: {
                    collectionName: "profiles";
                    where: any;
                };
                cardinality: "one";
            };
        };
        permissions: {
            anon: {
                read: {
                    filter: ["garden.visibility", string, string][];
                };
            };
            user: {
                read: {
                    filter: {
                        mod: "or";
                        filters: (["garden.visibility", string, string] | ["garden.adminIds", string, string] | ["garden.editorIds", string, string] | ["garden.viewerIds", string, string])[];
                    }[];
                };
                insert: {
                    filter: ["garden.adminIds", string, string][];
                };
                update: {
                    filter: {
                        mod: "or";
                        filters: (["userId", string, string] | ["garden.adminIds", string, string])[];
                    }[];
                };
                delete: {
                    filter: {
                        mod: "or";
                        filters: (["userId", string, string] | ["garden.adminIds", string, string])[];
                    }[];
                };
            };
        };
    };
    profiles: {
        schema: import("@triplit/client").RecordType<{
            id: import("@triplit/client").StringType<{
                nullable: false;
                default: {
                    func: string;
                    args: string[] | null;
                };
            }>;
            username: import("@triplit/client").StringType<{}>;
            createdAt: import("@triplit/client").DateType<{
                default: {
                    func: string;
                    args: null;
                };
            }>;
        }, {}>;
        permissions: {
            anon: {
                read: {
                    filter: true[];
                };
            };
            user: {
                read: {
                    filter: true[];
                };
            };
        };
    };
    accounts: {
        schema: import("@triplit/client").RecordType<{
            id: import("@triplit/client").StringType<{
                nullable: false;
                default: {
                    func: string;
                    args: string[] | null;
                };
            }>;
            profileId: import("@triplit/client").StringType<{}>;
            passwordHash: import("@triplit/client").StringType<{}>;
            verifiedEmail: import("@triplit/client").StringType<{
                nullable: true;
            }>;
            unverifiedEmail: import("@triplit/client").RecordType<{
                address: import("@triplit/client").StringType<{
                    nullable: true;
                    default: null;
                }>;
                token: import("@triplit/client").StringType<{
                    nullable: true;
                    default: null;
                }>;
            }, {}>;
            passwordResetToken: import("@triplit/client").StringType<{
                nullable: true;
                default: null;
            }>;
            isActive: import("@triplit/client").BooleanType<{
                default: boolean;
            }>;
        }, {}>;
        relationships: {
            profile: {
                query: {
                    collectionName: "profiles";
                    where: any;
                };
                cardinality: "one";
            };
        };
        permissions: {
            user: {
                read: {
                    filter: ["id", string, string][];
                };
            };
        };
    };
};
export type Harvest = Entity<typeof plantSchema, 'harvests'>;
export type Lifespan = Entity<typeof plantSchema, 'lifespans'>;
export type Plant = QueryResult<typeof plantSchema, {
    collectionName: 'plants';
    include: {
        expectedLifespan: true;
        recordedLifespan: true;
    };
}>;
export type PlantGroup = Entity<typeof plantSchema, 'plantGroups'>;
//# sourceMappingURL=schema.d.ts.map