import { Router } from "express";
import * as movieService from "../../services/movieService"

const router = Router()


router.post("/", async (req, res) => {
	try {
		await movieService.addMovie(req.body)
		res.status(201).send()
	} catch(err) {
		// jeśli instanceof Validation todo
	}
})


export default router