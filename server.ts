import * as fs from 'fs'
import * as http from 'http'
import { lookup as mimeLookup } from 'mime-types'

const fileExists = (path: string) => {
	return fs.existsSync(path) && !fs.statSync(path).isDirectory()
}

const sendFile = (path: string, res: http.ServerResponse) => {
	const mimeType = mimeLookup(path) || 'text/unknown'
	res.setHeader('Content-Type', mimeType)
	fs.createReadStream(path).pipe(res)
}

const server = http.createServer((req, res) => {
	const path = __dirname + '/public' + req.url.replace(/\.\./g, '')

	console.log(`[ Request ] ${ path }`)

	if (fileExists(path)) {
		sendFile(path, res)
	} else if (fileExists(path + 'index.html')) {
		sendFile(path + 'index.html', res)
	} else {
		res.end('Yeah nah that doesn\'t exist')
	}
})

server.listen(80)