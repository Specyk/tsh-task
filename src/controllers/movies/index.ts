import { Router } from "express";
import add from './add'


export const moviesRouter: Router = Router();

moviesRouter.use("/", add)

// 2. We also need an endpoint that will return an array of movies (it might be a single movie) based on few conditions. The endpoint should take 2 optional query parameters:

// - duration
// - an array of genres

// If we don't provide any parameter, then it should return a single random movie.

// If we provide only duration parameter, then it should return a single random movie that has a runtime between <duration - 10> and <duration + 10>.

// If we provide only genres parameter, then it should return all movies that contain at least one of the specified genres. Also movies should be orderd by a number of genres that match. For example if we send a request with genres [Comedy, Fantasy, Crime] then the top hits should be movies that have all three of them, then there should be movies that have one of [Comedy, Fantasy], [comedy, crime], [Fantasy, Crime] and then those with Comedy only, Fantasy only and Crime only.

// And the last one. If we provide both duration and genres parameter, then we should get the same result as for genres parameter only, but narrowed by a runtime. So we should return only those movies that contain at least one of the specified genres and have a runtime between <duration - 10> and <duration + 10>.

// In any of those cases we don't want to have duplicates.
