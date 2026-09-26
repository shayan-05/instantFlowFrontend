import React from "react";

export default function Button({
    children,
    type = "button",
    className = "",
    textColor = "text-white",
    bgColor = "bg-blue-600",
    ...props
}) {
    return (
        <button
            type={type}
            className={`
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                px-5
                py-2.5
                font-medium
                ${textColor}
                ${bgColor}
                transition-all
                duration-200
                hover:brightness-95
                active:scale-[0.98]
                disabled:cursor-not-allowed
                disabled:opacity-50
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}