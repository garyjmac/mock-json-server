import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'

/*
Various Axios calls to Json-server based server as examples.
*/
async function postPoem(title: string, author: string, file: string) {
  const bodyFormData = new FormData()
  bodyFormData.append('title', title)
  bodyFormData.append('author', author)
  bodyFormData.append('file', fs.createReadStream(file))
  const url = 'http://localhost:3004/poems'
  const response = await axios({
    method: 'post',
    url: url,
    data: bodyFormData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  console.log(`POST: ${JSON.stringify(response.data)}`)
  return response
}

async function getPoemByID(id: string) {
  console.log(`Get ID passed in: ${id}`)
  const url = `http://localhost:3004/poems/${id}`
  const response = await axios({
    method: 'get',
    url: url,
  })
  // console.log(`GET: ${JSON.stringify(response.data)}`)
  return response
}

/* 
Mimic async behaviour:
1. Post a request, get a UUID - > Service then processes the POST request (file)
2. We then GET on UUID to get result of aysnc process (Simplified here - axios interceptor/retry in real system)
*/

// POST
const resp = postPoem('Poem1', 'Poet1', './testfiles/poemfile1.txt')
resp.then((response) => {
  console.log(`Response => : ${JSON.stringify(response.data)}`)
  const poemID = response.data.uuid
  // GET
  const poemText = getPoemByID(poemID)
  poemText.then((response) => {
    console.log(`Poem Text => : ${JSON.stringify(response.data.Text)}`)
  })
})

// GET a single acronym meaning, using url query acronym + another key-value
axios({
  method: 'get',
  url: 'http://localhost:3004/acronyms',
  params: { acronym: 'YOLO', system: 'Alpha' },
})
  .then(function (response) {
    //handle success
    console.log(response.data)
  })
  .catch(function (response) {
    //handle error
    console.log(response)
  })

// GET all quoutes
axios({
  method: 'get',
  url: 'http://localhost:3004/quotes',
})
  .then(function (response) {
    //handle success
    console.log(response.data)
  })
  .catch(function (response) {
    //handle error
    console.log(response)
  })

// POST (add) a new quote - in memory only
axios({
  method: 'post',
  url: 'http://localhost:3004/quotes',
  data: { phrase: "You had me at 'hello'.", movie: 'Jerry Maguire' },
  headers: { 'Content-Type': 'application/json' },
})
  .then(function (response) {
    //handle success
    console.log(`Post Quotes response: ${JSON.stringify(response.data)}`)
  })
  .catch(function (response) {
    //handle error
    console.log(response)
  })
