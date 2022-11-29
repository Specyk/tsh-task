import { ZodError } from 'zod';
import { Movie } from '../models/Movie';
import { GetMoviesFilter as GetMoviesFilter } from './interfaces/GetMoviesFilter';
import { InvalidParamError } from '../exception/InvalidParamError';


export async function addMovie(data) {
	const movie = new Movie(data)
	try {
		await movie.save()
	} catch(err) {
		if(err instanceof ZodError) {
			const e = new InvalidParamError(err.message)
			throw e
		}
	}
}

export async function getMovies(filter: GetMoviesFilter): Promise<Movie[]> {
	if(!filter.genres) {
		return getRandomMovie(filter)
	}

	if(!filter.duration) {
		return getByGenres(filter)
	}

	const movies = await getByGenres(filter)
	const filtered = movies.filter(movie => isNearbyTime(movie.data.runtime, filter.duration))

	return filtered
}

export async function getRandomMovie(filter?: GetMoviesFilter) {
	const movies = await Movie.getAll()
	const shuffled = shuffle(movies)

	if(filter?.duration) {
		return [shuffled.find(movie => isNearbyTime(movie.runtime, filter.duration))]
	}

	return [shuffled[0]]
}

async function getByGenres(filter: GetMoviesFilter): Promise<Movie[]> {
	const movies = await Movie.getAll()

	const moviesCounted = movies.map(movie => ({movie, matches: countMatches(movie, filter)})).filter(m => m.matches > 0)
	const sorted = moviesCounted.sort((a, b) => a.matches - b.matches)
	return sorted.map(entry => entry.movie)
}

function countMatches(movie, filter) {
	return movie.genres.reduce((sum, g) => {
		if(filter.genres.indexOf(g) > 0) {
			return sum + 1
		}
		return sum
	}, 0)
}

function isNearbyTime(runtime: any, duration: string): boolean {
	const v1 = parseInt(runtime)
	const v2 = parseInt(duration)

	let diff = v1 - v2
	if(diff < 0) {
		diff = - diff
	}

	return diff < 10
}

function shuffle(array: any[]): any[] {
	var curIndex: number = array.length,
		tmpVal: any,
		randIndex: number;

	while (0 !== curIndex) {
		randIndex = Math.floor(Math.random() * curIndex);
		curIndex -= 1;

		tmpVal = array[curIndex];
		array[curIndex] = array[randIndex];
		array[randIndex] = tmpVal;
	}

	return array;
}
