# React Chat for Maccabi, By Omri.K

This project is designed to chat between two end users using socket.IO

## Technologies

### Server side
developed in Node.JS, MongoDB Socket.IO


### Client side
Developed at REACT/REDUX and SOCKET.IO client

## Ports

Runs the react app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
 

Runs the Node.JS app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

 
### Server side, files

## socketHandler.js

Handles all information passing through socket.IO

## dbModel.js

Moongose database model


### validateModel.js

validate every insert/get to db

### Client side, files

## preProcessHelper.js
Runs each time before the page loads to check if the user is logged in through LocalStorage

## form-components folder
design for reuse code


## api folder
Handles all calls to the API

## index.js
The master code that produces the entire REACT

### For Development purpose -> Reduxt DEVTOOLS still alive
** const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

### Redux 'thunk'
Middleware for redux to preform every ASYNC functions

### You can use the following users
USER -> admin
PASSWORD -> 1234

USER -> demo
PASSWORD -> 1234

### RUN DOCKER
docker build -t "app" ./chat-server
docker build -t "reactapp" ./chat-client
docker-compose up