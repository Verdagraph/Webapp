// Checks the generated collection against the project's own import schema and name rules.
// Usage: node validate.mjs [directory]   (default: the models defaults folder)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const models = await import(
	path.join(here, '..', '..', 'packages', 'models', 'dist', 'index.js')
);
const dir =
	process.argv[2] ??
	path.join(here, '..', '..', 'packages', 'models', 'src', 'cultivars', 'defaults');

let failed = false;
for (const file of fs
	.readdirSync(dir)
	.filter((f) => f.endsWith('.json') && !f.includes('.extras.'))) {
	const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
	const result = models.CultivarCollectionExportSchema.safeParse(data);
	if (!result.success) {
		failed = true;
		console.log(file, 'INVALID:', result.error.issues.length, 'issues');
		const seen = new Map();
		for (const issue of result.error.issues) {
			const key = `${issue.path.slice(2).join('.')}: ${issue.message}`;
			seen.set(key, (seen.get(key) ?? 0) + 1);
		}
		for (const [key, count] of [...seen].slice(0, 15))
			console.log('   ', count, 'x', key);
		continue;
	}
	try {
		models.orderCultivarsParentsFirst(result.data.cultivars);
		console.log(file, 'ok,', result.data.cultivars.length, 'cultivars');
	} catch (error) {
		failed = true;
		console.log(
			file,
			'NAME OR PARENT ERROR:',
			JSON.stringify(error.details ?? error.message)
		);
	}
}
process.exit(failed ? 1 : 0);
