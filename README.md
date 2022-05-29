
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
