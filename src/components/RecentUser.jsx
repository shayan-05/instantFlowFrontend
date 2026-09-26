import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function RecentUser({ socket }) {

    const [recentUsers, setRecentUsers] = useState([]);

    useEffect(() => {

        socket.emit("get_recent_users");

        const handleRecentUsers = (users) => {
            setRecentUsers(users);
        };

        socket.on("recent_users", handleRecentUsers);

        return () => {
            socket.off("recent_users", handleRecentUsers);
        };

    }, [socket]);


    return (
        <div className="flex h-full w-full flex-col bg-white">

            {/* Header */}
            <div className="border-b border-slate-200 px-5 py-5">

                <div className="flex items-center justify-between">

                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            Chats
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Your recent conversations
                        </p>
                    </div>

                    <button
                        className="
                            flex
                            h-10
                            w-10
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


                {/* Search */}
                <div className="relative mt-4">

                    <span className="
                        pointer-events-none
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                    ">
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            bg-slate-50
                            py-2.5
                            pl-10
                            pr-4
                            text-sm
                            text-slate-800
                            outline-none
                            transition
                            focus:border-blue-400
                            focus:bg-white
                            focus:ring-4
                            focus:ring-blue-500/10
                        "
                    />

                </div>

            </div>


            {/* Recent Chats */}

            <div className="flex-1 overflow-y-auto">

                {recentUsers.length === 0 ? (

                    <div className="
                        flex
                        h-full
                        flex-col
                        items-center
                        justify-center
                        px-6
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
                            bg-slate-100
                            text-2xl
                        ">
                            💬
                        </div>

                        <h3 className="font-semibold text-slate-800">
                            No conversations yet
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Start a conversation with someone to see it here.
                        </p>

                    </div>

                ) : (

                    <div className="divide-y divide-slate-100">

                        {recentUsers.map((chat) => (

                            <Link
                                key={chat.user._id}
                            
                                to={`/${chat.user.username}`}
                                className="
                                    flex
                                    cursor-pointer
                                    items-center
                                    gap-3
                                    px-5
                                    py-4
                                    transition
                                    hover:bg-slate-50
                                "
                            >

                                {/* Avatar */}

                                <div className="relative shrink-0">

                                    {chat.user.avatar ? (

                                        <img
                                            src={chat.user.avatar}
                                            alt={chat.user.fullName}
                                            className="
                                                h-12
                                                w-12
                                                rounded-full
                                                object-cover
                                            "
                                        />

                                    ) : (

                                        <div className="
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-blue-100
                                            text-lg
                                            font-semibold
                                            text-blue-600
                                        ">
                                            {chat.user.fullName
                                                ?.charAt(0)
                                                ?.toUpperCase()}
                                        </div>

                                    )}


                                    {/* Online indicator */}

                                    {chat.online && (

                                        <span className="
                                            absolute
                                            bottom-0
                                            right-0
                                            h-3.5
                                            w-3.5
                                            rounded-full
                                            border-2
                                            border-white
                                            bg-green-500
                                        " />

                                    )}

                                </div>


                                {/* Chat information */}

                                <div className="min-w-0 flex-1">

                                    <div className="flex items-center justify-between gap-3">

                                        <h3 className="
                                            truncate
                                            text-sm
                                            font-semibold
                                            text-slate-900
                                        ">
                                            {chat.user.fullName}
                                        </h3>

                                        <span className="
                                            shrink-0
                                            text-xs
                                            text-slate-400
                                        ">
                                            {new Date(
                                                chat.lastMessageTime
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </span>

                                    </div>


                                    <p className="
                                        mt-1
                                        truncate
                                        text-sm
                                        text-slate-500
                                    ">
                                        {chat.lastMessage}
                                    </p>

                                </div>

                            </Link>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}