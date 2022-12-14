import { DataModel } from "../lib/DataModel";
import { z } from "zod";
import { Genre } from './Genre';



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
	}) .array().nonempty({
		message : "At least 1 genre must be passed"
	}).and(z.custom((data: string[]) => {
		return data && data.every(async item => {
			const genres = await Genre.getAll()
			return genres.some(genre => genre=== item)
		})
	})),
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

type MovieData = z.infer<typeof MovieSchema>

export class Movie extends DataModel<MovieData> {
	readonly schema = MovieSchema
	static readonly dataPath = "/movies"

	constructor(data) {
		super(data)
	}

	static async addMovie(data: MovieData) {
		const movie = new Movie(data)
		await movie.save()
	}

	static async getAll(): Promise<Movie[]> {
		return super.getAll(Movie.dataPath)
	}

	async save() {
		await super.save(Movie.dataPath)
	}
}
