import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'

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

const resp = postPoem('Poem1', 'Poet1', './testfiles/poemfile1.txt')

let poemID = ''

resp.then((response) => {
  console.log(`Response.then => : ${JSON.stringify(response.data)}`)
  poemID = response.data.uuid
  const poemText = getPoemByID(poemID)
  poemText.then((response) => {
    console.log(`Poem Response.then => : ${JSON.stringify(response.data.Text)}`)
  })
})

axios({
  method: 'get',
  url: 'http://localhost:3004/acronyms',
  params: { acro: 'YOLO' },
})
  .then(function (response) {
    //handle success
    console.log(response.data)
  })
  .catch(function (response) {
    //handle error
    console.log(response)
  })

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
