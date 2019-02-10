# fixer-to-qraphql
A simple server, to consume the fixer.io API and to expose it via GraphQL. It also supports caching.

## Setup
- run `npm i`
- add your fixer.io API-key in `globals.js`

## Development Server
- install nodemon `npm i -g nodemon` (if you see red text, try `sudo`)
- run `npm start`

This starts a development-server, that restarts when you change a file.

## Production
- install pm2 `npm i -g pm2` (if you see red text, try `sudo`)
- run `npm run forever`

This starts the server in a new process and keeps it running.

## Sample request
```
{
  convert(query: {
    from: "USD"
    to: "EUR"
    amount: 99.99,
    accuracy: 2, # optional
    decimalSeperator: "." # optional
    seperator: "," # optional
  })
}
```
