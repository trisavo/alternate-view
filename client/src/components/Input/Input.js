import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message, name}) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder={name}
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>
)

export default Input;
