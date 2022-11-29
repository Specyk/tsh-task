import request from 'supertest'
import { app } from "../../../src/app"


describe('movies add', () => {
	test("It can add a movie", (done) => {
		request(app)
			.post('/movies/add')
			.send({
				"title": "Koziołek Matołek"
			})
			.expect(200)
			.end(function (err, res) {

				expect(res.body).toBeDefined()
				expect(res.body.length > 1).toBe(true)
				done()
			});
	})
})
