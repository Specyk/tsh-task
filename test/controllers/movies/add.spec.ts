import request from 'supertest'
import { app } from "../../../src/app"


describe('movies add', () => {
	test("It can add a movie", (done) => {
		request(app)
			.post('/movies/add')
			.send({
				"title": "Koziołek Matołek"
			})
			// .expect('Content-Type', /json/)
			.expect(200)
			.end(function (err, res) {
				if (err) throw err;

				expect(res.body).toBeDefined()
				expect(res.body.length > 1).toBe(true)
				done()
			});
	})
})
