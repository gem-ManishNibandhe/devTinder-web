import io from "socket.io-client";
import { BASE_URL } from "./constants";

let socket = null;

export const createSocketConnection = () => {
    if (!socket) {
        if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
            socket = io(BASE_URL, {
                withCredentials: true,
            });
        } else {
            // production: assume nginx proxies /api to backend and socket path is /api/socket.io
            socket = io('/', { path: '/api/socket.io', withCredentials: true });
        }

        socket.on('connect', () => {
            console.log('Socket connected', socket.id);
        });

        socket.on('disconnect', (reason) => {
            console.log('Socket disconnected', reason);
        });
    }

    return socket;
}

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}
