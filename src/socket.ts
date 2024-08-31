import { io } from "socket.io-client";

const socket = io("https://api.2-finger.com/");

export default socket;
