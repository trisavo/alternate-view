const express=require('express');
const socketio=require('socket.io');
const http= require('http');
const cors=require('cors');

const {addUser,removeUser,getUser,getUsersInRoom} = require('./users.js');

const app=express();

const PORT=process.env.PORT || 5000;
//listens for port for deployment, if not deployed, then run locally on port 3000

const router=require('./router');
//calls the router that we made

//go to socket.io and find the documentation after control+f 'node'

// we use require because we're now dealing with server and backend, not react

const server=http.createServer(app);
const io=socketio(server);

app.use(router);
app.use(cors());
io.on('connection', (socket) =>{
  console.log('we 1 socket bois');

  socket.on('join',({name,room},callback) =>{
    const {error,user}=addUser({id:socket.id,name,room});

  //  const error=true;
  //  if(error){
  //  callback({error: 'rip lul'});
  //} this is error handling and this {error,user} can only take those 2 parameters

    if(error) return callback(error);

    socket.emit('message',{user:'admin',text:`${user.name} has finally met their fate in ${user.room}`});
    socket.broadcast.to(user.room).emit('message',{user:'admin',text: `${user.name} has joined the rest of u sad bois`});
    //broadcast sends message to everyone besides curernt user
    socket.join(user.room);

    callback();
  })

socket.on('sendMessage',(message,callback)=>{
  const user=getUser(socket.id);

  io.to(user.room).emit('message',{user:user.name,text:message});
  callback();
});


  //run all code inside of socket bc we're all just managing one socket
  socket.on('disconnect',()=>{
    console.log('sad boi hours :c');
  });
});

//pass in app creted from express, and io is passing in server creted
app.use(router);
//calls the router

server.listen(PORT,() => console.log(`Server has started kekekkeke ${PORT}`));
