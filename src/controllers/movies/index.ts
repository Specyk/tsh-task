import { Router } from "express";
import add from './add'
import * as movieService from "../../services/movieService"


export const moviesRouter: Router = Router();

moviesRouter.use("/", add)

moviesRouter.get("/", async (req,res) => {
	const duration  =  <string> req.query.duration
	const genres = (req.query.genres as string)?.split(',')

	const data = await movieService.getMovies({duration, genres})
	res.json({movies: data})
})

