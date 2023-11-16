# mock-json-server

Example Mock Server based on json-server package, using Typescript for mock data typing

## Mocking Server Scope

Mock examples:

- Acronyms: (Mock query param GET with string not JSON returned)
  - GET with query param for acronym - return acronym meaning as text
- Poems: (Mock two step Async POST / GET call to mocked system):
  - POST of form data with file in data - based on filename - return Poem UUID/ID.
  - Subsequent GET with Poem UUID/ID to get Poem Text.
- Quotes:
  - Standard JSON-Server CRUD on quotes, GET, POST for example

## How to use

1. Clone the Repo - https://github.com/typicode/json-server
2. Install required packages : `npm i`
3. Start the server: `npm run server`
4. To use the test cleint, in a seperate terminal/shell `npm run client`
5. Other REST clients like Postman can be used instead of using the test client

## Test Client

The test client is provided as a simple example / way to test and experiment with the server

/end
