import { OriginEnumOptions } from '../plants/origin.js';
import type { Origin } from '../plants/origin.js';
import type { Cultivar } from './schema.js';

type OriginProfile = Cultivar['attributes']['origin'];

/**
 * The origins a cultivar can be started with. A cultivar which does not say allows all of them.
 * @param profile The cultivar's origin profile.
 * @returns The allowed origins.
 */
export function allowedOrigins(profile: OriginProfile): Origin[] {
	const allowed = [...(profile?.allowed ?? [])].filter((entry): entry is Origin =>
		(OriginEnumOptions as readonly string[]).includes(entry)
	);
	return allowed.length > 0 ? allowed : [...OriginEnumOptions];
}

/**
 * The origin to start with by default: the cultivar's preferred origin, else the
 * first allowed one, else a direct seed.
 * @param profile The cultivar's origin profile.
 * @returns The default origin.
 */
export function preferredOrigin(profile: OriginProfile): Origin {
	if (profile?.preferred) return profile.preferred as Origin;
	return allowedOrigins(profile)[0] ?? 'DIRECT_SEED';
}
