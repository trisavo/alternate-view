import React,{useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
{/*
  useSTate and useEffect are called effect-hooks, plz research
  querystring takes in data from the url
*/}

let socket;

const Chat = ({location}) =>{
const [name,setName]=useState('');
const [room,setRoom]=useState('');
const endpoint='localhost:5000';

  useEffect(()=>{
    const {name,room}=queryString.parse(location.search);

    socket=io(endpoint);
    {/*
      change endpoint variable to another port once localhost isnt there
    */}

    setName(name);
    setRoom(room);

    socket.emit('join',{name,room},()=>{

    });

    return () =>{
      socket.emit('disconnect');

      socket.off();
    }
    console.log(socket);
  }, [endpoint,location.search]);

{/*
  [endpoint,location.search sets it so that it only shows if there's a change do we re-render the use effect]
*/}
  return(
    <h1>Chat</h1>
  )
}
export default Chat;
