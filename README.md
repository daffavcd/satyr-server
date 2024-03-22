# Server Side Repo of Travel Bucket

## Documentation

* [I use Admin Template from Core UI](https://github.com/coreui/coreui-free-react-admin-template)
* In order to run the project locally you need to run both server and client repo with different port and convigure the .env file for the URL of the [server](https://github.com/daffavcd/satyr-server) of the client repo.
* The database is hosted on CockroachDB (Credentials are provided in my message), considering initially i want to use cloud hosting MySQL using PlanetScale but it's free version has been deprecated.

## Installation Locally

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
