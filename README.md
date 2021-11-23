# Playground for PACT contract testing

A basic test playground with 3 consumers and a single provider.
The consumers have different expectations to the same provider.

## Issues
At the moment there is an issue with a dependency used by @pact-foundation/pact with package
`make-error-cause`. I was only able to change the issue manually in the package manually.

## unclear topics and findings
* API of the package is cumbersome and not really modern JS like
* no support for running with pure relative path definitions
  * have to expose the host + port to process env and have to change impl details to make it work see TODO in [useService](./consumer-c/src/hooks/useService.ts)
* making integration tests with a component that can call with different query params results in failed provider test as the consumer test response has only 1 entry in the array and the provider response with more
  this details shall not matter in my opinion.

## Commands

#### Install
```shell
yarn
```

#### Fix `make-error-cause` package
This is a temporary change that gets resetted every time a yarn command is executed, like add install etc.

* open `./node_modules/make-error-cause/dist/index.js`
* comment line 12
* save

#### running test commands

##### start local pact-broker
```shell
docker-compose up
```
open browser `http://localhost:9292`
##### run consumers tests
 ```shell
 yarn test:consumers
 ```

##### publish pacts to broker
 ```shell
 yarn pact:publish
 ```

##### run provider tests
```shell
yarn test:provider
```
