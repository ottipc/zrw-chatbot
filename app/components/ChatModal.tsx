"use client";

import React from "react";

const ChatModal = ({ closeModal }: { closeModal: () => void }) => {
    return (
        <div className="fixed bottom-20 right-5 w-[360px] h-[520px] bg-white shadow-xl rounded-lg border border-gray-300 overflow-hidden z-50">
            {/* Kleiner Header mit Close-Button */}
            <div className="flex justify-end bg-gray-100 p-2">
                <button onClick={closeModal} className="text-gray-600 hover:text-gray-900 text-lg">
                    ✖
                </button>
            </div>

            {/* Chatbot Iframe – Perfekt eingebunden */}
            <iframe
                src="https://zrw-chatbot-zeta.vercel.app/"
                title="Chat Widget"
                className="w-full h-full border-none"
            />
        </div>
    );
};

export default ChatModal;
