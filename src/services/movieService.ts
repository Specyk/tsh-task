import { Movie } from '../models/Movie';
import { GetMoviesFilter as GetMoviesFilter } from './interfaces/GetMoviesFilter';

export async function addMovie(data) {
	const movie = new Movie(data)

	await movie.save()
}

export async function getMovies(filter: GetMoviesFilter) {
	if(!filter.genres) {
		return getRandomMovie(filter)
	}

	if(!filter.duration) {
		return getByGenres(filter)
	}

	// And the last one. If we provide both duration and genres parameter, then we should get the same result as for genres parameter only, but narrowed by a runtime. So we should return only those movies that contain at least one of the specified genres and have a runtime between <duration - 10> and <duration + 10>.

	const movies = await getByGenres(filter)
	const filtered = movies.filter(movie => isNearbyTime(movie.data.runtime, filter.duration))

	return filtered
	// In any of those cases we don't want to have duplicates.
}

export async function getRandomMovie(filter?: GetMoviesFilter) {
	const movies = await Movie.getAll()
	const shuffled = shuffle(movies)

	if(filter?.duration) {
		return shuffled.find(movie => isNearbyTime(movie.data.runtime, filter.duration))
	}

	return shuffled[0]
}

async function getByGenres(filter: GetMoviesFilter): Promise<Movie[]> {
	const movies = await Movie.getAll()
	// If we provide only genres parameter, then it should return all movies that contain at least one of the specified genres. Also movies should be orderd by a number of genres that match. For example if we send a request with genres [Comedy, Fantasy, Crime] then the top hits should be movies that have all three of them, then there should be movies that have one of [Comedy, Fantasy], [comedy, crime], [Fantasy, Crime] and then those with Comedy only, Fantasy only and Crime only.

	const moviesCounted = movies.map(movie => ({movie, matches: countMatches(movie, filter)}))
	const sorted = moviesCounted.sort((a, b) => a.matches - b.matches)
	return sorted.map(entry => entry.movie)
}

function countMatches(movie, filter) {
	return movie.data.genres.reduce((sum, g) => {
		if(filter.genres.indexOf(g) > 0) {
			return sum + 1
		}
		return sum
	}, 0)
}

function isNearbyTime(runtime: any, duration: string): boolean {
	// runtime between <duration - 10> and <duration + 10>.
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

	// While there remain elements to shuffle...
	while (0 !== curIndex) {
		// Pick a remaining element...
		randIndex = Math.floor(Math.random() * curIndex);
		curIndex -= 1;

		// And swap it with the current element.
		tmpVal = array[curIndex];
		array[curIndex] = array[randIndex];
		array[randIndex] = tmpVal;
	}

	return array;
}
