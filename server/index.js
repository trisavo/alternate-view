const express=require('express');
const socketio=require('socket.io');
const http= require('http');

const {addUser,removeUser,getUser,getUsersInRoom};

const app=express();

const PORT=process.env.PORT || 5000;
//listens for port for deployment, if not deployed, then run locally on port 3000

const router=require('./router');
//calls the router that we made

//go to socket.io and find the documentation after control+f 'node'

// we use require because we're now dealing with server and backend, not react

const server=http.createServer(app);
const io=socketio(server);

io.on('connection', (socket) =>{
  console.log('we 1 socket bois');

  socket.on('join',({name,room},callback) =>{
    console.log(name,room);

  //  const error=true;
  //  if(error){
  //  callback({error: 'rip lul'});
  //} this is error handling
  })

  //run all code inside of socket bc we're all just managing one socket
  socket.on('disconnect',()=>{
    console.log('sad boi hours :c');
  });
});

//pass in app creted from express, and io is passing in server creted
app.use(router);
//calls the router

server.listen(PORT,() => console.log(`Server has started kekekkeke ${PORT}`));
