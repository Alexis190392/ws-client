import {Manager, Socket} from "socket.io-client";

let socket: Socket;
export const connectToServer = (token: string) => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js',{
        extraHeaders:{
            hola: 'mundo',
            authentication: token
        }
    });

    //borra todos los listeners anteriores
    socket?.removeAllListeners();
    socket = manager.socket('/');

    addListeners();

}

const addListeners = () => {

    const serverSatusLabel = document.querySelector('#server-status')!;
    const clientsUl= document.querySelector('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;


    //para escuchar socket.on, para hablar socket.emit

    //escuchar el estado de la conexion
    socket.on('connect',()=>{
        serverSatusLabel.innerHTML = 'connected';
    })

    socket.on('disconnect',()=>{
        serverSatusLabel.innerHTML = 'disconnected';
    })

    socket.on('clients-update',(clients:string[])=>{
        // console.log({clients})
        let clientsHtml ='';

        clients.forEach(clientId=>{
            clientsHtml += `
            <li>${clientId}</li>
            `
        });
        clientsUl.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (event) =>{
        event.preventDefault();//evitar la propagacion del form y no haga un refresh

        if (messageInput.value.trim().length <= 0)
            return;

        socket.emit('message-from-client', {id: 'YO!!!', message: messageInput.value});

        messageInput.value = '';

    });

    socket.on('message-from-server', (payload: {fullName:string, message: string})=>{
        const  newMessage = `
        <li>
            <strong>${payload.fullName}</strong>
            <strong>${payload.message}</strong>
        </li>
        `;
        const  li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li);
    })
}