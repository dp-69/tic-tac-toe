let os = require('os');
let http = require('http');
let express = require('express')
let app = express()
let WebSocket = require('ws');
// let ws = require('express-ws')(app);


let server = http.createServer(app);


// let wss = new WebSocket.Server({ port: 8080 });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });

//   ws.send('something');
// });

// let ws = new WebSocket(`ws://${os.hostname()}:${port}/sockets`);

// ws.on('open', function open() {
//   ws.send('something');
// });

app.get('/', (req, res) => {
  console.log('index');
  res.send('Hello World QQZZ!')
})

// console.log(os.hostname())



// WebSocket.Server
// app.ws('/sockets', (ws, req) => {
//   console.log(`websocket connection ${new Date().toLocaleTimeString()}`);
//   ws.send('lul from server');
//   // for (var t = 0; t < 3; t++)
//     // setTimeout(() => ws.send('message from server', ()=>{}), 1000*t);
// });

app.get('/api/default', (req, res) => {
  let some_info = [
    {id: 3, first: 'John', last: 'Doe'},
    // {id: 5, first: 'Adam', last: 'Smith'}
  ]
  
  res.json(some_info)
  // res.send('Hello World QQZZ!')
});

let squares = Array(9).fill(null);

app.get('/api/get-squares', (req, res) => {
  // squares[0] = 'O';

  res.json(squares)
  // res.send('Hello World QQZZ!')
})









var wss = new WebSocket.Server({server: server, path: '/sockets'});

wss.on('connection', (this_ws, req) => {
  console.log(`client [${req.socket.remoteAddress}] connected ${new Date().toLocaleTimeString()}`);

  this_ws.on('message', m => {
    // JSON.
    if (m[0] !== '{')
      console.log(m);
    else {
      let j = JSON.parse(m);
      console.log(j);

      if (j.type === 'move') {
        squares[j.i] = j.v;

          
      }
      else if (j.type === 'reset') {
        squares = Array(9).fill(null);
        // ws.send({type: 'reset'});
      }

      for (ws of wss.clients) {
        if (this_ws !== ws)
          ws.send(m);
      }
      
      
    }
  })

  // for (ws of wss.clients) {
  //   console.log('  ' + ws._socket.remoteAddress);
  // }

  // ws.send('trivial message');

  
});









let port = 443;//9999;
server.listen(port, () => {
  
  console.log(`Example app listening at http://localhost:${port}`)
})




// wss.on('message')




