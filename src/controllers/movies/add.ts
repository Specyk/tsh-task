import { Router } from "express";
import * as movieService from "../../services/movieService"
import { InvalidParamError } from '../../exception/InvalidParamError';

const router = Router()


router.post("/add", async (req, res) => {
	try {
		await movieService.addMovie(req.body)
		res.status(201).send()
	} catch(err) {
		if(err instanceof InvalidParamError) {
			res.status(200).json(err.toJSON())
			return
		}
		throw err
	}
})


export default router