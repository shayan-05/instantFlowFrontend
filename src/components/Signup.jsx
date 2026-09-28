import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Container from "./Container";
import Input from "./Input";
import Button from "./Button";


export default function Signup() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    async function onSubmit(data) {

        setError("");
        setLoading(true);

        try {

            const formData = new FormData();

            formData.append("fullName", data.fullName);
            formData.append("username", data.username);
            formData.append("email", data.email);
            formData.append("password", data.password);

            if (data.avatar?.[0]) {
                formData.append("avatar", data.avatar[0]);
            }


            await axios.post(
                `${import.meta.env.VITE_URL}/api/v1/user/create-user`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                }
            );


            // After successful signup,
            // go to login page.
            navigate("/login");


        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to create account. Please try again."
            );

        } finally {

            setLoading(false);

        }
    }


    return (

        <div className="min-h-screen bg-slate-100">

            <Container className="flex min-h-screen items-center justify-center py-10">

                <div className="w-full max-w-md">


                    {/* Brand */}

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
                            Create your account
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Join the conversation and start chatting
                        </p>

                    </div>


                    {/* Signup Card */}

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


                            {/* Full Name */}

                            <div>

                                <Input
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                    type="text"
                                    {...register("fullName", {
                                        required: "Full name is required"
                                    })}
                                />

                                {errors.fullName && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {errors.fullName.message}
                                    </p>
                                )}

                            </div>


                            {/* Username */}

                            <div>

                                <Input
                                    label="Username"
                                    placeholder="Choose a unique username"
                                    type="text"
                                    {...register("username", {
                                        required: "Username is required",
                                        minLength: {
                                            value: 3,
                                            message: "Username must be at least 3 characters"
                                        }
                                    })}
                                />

                                {errors.username && (
                                    <p className="mt-1.5 text-xs text-red-500">
                                        {errors.username.message}
                                    </p>
                                )}

                            </div>


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
                                    placeholder="Create a password"
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


                            {/* Avatar */}

                            <div>

                                <label
                                    htmlFor="avatar"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Profile Picture
                                </label>

                                <input
                                    id="avatar"
                                    type="file"
                                    accept="image/*"
                                    className="
                                        block
                                        w-full
                                        cursor-pointer
                                        rounded-xl
                                        border
                                        border-slate-200
                                        bg-slate-50
                                        text-sm
                                        text-slate-600
                                        file:mr-4
                                        file:border-0
                                        file:bg-blue-50
                                        file:px-4
                                        file:py-2.5
                                        file:text-sm
                                        file:font-medium
                                        file:text-blue-700
                                        hover:file:bg-blue-100
                                    "
                                    {...register("avatar")}
                                />

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
                                {loading
                                    ? "Creating account..."
                                    : "Create Account"
                                }
                            </Button>

                        </form>


                        {/* Login */}

                        <p className="mt-6 text-center text-sm text-slate-500">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="
                                    font-semibold
                                    text-blue-600
                                    hover:text-blue-700
                                "
                            >
                                Sign in
                            </Link>

                        </p>

                    </div>

                </div>

            </Container>

        </div>
    );
}