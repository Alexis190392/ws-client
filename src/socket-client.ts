import {Manager, Socket} from "socket.io-client";


export const connectToServer = () => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');

    //primero llega al server
    const socket = manager.socket('/');

    addListeners(socket);

}


const addListeners = (socket: Socket ) => {

    const serverSatusLabel = document.querySelector('#server-status')!;
    const clientsUl= document.querySelector('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;


    //para escuchar socket.on, para hablar socket.emit

    //escuchar el estado de la conexion
    socket.on('connect',()=>{
        // console.log('connected');
        serverSatusLabel.innerHTML = 'connected';
    })

    socket.on('disconnect',()=>{
        // console.log('disconnected');
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