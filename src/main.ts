import './style.css';
import {connectToServer} from "./socket-client.ts";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
      <h2>Websocket - Client</h2>
      
      <input id="jwtToken" placeholder="Json Web Token"/>
      <button id="btn-connect">Connect</button>
      <br/>
      
      
      
      <span id="server-status">Offline</span>
      
        <ul id="clients-ul"></ul>
        
        <form id="message-form">
            <input placeholder="message" id="message-input">
        </form>
        
        <h3>Messages</h3>
        <ul id='messages-ul'></ul>
        
  
  </div>
`

// connectToServer();

const inputJwt= document.querySelector<HTMLInputElement>('#jwtToken')!;
const btnConnect= document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click',()=>{
    if (inputJwt.value.trim().length <= 0) return alert('Ingrese un token válido!')
    connectToServer(inputJwt.value.trim());
})