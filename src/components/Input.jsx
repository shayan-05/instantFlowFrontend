import React, { useId } from "react";

const Input = React.forwardRef(function Input(
    {
        type = "text",
        label,
        className = "",
        ...props
    },
    ref
) {

    const id = useId();

    return (
        <div className="w-full space-y-2">

            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-slate-700"
                >
                    {label}
                </label>
            )}

            <input
                id={id}
                ref={ref}
                type={type}
                className={`
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-3
                    text-sm
                    text-slate-900
                    outline-none
                    placeholder:text-slate-400
                    transition-all
                    duration-200
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/10
                    ${className}
                `}
                {...props}
            />

        </div>
    );
});

export default Input;