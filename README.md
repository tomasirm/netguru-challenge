
## Docker-compose 

In root folder, excecute this command:
```bash
$ JWT_SECRET=secret OMDB_API_KEY=342e92c1 docker-compose up -d 
```
Then, it will deploy 3 resources:

- auth-api (provided by you)
- movie-api
- db

Endpoints

- [auth-api](http://localhost:3001/auth) (localhost:3001/auth)
- [movie-api](http://localhost:3000/movies) (localhost:3000/movies)

Docs: 
- [movie-api-swagger](http://localhost:3000/api-docs/) (localhost:3000/api-docs/)
    
Database
- type: PostgreSQL
- host: localhost
- port: 5433
- username: postgres
- password: postgres
- database: movies

# REST API
Remember get token `config.ru` is a minimal Rack configuration for unicorn.
## Get list of Movies

### Request

`GET /movies/`

    curl -X GET http://localhost:3000/movies -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY1Mzg1NDk3MSwiZXhwIjoxNjUzODU2NzcxLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.UC1FiN6XXbbw8blzC8pGddZTgpWV8Kim220JZ5wF3Ek" 

### Response

    HTTP/1.1 200 OK
    access-control-allow-origin: *
    content-length: 99
    content-type: application/json; charset=utf-8
    date: Sun, 29 May 2022 20:11:35 GMT
    etag: W/"63-kC5sYCZhrQc2/tJ+w0lv+pS1IqM"
    x-powered-by: Express

    [{"id":1,"title":"TRAINSPOTTING","director":"Danny Boyle","genre":"Drama","released":"1996-08-09"}]

## Create a new Movie

### Request

`POST /movies/`

    curl -X POST http://localhost:3000/movies -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY1Mzg1NTI4NCwiZXhwIjoxNjUzODU3MDg0LCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.RKv30A1Y-lCdmJh9FMRlmiLCP6k6q3OJEz-kcu0sJUk" -H "Content-Type: application/json" --data-binary @- <<DATA
    {
        "title": "Trainspotting"
    }

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Length: 36

    {
        "title": "TRAINSPOTTING",
        "genre": "Drama",
        "released": "09 Aug 1996",
        "director": "Danny Boyle",
        "id": 1
    }


## Local 

```bash
$ npm install
```

Add to .env file:
```bash
JWT_SECRET=secret 
OMDB_API_KEY=342e92c1
```

## Running the app

```bash
# development
$ npm run start

```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
