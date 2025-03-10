import React, { InputHTMLAttributes } from "react";

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({ placeholder, ...props }) => {
    return (
        <input
            className="border px-3 py-2 rounded-md w-full"
            placeholder={placeholder || "Gib etwas ein..."}
            {...props}
        />
    );
};

export { Input };
