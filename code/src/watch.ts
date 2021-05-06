import * as chokidar from 'chokidar'
import { exec } from 'child_process'

;(() => {
  const dirsToWatch = ['./src/views']

  chokidar.watch(dirsToWatch).on('change', (path) => {
    console.log(`
    type: change,
    path: ${path}
    `)

    exec('node bin/main.js', (err, stdout, stderr) => {
      console.log('Executing bin/main.js')
    })
  })
})()
