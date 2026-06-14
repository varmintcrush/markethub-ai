
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "../store/authStore";

export default function Sidebar() {
  const pathname = usePathname();

  const {
    user,
    logout
  } = useAuthStore();

  const menu = [
    {
      name: "Dashboard",
      href: "/",
      roles: [
        "CUSTOMER",
        "SELLER",
        "ADMIN"
      ]
    },

    {
      name: "Products",
      href: "/products",
      roles: [
        "CUSTOMER",
        "SELLER",
        "ADMIN"
      ]
    },

    {
      name: "Cart",
      href: "/cart",
      roles: [
        "CUSTOMER"
      ]
    },

    {
      name: "Orders",
      href: "/orders",
      roles: [
        "CUSTOMER",
        "SELLER",
        "ADMIN"
      ]
    },
    {
  name: "Chat",
  href: "/chat",
  roles: [
    "CUSTOMER",
    "SELLER",
    "ADMIN"
  ]
},
    {
  name: "AI Search",
  href: "/search",
  roles: [
    "CUSTOMER",
    "SELLER",
    "ADMIN"
     ]
    },

    {
      name: "Seller Panel",
      href: "/seller",
      roles: [
        "SELLER",
        "ADMIN"
      ]
    },

    {
      name: "Admin Panel",
      href: "/admin",
      roles: [
        "ADMIN"
      ]
    }
  ];

  return (
    <aside
      className="
      w-72
      min-h-screen
      bg-slate-950
      border-r
      border-slate-800
      flex
      flex-col
      "
    >
      <div
        className="
        p-6
        border-b
        border-slate-800
        "
      >
        <h1
          className="
          text-4xl
          font-bold
          bg-gradient-to-r
          from-cyan-400
          to-blue-500
          bg-clip-text
          text-transparent
          "
        >
          MarketHub AI
        </h1>

        <p className="text-slate-500 mt-2">
          AI Powered Marketplace
        </p>
      </div>

      <div className="flex-1 p-4">
        <div className="space-y-2">

          {!user ? (

            <Link
              href="/"
              className="
              block
              px-4
              py-3
              rounded-xl
              bg-cyan-600
              "
            >
              Dashboard
            </Link>

          ) : (

            menu
              .filter((item) =>
                item.roles.includes(
                  user.role
                )
              )
              .map((item) => (

                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                  block
                  px-4
                  py-3
                  rounded-xl
                  transition

                  ${
                    pathname ===
                    item.href
                      ? "bg-cyan-600"
                      : "hover:bg-slate-800"
                  }
                  `}
                >
                  {item.name}
                </Link>

              ))

          )}

        </div>
      </div>

      <div
        className="
        border-t
        border-slate-800
        p-4
        "
      >
        {!user ? (

          <>
            <Link
              href="/login"
              className="
              block
              text-center
              py-3
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              font-semibold
              mb-3
              "
            >
              Login
            </Link>

            <Link
              href="/register"
              className="
              block
              text-center
              py-3
              rounded-2xl
              bg-gradient-to-r
              from-emerald-500
              to-green-600
              font-semibold
              "
            >
              Register
            </Link>
          </>

        ) : (

          <>
            <div
              className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-4
              mb-4
              "
            >
              <p className="text-slate-400 text-sm">
                Logged in as
              </p>

              <p className="font-semibold mt-1">
                {user.email}
              </p>

              <div className="mt-3">
                <span
                  className="
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  bg-cyan-500/20
                  text-cyan-400
                  "
                >
                  {user.role}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                localStorage.clear();
                window.location.href =
                  "/login";
              }}
              className="
              w-full
              py-3
              rounded-2xl
              bg-gradient-to-r
              from-red-500
              to-pink-600
              font-semibold
              "
            >
              Logout
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
