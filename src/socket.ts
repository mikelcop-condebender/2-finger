import { io } from "socket.io-client";

const serverIp = process.env.REACT_APP_SERVER_IP;

const socket = io(`${serverIp}`);

export default socket;
