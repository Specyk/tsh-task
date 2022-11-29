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

				expect(res.body.movies).toHaveLength(1)
				expect(res.body.movies[0]).toHaveProperty('title')

				done()
			});
	})

	test("If we don't provide any parameter, it  return a single random movie1", (done) => {
		request(app)
			.get('/movies?duration=80')
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
				})
				done()

			});
	})

})
