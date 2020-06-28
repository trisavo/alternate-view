import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Join = () =>{
  const [name,setName]=useState('');
  const [room,setRoom]=useState('');

  return(
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        // we use className instead of class bc this is JSX not html
        <div><input placeholder="Name" className="joinInput" type="text" onChange{(event)=> event.target.value}/></div>
        <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange{}/></div>
        <Link>
          <button className="button mt-20" type="submit">does this sign in work</button>
          //mt is margin-top 20
        </Link>
      </div>
    </div>
  )
}
export default Join;
