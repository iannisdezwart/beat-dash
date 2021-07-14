import * as fs from 'fs'
import * as http from 'http'
import { lookup as mimeLookup } from 'mime-types'
import { compile as compileWebApp } from './compiler'

const fileExists = (path: string) => {
	return fs.existsSync(path) && !fs.statSync(path).isDirectory()
}

const sendFile = (path: string, res: http.ServerResponse) => {
	const mimeType = mimeLookup(path) || 'text/unknown'
	const fileSize = fs.statSync(path).size
	res.setHeader('Content-Type', mimeType)
	res.setHeader('File-Size', fileSize)
	fs.createReadStream(path).pipe(res)
}

const main = async () => {
	await compileWebApp()

	const server = http.createServer((req, res) => {
		const path = __dirname + '/root' + req.url.replace(/\.\./g, '')

		console.log(`[ Request ] ${ path }`)

		if (fileExists(path)) {
			sendFile(path, res)
		} else if (fileExists(path + 'index.html')) {
			sendFile(path + 'index.html', res)
		} else {
			res.writeHead(404)
			res.end('Yeah nah that doesn\'t exist')
		}
	})

	const port = process.argv[2] == null ? 80 : +process.argv[2]

	server.listen(port, () => {
		console.log(`Server started listening on port ${ port }`)
	})
}

main()
