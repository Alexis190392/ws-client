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
    })
}