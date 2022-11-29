import { Router } from "express";

const router = Router()

router.post("/", (req, res) => {
	try {
		await movieService.addMovie(data)
		res.status(201).send()
	} catch(err) {
		// jeśli instanceof Validation todo
	}
})