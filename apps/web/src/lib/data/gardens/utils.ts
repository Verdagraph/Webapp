import triplit from '$data/triplit';

/**
 * Names are assumed to be less than the
 * maximum ID length minus (GENERATED_KEY_RANDOM_SECTION_LENGTH + 1)
 */
import plantNamesFile from '$lib/assets/plantNames.json';

/** The length of the randomly generated section at the end of the generated key. */
const GENERATED_KEY_RANDOM_SECTION_LENGTH = 3;

/**
 * The maximum number of times to try to generate a unique key
 * using a random plant name before falling back to a random string.
 */
const MAX_PLANT_NAME_TRIES = 5;

/** The length of the generated fallback string. */
const RANDOM_STRING_KEY_LENGTH = 8;

/**
 * Generated a random string.
 * @param length The length of the generated string.
 * @param characters The character set to pull from.
 * @returns A random string.
 */
function generateRandomString(length: number, characters: string) {
	let result = '';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

/**
 * Generates a garden ID using a random plant name.
 * Chooses a random name then appends a random string.
 * @returns Generated garden ID.
 */
function generateGardenIdFromPlantName(): string {
	/** Pick a random plant name. */
	const plantName =
		plantNamesFile.plants[Math.floor(Math.random() * plantNamesFile.plants.length)];

	/** Generate a random section at the end. Ensure it starts with a number. */
	const randomSectionBeginningCharacter = generateRandomString(1, '0123456789');
	const randomSectionRest = generateRandomString(
		GENERATED_KEY_RANDOM_SECTION_LENGTH - 1,
		'abcdefghijklmnopqrstuvwxyz0123456789'
	);

	return plantName + '-' + randomSectionBeginningCharacter + randomSectionRest;
}

/**
 * Generates a garden ID using a random string.
 * @returns Generated garden ID.
 */
function generateGardenIdFromRandomString(): string {
	return generateRandomString(
		RANDOM_STRING_KEY_LENGTH,
		'abcdefghijklmnopqrstuvwxyz0123456789'
	);
}

/**
 * Generates a random garden ID. Guarnteed to be unique.
 * @returns Generated unique garden ID.
 */
export async function generateGardenId(): Promise<string> {
	/** Try to generate a unique key with a plant name. */
	for (let i = 0; i < MAX_PLANT_NAME_TRIES; i++) {
		const id = generateGardenIdFromPlantName();

		const existingGarden = await triplit.fetchOne(triplit.query('gardens').Id(id));
		if (existingGarden == null) {
			return id;
		}
	}

	/** Fallback to a random string. */
	for (let i = 0; i < MAX_PLANT_NAME_TRIES; i++) {
		const id = generateGardenIdFromRandomString();

		const existingGarden = await triplit.fetchOne(triplit.query('gardens').Id(id));
		if (existingGarden == null) {
			return id;
		}
	}

	/** If all those tries failed to generate a unique ID, prompt the user to enter one. */
	return '';
}
