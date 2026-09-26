import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/authSlice';
import Button from './Button';
import axios from 'axios';
export default function Logout(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    async function loggingOut() {
        setError("");
        setIsLoggingOut(true);
        try {
            await axios.post(`${import.meta.env.VITE_URL}/user/logout`, {}, { withCredentials: true });
            dispatch(logout());
            navigate("/login");
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Could not log out. Please try again.");
        } finally {
            setIsLoggingOut(false);
        }
    }

    return (
        <div className="flex flex-col items-end gap-1">
            <Button
                className="rounded-lg px-4 py-2"
                bgColor="bg-slate-900"
                onClick={loggingOut}
                disabled={isLoggingOut}
            >
                {isLoggingOut ? "Logging out..." : "Log out"}
            </Button>
            {error && <span className="text-xs text-red-600" role="alert">{error}</span>}
        </div>
    )
}