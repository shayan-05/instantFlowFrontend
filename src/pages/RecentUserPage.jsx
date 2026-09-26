import React from "react";
import RecentUser from "../components/RecentUser.jsx";
import socket from "../socket.js";
export default function RecentUserPage(){
    return(
        <RecentUser socket={socket}/>
    )
}