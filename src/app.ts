import express from "express"
import { mainRouter } from "./controllers";


const app = express()

app.use(express.json())

app.use("/", mainRouter)

app.use(function (err, req, res, next) {
	if (!module.parent) console.error(err.stack);

	res.status(500).render('5xx');
});

app.use(function (req, res, next) {
	res.status(404).render('404', { url: req.originalUrl });
});

export { app }
