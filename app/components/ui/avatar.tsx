import React from "react";

const Avatar = ({ src, alt }: { src?: string; alt?: string }) => {
    return (
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            {src ? <img src={src} alt={alt} className="w-full h-full rounded-full" /> : "👤"}
        </div>
    );
};

const AvatarFallback = () => <div className="w-12 h-12 rounded-full bg-gray-300" />;

export { Avatar, AvatarFallback };
