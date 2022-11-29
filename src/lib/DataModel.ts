import { Config, JsonDB } from "node-json-db";
import path from "path";
import { z, ZodObject, ZodType } from "zod";

const db = new JsonDB(new Config(path.join(process.cwd(), 'data/db.json'), true, false, '/'));

export abstract class DataModel<Type> {
	protected readonly schema: ZodType<any>
	protected  static readonly dataPath: string

	constructor(public readonly data: Type) {}

	protected static async getData() {
		try {
			const data = await db.getData(this.dataPath);
			return data
		} catch(error) {
			// The error will tell you where the DataPath stopped. In this case test1
			// Since /test1/test does't exist.
			console.error(error);
		};
	}

	async save(dataPath: string) {
		this.schema.parse(this.data)
		await db.push(dataPath,this.data);
	}

	static async getAll(dataPath: string) {
		const data = await db.getData(dataPath);
		return data
	}
}
