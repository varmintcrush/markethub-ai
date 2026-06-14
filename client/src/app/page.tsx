
"use client";

import { useEffect, useState } from "react";
import { api } from "./lib/api";

export default function HomePage() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [orders, setOrders] =
    useState<any[]>([]);

  const [query, setQuery] =
    useState("");

  const [searchResults, setSearchResults] =
    useState<any>(null);

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  async function loadProducts() {
    try {

      const res =
        await api.get("/products");

      setProducts(res.data);

    } catch (error) {
      console.error(error);
    }
  }

  async function loadOrders() {
    try {

      const res =
        await api.get("/orders");

      setOrders(res.data);

    } catch (error) {
      console.error(error);
    }
  }

  async function semanticSearch() {
    try {

      const res =
        await api.post(
          "/search",
          { query }
        );

      setSearchResults(
        res.data
      );

    } catch (error) {
      console.error(error);
    }
  }

  const revenue =
    orders.reduce(
      (sum: number, order: any) =>
        sum + order.total,
      0
    );

  return (

    <main
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-black
      text-white
      "
    >

      <div className="max-w-7xl mx-auto p-8">

        {/* Header */}

        <div className="mb-10">

          <h1
            className="
            text-6xl
            font-black
            bg-gradient-to-r
            from-cyan-400
            to-blue-500
            bg-clip-text
            text-transparent
            "
          >
            MarketHub AI
          </h1>

          <p className="text-slate-400 mt-3">
            AI Powered Marketplace Dashboard
          </p>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
            "
          >
            <p className="text-slate-400">
              Products
            </p>

            <h2 className="text-5xl font-bold text-cyan-400 mt-3">
              {products.length}
            </h2>
          </div>

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
            "
          >
            <p className="text-slate-400">
              Orders
            </p>

            <h2 className="text-5xl font-bold text-purple-400 mt-3">
              {orders.length}
            </h2>
          </div>

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
            "
          >
            <p className="text-slate-400">
              Revenue
            </p>

            <h2 className="text-5xl font-bold text-emerald-400 mt-3">
              ${revenue}
            </h2>
          </div>

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
            "
          >
            <p className="text-slate-400">
              AI Searches
            </p>

            <h2 className="text-5xl font-bold text-orange-400 mt-3">
              ∞
            </h2>
          </div>

        </div>

        {/* AI Search */}

        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-8
          mb-10
          "
        >

          <h2 className="text-3xl font-bold text-cyan-400 mb-6">
            AI Semantic Search
          </h2>

          <div className="flex gap-4">

            <input
              value={query}
              onChange={(e) =>
                setQuery(
                  e.target.value
                )
              }
              placeholder="Search products with AI..."
              className="
              flex-1
              bg-slate-950
              border
              border-slate-700
              rounded-2xl
              p-4
              "
            />

            <button
              onClick={
                semanticSearch
              }
              className="
              px-8
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              "
            >
              Search
            </button>

          </div>

          {searchResults && (

            <div
              className="
              mt-6
              bg-slate-950
              border
              border-slate-800
              rounded-2xl
              p-4
              "
            >

              <pre>
                {JSON.stringify(
                  searchResults,
                  null,
                  2
                )}
              </pre>

            </div>

          )}

        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-4 gap-6">

          <a
            href="/products"
            className="
            bg-cyan-600
            rounded-3xl
            p-8
            text-center
            font-bold
            hover:scale-105
            transition
            "
          >
            Products
          </a>

          <a
            href="/cart"
            className="
            bg-emerald-600
            rounded-3xl
            p-8
            text-center
            font-bold
            hover:scale-105
            transition
            "
          >
            Cart
          </a>

          <a
            href="/seller"
            className="
            bg-purple-600
            rounded-3xl
            p-8
            text-center
            font-bold
            hover:scale-105
            transition
            "
          >
            Seller Panel
          </a>

          <a
            href="/admin"
            className="
            bg-orange-600
            rounded-3xl
            p-8
            text-center
            font-bold
            hover:scale-105
            transition
            "
          >
            Admin Panel
          </a>

        </div>

      </div>

    </main>

  );
}

