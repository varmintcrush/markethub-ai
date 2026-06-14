"use client";

import { useState } from "react";
import { api } from "../lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function register() {

    try {

      await api.post(
        "/auth/register",
        {
          fullName,
          email,
          password
        }
      );

      router.push("/login");

    } catch (error) {

      console.error(error);

      alert("Registration failed");

    }
  }

  return (
    <div className="
    min-h-screen
    flex
    items-center
    justify-center
    bg-slate-950
    ">

      <div className="
      w-full
      max-w-md
      bg-slate-900
      border
      border-slate-800
      rounded-3xl
      p-8
      ">

        <h1 className="
        text-4xl
        font-bold
        text-cyan-400
        mb-6
        ">
          Register
        </h1>

        <input
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
          placeholder="Full Name"
          className="
          w-full
          p-3
          rounded-xl
          bg-slate-950
          border
          border-slate-700
          mb-4
          "
        />

        <input
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
          className="
          w-full
          p-3
          rounded-xl
          bg-slate-950
          border
          border-slate-700
          mb-4
          "
        />

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="Password"
          className="
          w-full
          p-3
          rounded-xl
          bg-slate-950
          border
          border-slate-700
          mb-6
          "
        />

        <button
          onClick={register}
          className="
          w-full
          py-3
          rounded-xl
          bg-gradient-to-r
          from-emerald-500
          to-green-600
          "
        >
          Register
        </button>

      </div>

    </div>
  );
}