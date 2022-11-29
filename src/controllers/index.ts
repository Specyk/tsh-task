import { Router } from "express"
import { moviesRouter } from "./movies"

const mainRouter: Router = Router()

mainRouter
	.use("/movies", moviesRouter,)

export {mainRouter}