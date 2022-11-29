import { Config, JsonDB } from "node-json-db";
import path from "path";
import { z, ZodObject } from "zod";

const db = new JsonDB(new Config(path.join(process.cwd(), 'data/db.json'), true, false, '/'));

export abstract class DataModel<Type> {
	protected schema: ZodObject<any>
	protected dataPath: string

	constructor(private data: Type) {}

	protected static async getData() {
		try {
			var data = await db.getData("/test1/test/dont/work");
		} catch(error) {
			// The error will tell you where the DataPath stopped. In this case test1
			// Since /test1/test does't exist.
			console.error(error);
		};
	}

	async save() {
		const r = this.schema.parse(this.data)

		await db.push(this.dataPath,this.data);

	}
}
