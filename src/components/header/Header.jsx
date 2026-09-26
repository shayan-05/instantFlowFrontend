import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import Logout from '../Logout'
import { useSelector } from 'react-redux'

export default function Header(){
    const authstatus = useSelector((state)=>state.auth.status)
    const navItems = authstatus
        ? [
            { name:"All users", slug:"/all-user" },
            { name:"Recent chats", slug:"/recent-user" }
        ]
        : []

    return(
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
            <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
                <Link to="/" className="flex shrink-0 items-center gap-2 text-lg font-bold text-slate-900">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm text-white">C</span>
                    <span>InstantFlow</span>
                </Link>

                <nav aria-label="Main navigation" className="order-3 w-full sm:order-2 sm:w-auto">
                    <ul className="flex flex-wrap items-center gap-1">
                        {authstatus && (
                            <li>
                                <NavLink
                                    to="/"
                                    end
                                    className={({isActive}) => `block rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                                >
                                    Home
                                </NavLink>
                            </li>
                        )}
                        {navItems.map((item) => (
                            <li key={item.slug}>
                                <NavLink
                                    to={item.slug}
                                    className={({isActive}) => `block rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="order-2 ml-auto flex items-center gap-2 sm:order-3">
                    {authstatus ? (
                        <Logout />
                    ) : (
                        <>
                            <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                                Log in
                            </Link>
                            <Link to="/signup" className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}