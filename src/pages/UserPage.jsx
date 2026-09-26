import React from "react";
import User from "../components/User.jsx";
import socket from "../socket.js";
export default function UserPage(){
    return(
        <User socket={socket}/>
    )
}