const express=require('express');
const socketio=require('socket.io');
const http= require('http');

const app=express();

// we use require because we're now dealing with server and backend, not react
