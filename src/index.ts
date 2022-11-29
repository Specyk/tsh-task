import express from "express"
import { mainRouter } from "./controllers";
const app = express()

const port = 3000


app.use("/", mainRouter)

app.use(function (err, req, res, next) {
	// log it
	if (!module.parent) console.error(err.stack);

	// error page
	res.status(500).render('5xx');
});

// assume 404 since no middleware responded
app.use(function (req, res, next) {
	res.status(404).render('404', { url: req.originalUrl });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// !TUTAJ 1. spr jak działa oryg
// 2. jeśli przyp. ścieżki dokończyc