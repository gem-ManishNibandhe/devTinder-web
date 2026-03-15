import io from "socket.io-client";
import { BASE_URL } from "./constants";

let socket = null;

export const createSocketConnection = () => {
    if (!socket) {
        if(location.hostname === "localhost"){
            socket = io(BASE_URL, {
                withCredentials: true,
            });
        }
        else{
            // for production we need to specify the path as well because of nginx configuration   
        socket = io('/',{path: '/api/socket.io'})   
    }

    return socket;
}
}
