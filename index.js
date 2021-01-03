"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sf = __importDefault(require("./socketFunctions"));
const callables = __importDefault(require("./appCallableEndpoints"));

var express = require('express');
var http = require('http');
var io = require('socket.io');
var cors = require('cors');

const main = (express, cors, http, io, port, socketFunctions, callables, clientURL=null) => {
  var app = express();

  if (clientURL) {
    app.use(cors({
      origin: clientURL,
    }))
  }

  var http_ = http.Server(app)
  let io_;

  if (clientURL) {
    io_ = io(http_, {
      cors: {
        origin: clientURL,
        method: ['GET', 'POST']
      }
    });
  } 
  else {
    io_ = io(http_);
  }

  app.get('/', function(req, res){
    res.send('Listening on port ' + port + '.');
  });

  app.get('/example', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  callables.default(app);

  io_.on('connection', function(socket){
    socketFunctions.default(io_, socket);
  });

  http_.listen(port, function(){
    console.log('Listening on port ' + port + '.');
  });

}

const apiPort = 8080;
const api = express();
api.use(express.json());

api.get('/', (req, res) => {
  res.send('Listening on ' + apiPort);
})

api.get('/app/:port', (req, res) => {
  const port = parseInt(req.params.port);
  
  if (req.body['clientURL'] === undefined) {
    main(express, cors, http, io, port, sf, callables);
  } else {
    main(express, cors, http, io, port, sf, callables, req.body['clientURL']);
  }
  
  res.send('App started on port ' + port + '.');
})

api.listen(apiPort, () => console.log('Listening on port ' + apiPort + '.'));
