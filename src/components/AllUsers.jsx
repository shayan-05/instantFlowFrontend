import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllUsers() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        const getUsers = async () => {

            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_URL}/user/all-user`,
                    {
                        withCredentials: true
                    }
                );

                setUsers(response.data.data);

            } catch (error) {

                console.log("Error fetching users:", error);

            }

        };

        getUsers();

    }, []);


    const filteredUsers = users.filter((user) =>
        user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        user.username?.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className="flex h-full w-full flex-col bg-white">

            {/* Header */}

            <div className="border-b border-slate-200 px-5 py-5">

                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        All Users
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Find someone to start a conversation
                    </p>
                </div>


                {/* Search */}

                <div className="relative mt-4">

                    <span
                        className="
                            pointer-events-none
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "
                    >
                        🔍
                    </span>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search users..."
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


            {/* Users */}

            <div className="flex-1 overflow-y-auto">

                {filteredUsers.length === 0 ? (

                    <div
                        className="
                            flex
                            h-full
                            flex-col
                            items-center
                            justify-center
                            px-6
                            text-center
                        "
                    >

                        <div
                            className="
                                mb-4
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-full
                                bg-slate-100
                                text-2xl
                            "
                        >
                            👥
                        </div>

                        <h3 className="font-semibold text-slate-800">
                            No users found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Try searching for a different name or username.
                        </p>

                    </div>

                ) : (

                    <div className="divide-y divide-slate-100">

                        {filteredUsers.map((user) => (

                            <Link
                                key={user._id}
                                to={`/${user.username}`}
                                className="
                                    flex
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

                                    {user.avatar ? (

                                        <img
                                            src={user.avatar}
                                            alt={user.fullName}
                                            className="
                                                h-12
                                                w-12
                                                rounded-full
                                                object-cover
                                            "
                                        />

                                    ) : (

                                        <div
                                            className="
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
                                            "
                                        >
                                            {user.fullName
                                                ?.charAt(0)
                                                ?.toUpperCase()}
                                        </div>

                                    )}


                                    {/* Online indicator */}

                                    {user.status && (

                                        <span
                                            className="
                                                absolute
                                                bottom-0
                                                right-0
                                                h-3.5
                                                w-3.5
                                                rounded-full
                                                border-2
                                                border-white
                                                bg-green-500
                                            "
                                        />

                                    )}

                                </div>


                                {/* User Information */}

                                <div className="min-w-0 flex-1">

                                    <h3
                                        className="
                                            truncate
                                            text-sm
                                            font-semibold
                                            text-slate-900
                                        "
                                    >
                                        {user.fullName}
                                    </h3>

                                    <p
                                        className="
                                            mt-1
                                            truncate
                                            text-sm
                                            text-slate-500
                                        "
                                    >
                                        @{user.username}
                                    </p>

                                </div>


                                {/* Arrow */}

                                <span
                                    className="
                                        text-lg
                                        text-slate-300
                                        transition
                                        group-hover:text-blue-500
                                    "
                                >
                                    →
                                </span>

                            </Link>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}