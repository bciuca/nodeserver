# IFRAME Test Harness

A simple server and test page to run the method [`Window.postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage) from parent document to child iframe.

The Node.js server will deliver pages over HTTP and HTTPS protocols. A self-signed certificate is include in this repo for convenience.

__Note: This is not production ready code and is intended only for testing purposes.__

## Requirements

Install [Node.js](http://nodejs.org/download/) v0.10.x and [NPM](https://www.npmjs.org/) (should be included with the Node.js installation).

## Setup
* After cloning this repo, you will need to run `npm install` in the repo root to install the required Node.js modules ([Express.js](http://expressjs.com/) and [Seshat](https://github.com/Netflix-Skunkworks/seshat)).
* (Optional) Set environment variables for HTTP and HTTPS ports. The defaults are 3000 and 3001.
  * HTTP: `$PORT`
  * HTTPS: `$SSL_PORT`
* All static assets (HTML, CSS, JS, etc) are served from `./public/`

## Start the server

To start the server, run `node app` from the repo root. All server logging messages will be printed to the console.

## Test Pages

### IFRAME Test

The purpose of this test is to determine the transit speed of the `postMessage` method from parent document to iframe, then back to parent document. The iframe source is using HTTPS protocol.

The automated test runs can run synchronously and asynchronously. When running asynchronously, the data is sent from the parent to the iframe, then the iframe back to parent. Once the round trip is complete, another request is made.

The test page can be loaded from `localhost:3000/iframetest.html`. Since the iframe is loading from the local HTTPS instance aginst a self signed certificate, you will first need to accept the self-signed cert by visiting `https://localhost:3001/receiver.html`.
