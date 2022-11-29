export class InvalidParamError extends Error {
	constructor(private data){
		super()
	}

	toJSON() {
		return this.data
	}
}