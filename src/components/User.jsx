import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export default function User({ socket }) {

    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState("");
    const [sendError, setSendError] = useState("");

    const messagesEndRef = useRef(null);

    const {username} =useParams();

    const currentUser = useSelector(
        (state) => state.auth.userData
    );

    const currentUserId = currentUser?._id;

    // Scroll to latest message
    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [chats]);


    // Get chat history
    useEffect(() => {

        if (!username) return;
        setChats([]);

        const handleHistory = (messages) => {
            setChats(messages);
        };

        socket.on("history_sent", handleHistory);
        socket.emit("get_History", {
            recieverUsername: username
        });

        return () => {
            socket.off("history_sent", handleHistory);
        };

    }, [socket, username]);


    // Receive new message
    useEffect(() => {

        const handleReceiveMessage = (newMessage) => {

            setChats((prev) => [
                ...prev,
                newMessage
            ]);

        };

        socket.on("receive_message", handleReceiveMessage);

        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };

    }, [socket]);

    useEffect(() => {
        const handleMessageError = (error) => {
            setSendError(error.message || "Message could not be sent.");
        };

        socket.on("message_error", handleMessageError);

        return () => {
            socket.off("message_error", handleMessageError);
        };
    }, [socket]);


    // Receive message sent confirmation
    useEffect(() => {

        const handleMessageSent = (newMessage) => {

            setChats((prev) => [
                ...prev,
                newMessage
            ]);

        };

        socket.on("message_sent", handleMessageSent);

        return () => {
            socket.off("message_sent", handleMessageSent);
        };

    }, [socket]);


    // Send message
    const sendMessage = () => {

        if (!message.trim() || !username) return;
        if (!socket.connected) {
            setSendError("Not connected to the chat server. Please try again.");
            return;
        }

        setSendError("");

        socket.emit("send_message", {
            recieverUsername: username,
            message: message.trim()
        });

        setMessage("");
    };


    return (
        <div className="flex h-full min-h-0 w-full flex-col bg-slate-50">


            {/* ================= CHAT HEADER ================= */}

            <div className="
                flex
                items-center
                gap-3
                border-b
                border-slate-200
                bg-white
                px-5
                py-4
            ">

                {/* Avatar */}

                <div className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-100
                    text-lg
                    font-semibold
                    text-blue-600
                ">
                    {username?.charAt(0)?.toUpperCase()}
                </div>


                {/* User information */}

                <div className="min-w-0">

                    <h2 className="
                        truncate
                        text-base
                        font-semibold
                        text-slate-900
                    ">
                        {username}
                    </h2>

                    <div className="mt-0.5 flex items-center gap-1.5">

                        <span className="
                            h-2
                            w-2
                            rounded-full
                            bg-green-500
                        " />

                        <span className="text-xs text-slate-500">
                            Online
                        </span>

                    </div>

                </div>


                {/* Header buttons */}

                <div className="ml-auto flex items-center gap-1">

                    <button
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            text-slate-500
                            transition
                            hover:bg-slate-100
                            hover:text-slate-700
                        "
                    >
                        📞
                    </button>

                    <button
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            text-slate-500
                            transition
                            hover:bg-slate-100
                            hover:text-slate-700
                        "
                    >
                        ⋮
                    </button>

                </div>

            </div>


            {/* ================= MESSAGES ================= */}

            <div className="
                min-h-0
                flex-1
                overflow-y-auto
                px-4
                py-6
                sm:px-6
            ">

                {chats.length === 0 ? (

                    <div className="
                        flex
                        h-full
                        flex-col
                        items-center
                        justify-center
                        text-center
                    ">

                        <div className="
                            mb-4
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-100
                            text-2xl
                        ">
                            💬
                        </div>

                        <h3 className="
                            font-semibold
                            text-slate-800
                        ">
                            Start a conversation
                        </h3>

                        <p className="
                            mt-1
                            max-w-xs
                            text-sm
                            text-slate-500
                        ">
                            Send a message to start chatting with {username}.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-3">

                        {chats.map((chat) => {

                            const isSent =
                                chat.senderId?.toString() ===
                                currentUserId?.toString();

                            return (

                                <div
                                    key={chat._id}
                                    className={`
                                        flex
                                        ${isSent
                                            ? "justify-end"
                                            : "justify-start"
                                        }
                                    `}
                                >

                                    <div
                                        className={`
                                            max-w-[75%]
                                            rounded-2xl
                                            px-4
                                            py-2.5
                                            shadow-sm
                                            sm:max-w-[65%]
                                            ${isSent
                                                ? "rounded-br-md bg-blue-600 text-white"
                                                : "rounded-bl-md bg-white text-slate-800"
                                            }
                                        `}
                                    >

                                        <p className="
                                            whitespace-pre-wrap
                                            break-words
                                            text-sm
                                            leading-6
                                        ">
                                            {chat.content}
                                        </p>


                                        <div className={`
                                            mt-1
                                            flex
                                            items-center
                                            justify-end
                                            gap-1.5
                                            text-[10px]
                                            ${isSent
                                                ? "text-blue-100"
                                                : "text-slate-400"
                                            }
                                        `}>

                                            <span>
                                                {new Date(
                                                    chat.createdAt
                                                ).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </span>


                                            {/* Message status */}

                                            {isSent && (
                                                <span>
                                                    {chat.status === "delivered"
                                                        ? "✓✓"
                                                        : "✓"
                                                    }
                                                </span>
                                            )}

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                        <div ref={messagesEndRef} />

                    </div>

                )}

            </div>


            {/* ================= MESSAGE INPUT ================= */}

            <div className="
                border-t
                border-slate-200
                bg-white
                px-3
                py-3
                sm:px-5
            ">

                <div className="
                    flex
                    items-end
                    gap-2
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-2
                    transition
                    focus-within:border-blue-400
                    focus-within:bg-white
                    focus-within:ring-4
                    focus-within:ring-blue-500/10
                ">

                    {/* Attachment button */}

                    <button
                        type="button"
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            text-slate-500
                            transition
                            hover:bg-slate-100
                            hover:text-slate-700
                        "
                    >
                        +
                    </button>


                    {/* Input */}

                    {sendError && (
                        <p className="px-2 text-sm text-red-600" role="alert">
                            {sendError}
                        </p>
                    )}

                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="
                            min-w-0
                            flex-1
                            bg-transparent
                            px-2
                            py-2.5
                            text-sm
                            text-slate-900
                            outline-none
                            placeholder:text-slate-400
                        "
                        onKeyDown={(e) => {

                            if (
                                e.key === "Enter" &&
                                !e.shiftKey
                            ) {
                                e.preventDefault();
                                sendMessage();
                            }

                        }}
                    />


                    {/* Send button */}

                    <button
                        type="button"
                        onClick={sendMessage}
                        disabled={!message.trim()}
                        className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-600
                            text-white
                            transition
                            hover:bg-blue-700
                            active:scale-95
                            disabled:cursor-not-allowed
                            disabled:bg-slate-300
                        "
                    >
                        ➤
                    </button>

                </div>

            </div>

        </div>
    );
}