import jsonServer from 'json-server'
import mockdata from '../mockdata/index'
import Acronym from '../mockmodel/acronyms'
import multiparty from 'multiparty'

const server = jsonServer.create()
const router = jsonServer.router(mockdata)
const middlewares = jsonServer.defaults()

const port = 3004

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Mock2 Poems - Find file name in POSTed FormData
server.post('/poems', (req, res) => {
  let uploadFileName = ''

  const form = new multiparty.Form()
  form.parse(req, function (err, fields, files) {
    console.log(`Files: ${JSON.stringify(files)}`)
    uploadFileName = files.file[0].originalFilename

    console.log('Pre File Switch')
    console.log(`uploadFile: ${uploadFileName}`)
    // Mock2 Poems POST
    switch (uploadFileName) {
      case 'poemfile1.txt':
        console.log('File Hit')
        res.jsonp({ uuid: '11' })
        break
      case 'poemfile2.txt':
        console.log('File Hit')
        res.jsonp({ uuid: '22' })
        break
      default:
        console.log('Default - No File Hit')
        res.jsonp({ uuid: '99' })
        break
    }
  })
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
// server.use((req, res, next) => {
//   if (req.method === 'GET') {
//     req.body.createdAt = Date.now()
//   }
//   // Continue to JSON Server router for other endpoints
//   next()
// })

// Use default router to get mockdata
server.use(router)

// Mock1 Acronyms
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
router.render = (req, res) => {
  const url = req.originalUrl
  console.log(`Req: ${JSON.stringify(req.query)}`)
  console.log(`URL: ${url}`)
  console.log(`Method: ${req.method}`)
  if (url.startsWith('/acronyms') && req.method === 'GET') {
    const result: Acronym[] = res.locals.data
    console.log(result)
    if (result.length === 1) {
      res.send(result[0].meaning)
    } else {
      res.status(404).send('Error')
    }
  } else {
    res.jsonp(res.locals.data)
  }
}

server.listen(port, () => {
  console.log(`Mock Server is running on Localhost:${port}`)
})
