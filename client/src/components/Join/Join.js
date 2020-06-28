import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Join.css';

const Join = () =>{
  const [name,setName]=useState('');
  const [room,setRoom]=useState('');

  return(
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        {/* we use className instead of class bc this is JSX not html*/}
        <div><input placeholder="Name" className="joinInput" type="text" onChange={(event)=> setName(event.target.value)} /></div>
        <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event)=> setRoom(event.target.value)} /></div>
        <Link onClick={event => (!name || !room) ? event.preventDefault(): null}to={`/chat?name=${name}&${room}`}>
        {/* if there is no name or room, do nothing
        //creates a link that redirects to /chat, ? sets more specifics. ${} is the variable name and & is and
        */}
          <button className="button mt-20" type="submit">does this sign in work</button>

        </Link>
      </div>
    </div>
  )
}
export default Join;
