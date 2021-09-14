const express=require('express');
const socketio=require('socket.io');
const http= require('http');
const cors=require('cors');

const {addUser,removeUser,getUser,getUsersInRoom} = require('./users.js');

const app=express();

const PORT= 5000;

const router=require('./router');
//calls the router that we made

const server=http.createServer(app);
const io=socketio(server);

app.use(router);
app.use(cors());


io.on('connection', (socket) =>{

  console.log('we 1 socket bois');

  socket.on('join',({name,room},callback) =>{
    const {error,user}=addUser({id:socket.id,name,room});

    if(error) return callback(error);

    socket.emit('message',{user:'',text:`${user.name} has finally met their fate in ${user.room}`});
    socket.broadcast.to(user.room).emit('message',{user:'',text: `${user.name} has joined the rest of u sad bois`});
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
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: '', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }

  });
});

//pass in app creted from express, and io is passing in server creted
app.use(router);
//calls the router

server.listen(PORT,() => console.log(`Server has started kekekkeke ${PORT}`));
