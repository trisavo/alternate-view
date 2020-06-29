import React,{useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
{/*
  useSTate and useEffect are called effect-hooks, plz research
  querystring takes in data from the url
*/}



let socket;



const Chat = ({location}) =>{
const [name,setName]=useState('');
const [room,setRoom]=useState('');
const[messages,setMessages]=useState([]);
const[message,setMessage]=useState('');
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

//function for adding messages to the total array
useEffect(()=>{
  socket.on('message',(message)=>{
    setMessages([...messages,message]);

  })
},[messages])
//function for sending messages
const sendMessage=(event)=>{
  event.preventDefault();
//prevents full browser refreshes
  if(message){
    socket.emit('sendMessage',message,()=>setMessage(''));
  }
}

console.log(message,messages);

  return(
    <div className="outerContainer">
      <div className="container">
      <InfoBar room={room}/>
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      {/*
//        <input value={message}
//        onChange={(event)=>setMessage(event.target.value)}
//        onKeyPress={(event)=>event.key==='Enter'? sendMessage(event) : null}/>
*/}

      </div>

    </div>
  )
}
export default Chat;
