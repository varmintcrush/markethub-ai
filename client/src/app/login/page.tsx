
"use client";

import { useState } from "react";
import { api } from "../lib/api";
import { useRouter } from "next/navigation";
import { useAuthStore} from "../store/authStore";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const { login: loginStore } =
  useAuthStore();

  async function login() {
    try {
      setLoading(true);

      const res =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

     loginStore(
  res.data.token,
  res.data.user
);  

      const role =
        res.data.user.role;

      if (
        role === "ADMIN"
      ) {
        router.push("/admin");
      } else if (
        role === "SELLER"
      ) {
        router.push("/seller");
      } else {
        router.push("/");
      }

    } catch (error) {
      console.error(error);

      alert(
        "Login failed"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-black
      "
    >
      <div
        className="
        w-full
        max-w-md
        bg-slate-900
        border
        border-slate-800
        rounded-3xl
        p-8
        shadow-2xl
        "
      >
        <h1
          className="
          text-4xl
          font-bold
          text-cyan-400
          mb-2
          "
        >
          Welcome Back
        </h1>

        <p className="text-slate-400 mb-6">
          Login to MarketHub AI
        </p>

        <input
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
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
          outline-none
          "
        />

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
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
          outline-none
          "
        />

        <button
          onClick={login}
          disabled={loading}
          className="
          w-full
          py-3
          rounded-xl
          bg-gradient-to-r
          from-cyan-500
          to-blue-600
          font-semibold
          hover:scale-105
          transition
          disabled:opacity-50
          "
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <div className="mt-6 text-center">
          <a
            href="/register"
            className="
            text-cyan-400
            hover:text-cyan-300
            "
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}
