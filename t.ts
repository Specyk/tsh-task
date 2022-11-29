import { z } from "zod";

// const unionType = z.union([z.string({

// }), z.number()])

const uTyp = z.string().and(z.custom(data => {
	return ['aab', 'bb'].some(entry => data === entry)
}, {
	message: "Incorrect str"
}))

console.log(uTyp.parse("aab"))