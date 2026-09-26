import React, { useId } from "react";

const Select = React.forwardRef(function Select(
    {
        options = [],
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

            <select
                id={id}
                ref={ref}
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
                    transition-all
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-500/10
                    ${className}
                `}
                {...props}
            >
                {options.map((option) => (
                    <option
                        key={option}
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>

        </div>
    );
});

export default Select;