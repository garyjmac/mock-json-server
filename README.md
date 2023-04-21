# mock-json-server

Example Mock Server based on json-server package

## Mocking Scope

We will mock:

- Acronyms: (Mock query param GET with string not JSON returned)
  - GET with query param for acronym - return acronym meaning as text
- Poems: (Mock two step Async POST / GET call to mocked system):
  - POST of form data with file in data - based on filename - return Poem UUID/ID.
  - Subsequent GET with Poem UUID/ID to get Poem Text.
- Quotes:
  - Standard JSON-Server CRUD on quotes, GET, POST for example

## Target Deployment is K8s

Dockerfile with local Docker to test
