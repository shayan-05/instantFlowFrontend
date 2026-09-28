import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import Container from "./Container";
import Input from "./Input";
import Button from "./Button";
import { login } from "../store/authSlice";


export default function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    async function onSubmit(data) {

        setError("");
        setLoading(true);

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_URL}/api/v1/user/login`,
                data,
                {
                    withCredentials: true
                }
            );

            dispatch(login(response.data.data));

            navigate("/");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to login. Please check your credentials."
            );

        } finally {

            setLoading(false);

        }
    }


    return (

        <div className="min-h-screen bg-slate-100">

            <Container className="flex min-h-screen items-center justify-center">

                <div className="w-full max-w-md">

                    {/* Logo / Brand */}

                    <div className="mb-8 text-center">

                        <div className="
                            mx-auto
                            mb-4
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-blue-600
                            text-2xl
                            text-white
                            shadow-lg
                            shadow-blue-600/20
                        ">
                            💬
                        </div>

                        <h1 className="text-3xl font-bold text-slate-900">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Sign in to continue to your conversations
                        </p>

                    </div>


                    {/* Login Card */}

                    <div className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-6
                        shadow-xl
                        shadow-slate-200/50
                        sm:p-8
                    ">

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5"
                        >

                            {/* Email */}

                            <div>

                                <Input
                                    label="Email"
                                    placeholder="Enter your email"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email address"
                                        }
                                    })}
                                />

                                {errors.email && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}

                            </div>


                            {/* Password */}

                            <div>

                                <Input
                                    label="Password"
                                    placeholder="Enter your password"
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters"
                                        }
                                    })}
                                />

                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {errors.password.message}
                                    </p>
                                )}

                            </div>


                            {/* Error */}

                            {error && (

                                <div className="
                                    rounded-xl
                                    border
                                    border-red-200
                                    bg-red-50
                                    px-4
                                    py-3
                                    text-sm
                                    text-red-600
                                ">
                                    {error}
                                </div>

                            )}


                            {/* Submit */}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </Button>

                        </form>


                        {/* Signup */}

                        <p className="mt-6 text-center text-sm text-slate-500">

                            Don't have an account?{" "}

                            <Link
                                to="/signup"
                                className="
                                    font-semibold
                                    text-blue-600
                                    hover:text-blue-700
                                "
                            >
                                Create an account
                            </Link>

                        </p>

                    </div>

                </div>

            </Container>

        </div>
    );
}