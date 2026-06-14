"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket =
  io(
    "http://localhost:5000"
  );

export default function ChatPage() {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState<string[]>([]);

  useEffect(() => {

    socket.on(
      "chat-message",
      (msg) => {

        setMessages(
          (prev) => [
            ...prev,
            msg
          ]
        );

      }
    );

    return () => {
      socket.off(
        "chat-message"
      );
    };

  }, []);

  function sendMessage() {

    if (!message)
      return;

    socket.emit(
      "chat-message",
      message
    );

    setMessage("");
  }

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold text-cyan-400 mb-6">
        Live Chat
      </h1>

      <div
        className="
        h-96
        overflow-auto
        bg-slate-900
        rounded-2xl
        p-4
        mb-4
        "
      >

        {messages.map(
          (
            msg,
            index
          ) => (

            <div
              key={index}
              className="
              bg-slate-800
              p-3
              rounded-xl
              mb-2
              "
            >
              {msg}
            </div>

          )
        )}

      </div>

      <div className="flex gap-3">

        <input
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          className="
          flex-1
          bg-slate-900
          border
          border-slate-700
          p-3
          rounded-xl
          "
        />

        <button
          onClick={
            sendMessage
          }
          className="
          px-6
          bg-cyan-600
          rounded-xl
          "
        >
          Send
        </button>

      </div>

    </div>

  );
}