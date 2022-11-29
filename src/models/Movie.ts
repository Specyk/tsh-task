import { DataModel } from "../lib/DataModel";
import { z } from "zod";

const User = z.object({
	username: z.string(),
});

User.parse({ username: "Ludwig" });

const MovieSchema = z.object({
	username: z.string(),
	"id": z.number({
		invalid_type_error: "Id must be a number",
	}),
	"title": z.string({
		invalid_type_error: "Title should be a string",
		required_error: "Title is required",

	}).length(25, {
		message: "Title can have max. 25 characters"
	}),
	"year": z.number({
		invalid_type_error: "Year should be a number",
		required_error: "Year is required"
	}),
	"runtime": z.number({
		invalid_type_error: "runtime must be a number"
	}),
	"genres": z.string({
		required_error: "genres is required"
		// todo predefined
	}).array().nonempty({
		message : "At least 1 genre must be passed"
	}),
	"director": z.string({
		required_error: "Director is required",

	}).length(25, {
		message: "Director can have max. 25 characters"
	}),
	"actors": z.string({
		invalid_type_error: "actors must be a string"
	}),
	"plot": z.string({
		invalid_type_error: "plot must be a string"
	}),
	"posterUrl": z.string({
		invalid_type_error: "posterUrl must be a string"
	}),
});

export class Movie extends DataModel<z.infer<typeof MovieSchema>> {
	schema = MovieSchema

	constructor(data) {
		super(data)
	}


}

// - a list of genres (only predefined ones from db file) (required, array of predefined strings)
// - title (required, string, max 255 characters)
// - year (required, number)
// - runtime (required, number)
// - director (required, string, max 255 characters)
// - actors (optional, string)
// - plot (optional, string)
// - posterUrl (optional, string)

// Each field should be properly validated and meaningful error message should be return in case of invalid value.
