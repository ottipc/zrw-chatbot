"use client";

import React, { useState } from "react";
import ChatModal from "./ChatModal";
import Image from "next/image";

const ChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* CHAT-BUTTON EXAKT UNTEN RECHTS */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-5 right-5 w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-105 z-50"
            >
                <Image src="/bot.png" alt="Chat" width={50} height={50} />
            </button>

            {/* ChatModal wird geöffnet */}
            {isOpen && <ChatModal closeModal={() => setIsOpen(false)} />}
        </>
    );
};

export default ChatButton;
