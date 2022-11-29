import { Router } from "express";
import add from './add'
import * as movieService from "../../services/movieService"


export const moviesRouter: Router = Router();

moviesRouter.use("/", add)

moviesRouter.get("/", async (req,res) => {
	const { duration, genres} = req.query
	const data = await movieService.getMovies({duration, genres})
	res.json({movies: data})
})
// 2. We also need an endpoint that will return an array of movies (it might be a single movie) based on few conditions. The endpoint should take 2 optional query parameters:

// - duration
// - an array of genres

