import { z } from "zod"
import { DataModel } from "../lib/DataModel"


const GenreSchema = z.string().array()

export class Genre extends DataModel<any> {
	schema = GenreSchema
	dataPath = "genres"

	constructor(data) {
		super(data)
	}

	static async getAll() {
		return super.getAll(this.dataPath)
	}
}
