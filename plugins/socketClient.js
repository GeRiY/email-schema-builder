import io from 'socket.io-client';
import {getToken} from "@/api/loginHelper";

var socket = null;
var url = location.hostname === process.env.hostName ? process.env.socketUrl : 'http://192.168.0.99:3000';
export const createConnection =() => {
    console.log({url})
    socket = io(url, {
        path: "/io",
        /*query: {
            token: getToken()
        }*/
    });
    socket.on('connected', () => {
        emitMessage('felcsatliztam');
        console.log('Connected:', socket.id);
    });
    return socket;
};

export const getSocket = () => {
    if (socket == null) {
        createConnection();
    }
    return socket;
}

export const disconnect = () => {
    if (socket != null) {
        socket.disconnect();
        socket = null;
    }
}

export const onMessage = (handler) => {
    if (socket != null) {
        socket.on('message', (data) => {
            console.log('onMessage',data);
            handler(data);
        });
    }
}

export const onUpdateUserList = (handler) => {
    if (socket != null) {
        socket.on('update-user-list', (data) => {
            console.log('onUpdateUserList',data);
            handler(data);
        });
    }
}

export const onLeave = (handler) => {
    if (socket != null) {
        socket.on('leave', () => {
            socket.disconnect();
            if (handler) {
                handler();
            }
        });
    }
}

export const socketDisconnect = () => {
    if (socket != null) {
        socket.disconnect();
    }
}

export const emitMessage = (data) => {
    console.log('emitMessage',data)
    if (socket != null) {
        socket.emit('message', data);
    }
}
