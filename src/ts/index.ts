import { renderFile as render } from 'ejs'
import { join as j } from 'path'
import { readdir as readD, readFileSync as readF, writeFileSync as writeF } from 'fs'
import { parse } from 'yaml'

readD(j(__dirname, '..', '..', 'meta'), (err, files) => {
	if(err) throw err
	else files.forEach((file) => {
		if(/\.(yaml|yml)$/i.test(file))
			render(
				j(__dirname, '..', '..', 'src', 'views', 'profile.ejs'),
				{ parse: parse(readF(j(__dirname, '..', '..', 'meta', file)).toString()) }
			).then((html) => {
				writeF(j(__dirname, '..', '..', 'build', 'html', file.split('.')[0] + '.html'), html)
			})
	})
})

render(
	j(__dirname, '..', '..', 'src', 'views', 'index.ejs')
).then((html) => {
	writeF(j(__dirname, '..', '..', 'build', 'html', 'index.html'), html)
})