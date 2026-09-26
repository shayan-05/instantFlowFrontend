import React from "react";
import { Link } from "react-router-dom";

export default function Home() {

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Navbar */}
            <nav className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl font-bold text-blue-600"
                    >
                        ChatFlow
                    </Link>

                    

                </div>
            </nav>


            {/* Hero Section */}
            <main className="mx-auto max-w-7xl px-6">

                <div className="
                    grid
                    min-h-[calc(100vh-73px)]
                    items-center
                    gap-12
                    lg:grid-cols-2
                ">

                    {/* Left Side */}
                    <div>

                        <div className="
                            mb-6
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-blue-50
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-blue-600
                        ">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            Real-time messaging
                        </div>


                        <h1 className="
                            text-5xl
                            font-bold
                            leading-tight
                            text-slate-900
                            md:text-6xl
                        ">
                            Connect.
                            <br />

                            <span className="text-blue-600">
                                Chat.
                            </span>

                            {" "}Stay connected.
                        </h1>


                        <p className="
                            mt-6
                            max-w-xl
                            text-lg
                            leading-8
                            text-slate-500
                        ">
                            Connect with people and enjoy simple,
                            fast and real-time conversations.
                        </p>

                        

                    </div>


                    {/* Right Side - Chat Preview */}
                    <div className="flex justify-center">

                        <div className="
                            w-full
                            max-w-md
                            overflow-hidden
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                            shadow-xl
                        ">

                            {/* Chat Header */}
                            <div className="
                                flex
                                items-center
                                gap-3
                                border-b
                                border-slate-200
                                px-5
                                py-4
                            ">

                                <div className="
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-blue-100
                                    font-semibold
                                    text-blue-600
                                ">
                                    A
                                </div>

                                <div>

                                    <h3 className="
                                        font-semibold
                                        text-slate-900
                                    ">
                                        Alex
                                    </h3>

                                    <div className="
                                        flex
                                        items-center
                                        gap-1.5
                                        text-xs
                                        text-slate-500
                                    ">

                                        <span className="
                                            h-2
                                            w-2
                                            rounded-full
                                            bg-green-500
                                        " />

                                        Online

                                    </div>

                                </div>

                            </div>


                            {/* Messages */}
                            <div className="
                                space-y-4
                                bg-slate-50
                                px-5
                                py-8
                            ">

                                {/* Received */}
                                <div className="
                                    max-w-[75%]
                                    rounded-2xl
                                    rounded-bl-md
                                    bg-white
                                    px-4
                                    py-3
                                    shadow-sm
                                ">

                                    <p className="text-sm text-slate-700">
                                        Hey! How are you?
                                    </p>

                                </div>


                                {/* Sent */}
                                <div className="
                                    ml-auto
                                    max-w-[75%]
                                    rounded-2xl
                                    rounded-br-md
                                    bg-blue-600
                                    px-4
                                    py-3
                                    text-white
                                ">

                                    <p className="text-sm">
                                        I'm doing great! 🚀
                                    </p>

                                </div>


                                {/* Received */}
                                <div className="
                                    max-w-[75%]
                                    rounded-2xl
                                    rounded-bl-md
                                    bg-white
                                    px-4
                                    py-3
                                    shadow-sm
                                ">

                                    <p className="text-sm text-slate-700">
                                        That's awesome!
                                    </p>

                                </div>

                            </div>


                            {/* Fake Input */}
                            <div className="
                                flex
                                items-center
                                gap-2
                                border-t
                                border-slate-200
                                bg-white
                                p-4
                            ">

                                <div className="
                                    flex-1
                                    rounded-xl
                                    bg-slate-50
                                    px-4
                                    py-3
                                    text-sm
                                    text-slate-400
                                ">
                                    Type a message...
                                </div>

                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-blue-600
                                    text-white
                                ">
                                    →
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}