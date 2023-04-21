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

// Add custom routes before JSON Server router
server.get('/customroute', (req, res) => {
  res.jsonp({ data: 'Custom Data' })
})

// Mock1 Acronyms - Get the '/acyonyms?acro=????' acro query param for use in filtering of acronyms
let acroKey = ''
server.use((req, res, next) => {
  const url = req.originalUrl
  if (url.startsWith('/acronyms') && req.method === 'GET') {
    if (req.query['acro']) {
      acroKey = req.query['acro'] as string
      console.log(`Query Param: ${acroKey}`)
    } else {
      console.log(`Expected a Query param on /acronyms - none found`)
    }
  }
  // Continue to JSON Server router for other endpoints
  next()
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

// Mock2 Poems - Find file name in POSTed FormData
let uploadFileName = ''
server.use((req, res, next) => {
  const url = req.originalUrl
  if (url.startsWith('/poems') && req.method === 'POST') {
    const form = new multiparty.Form()
    form.parse(req, function (err, fields, files) {
      console.log(`Files: ${JSON.stringify(files)}`)
      uploadFileName = files.file[0].originalFilename
      console.log(`File Name: ${uploadFileName}`)
    })
  }
  // Continue to JSON Server router for other endpoints
  next()
})

// Mock1 Acronyms
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
router.render = (req, res) => {
  const url = req.originalUrl
  console.log(`URL: ${url}`)
  console.log(`Method: ${req.method}`)
  console.log(`uploadFile: ${uploadFileName}`)
  if (url.startsWith('/acronyms') && req.method === 'GET' && acroKey) {
    const result: Acronym[] = mockdata.acronyms // res.locals.data
    console.log(result)
    const returnData: Acronym | undefined = result.find((obj) => {
      return obj.acronym === acroKey
    })

    res.jsonp(returnData)
  } else if (
    url.startsWith('/poems') &&
    req.method === 'POST' &&
    uploadFileName
  ) {
    console.log('Pre switch')
    // Mock2 Poems POST
    switch (uploadFileName) {
      case 'poemfile1.txt':
        console.log('File Hit')
        res.jsonp({ uuid: '1' })
        break
      default:
        console.log('Default - No File Hit')
        res.jsonp({ uuid: '2' })
        break
    }
  } else {
    res.jsonp(res.locals.data)
  }
}

server.listen(port, () => {
  console.log(`Mock Server is running on Localhost:${port}`)
})
