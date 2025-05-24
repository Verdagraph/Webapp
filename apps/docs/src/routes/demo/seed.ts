import type {
	CultivarCollection,
	Environment,
	Garden,
	PlantingArea,
	User,
	Workspace
} from '@vdg-webapp/models';
import { type ControllerContext } from '@vdg-webapp/models';

type Entity =
	| User
	| Garden
	| Workspace
	| PlantingArea
	| Environment
	| CultivarCollection;

const entities: Entity[] = [];

export function seed(ctx: ControllerContext) {
	users.forEach(ctx.triplit.insert('u'));
}
