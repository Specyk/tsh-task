import { Movie } from '../models/Movie';

export async function addMovie(data) {
	const movie = new Movie(data)

	await movie.save()
}