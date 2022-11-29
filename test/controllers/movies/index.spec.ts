import request from 'supertest'
import { app } from "../../../src/app"

describe('movies api', () => {
	test("If we don't provide any parameter, then it should return a single random movie", (done) => {
		request(app)
			.get('/movies?duration=80')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) throw err;

				expect(res.body).toHaveProperty('movies')
				expect(res.body.movies).toHaveLength(1)
				done()
			});
	})

	test("If we don't provide any parameter, then it should return a single random movie", (done) => {
		request(app)
			.get('/movies?duration=80')
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) throw err;

				expect(res.body).toHaveProperty('movies')
				expect(res.body.movies).toHaveLength(1)
				done()
			});
	})

	test("If we provide only genres parameter, then it should return all movies that contain at least one of the specified genres", (done) => {
		request(app)
			.get('/movies?genres=Crime,Fantasy')
			.expect(200)
			.end(function (err, res) {
				if (err) throw err;

				expect(res.body).toHaveProperty('movies')

				res.body.movies.forEach(movie => {
					const movieHasGenre = movie.genres.some(g => g === 'Crime' || g === 'Fantasy')
					expect(movieHasGenre).toBe(true)
					done()
				})
			});
	})

})



// .

// If we provide only duration parameter, then it should return a single random movie that has a runtime between <duration - 10> and <duration + 10>.

// If we provide only genres parameter, then it should return all movies that contain at least one of the specified genres. Also movies should be orderd by a number of genres that match. For example if we send a request with genres [Comedy, Fantasy, Crime] then the top hits should be movies that have all three of them, then there should be movies that have one of [Comedy, Fantasy], [comedy, crime], [Fantasy, Crime] and then those with Comedy only, Fantasy only and Crime only.

// And the last one. If we provide both duration and genres parameter, then we should get the same result as for genres parameter only, but narrowed by a runtime. So we should return only those movies that contain at least one of the specified genres and have a runtime between <duration - 10> and <duration + 10>.

