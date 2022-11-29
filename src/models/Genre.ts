import { z } from "zod"
import { DataModel } from "../lib/DataModel"


const GenreSchema = z.string().array()

export class Genre extends DataModel<any> {
	schema = GenreSchema

	constructor(data) {
		super(data)
	}
}
