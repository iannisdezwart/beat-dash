class Vector {
	values: number[] = []

	constructor(initialValues: number[]) {
		for (let i = 0; i < initialValues.length; i++) {
			this.values[i] = initialValues[i]
		}
	}

	get x() {
		return this.values[0]
	}

	set x(v: number) {
		this.values[0] = v
	}

	get y() {
		return this.values[1]
	}

	set y(v: number) {
		this.values[1] = v
	}

	dim() {
		return this.values.length
	}

	get(i: number) {
		return this.values[i]
	}

	set(i: number, v: number) {
		this.values[i] = v
	}

	each(callback: (v: number, i: number) => number) {
		for (let i = 0; i < this.dim(); i++) {
			this.set(i, callback(this.get(i), i))
		}

		return this
	}

	add(v: Vector) {
		if (this.dim() != v.dim()) throw 'invalid dimension'
		return this.each((el, i) => el + v.get(i))
	}

	sub(v: Vector) {
		if (this.dim() != v.dim()) throw 'invalid dimension'
		return this.each((el, i) => el - v.get(i))
	}

	mul(v: number) {
		return this.each(el => el * v)
	}

	div(v: number) {
		return this.each(el => el / v)
	}

	len() {
		return Math.hypot(...this.values)
	}

	ang() {
		if (this.dim() != 2) throw 'invalid dimension'
		return Math.atan2(this.y, this.x)
	}

	cap(max: number) {
		if (this.len() > max) {
			const [ x, y ] = Vector.fromAng(this.ang()).values

			this.x = x * max
			this.y = y * max
		}

		return this
	}

	rot(ang: number) {
		const newX = this.x * Math.cos(ang) - this.y * Math.sin(ang)
		const newY = this.x * Math.sin(ang) + this.y * Math.cos(ang)

		this.x = newX
		this.y = newY

		return this
	}

	copy() {
		return new Vector(this.values)
	}

	static fromAng(ang: number) {
		return new Vector([ Math.cos(ang), Math.sin(ang) ])
	}
}