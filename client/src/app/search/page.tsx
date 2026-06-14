
"use client";

import { useState } from "react";
import { api } from "../lib/api";

export default function SearchPage() {
  const [query, setQuery] =
    useState("");

  const [results, setResults] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  async function search() {
    try {
      setLoading(true);

      const res =
        await api.post(
          "/search",
          {
            query
          }
        );

      setResults(
        res.data
      );

    } catch (error) {

      console.error(error);

      alert(
        "Search failed"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">

      <div className="mb-10">

        <h1
          className="
          text-5xl
          font-black
          bg-gradient-to-r
          from-cyan-400
          to-blue-500
          bg-clip-text
          text-transparent
          "
        >
          AI Semantic Search
        </h1>

        <p className="text-slate-400 mt-3">
          Search products using AI recommendations
        </p>

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

        <div className="flex gap-4">

          <input
            value={query}
            onChange={(e) =>
              setQuery(
                e.target.value
              )
            }
            placeholder="Search products..."
            className="
            flex-1
            bg-slate-950
            border
            border-slate-700
            rounded-2xl
            p-4
            outline-none
            focus:border-cyan-500
            "
          />

          <button
            onClick={search}
            disabled={loading}
            className="
            px-8
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            font-semibold
            hover:scale-105
            transition
            disabled:opacity-50
            "
          >
            {
              loading
                ? "Searching..."
                : "Search"
            }
          </button>

        </div>

      </div>

      {results && (

        <div className="mt-8">

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-6
            "
          >

            <h2
              className="
              text-2xl
              font-bold
              text-cyan-400
              mb-4
              "
            >
              AI Recommendations
            </h2>

            <p className="text-slate-400 mb-6">
              {results.message}
            </p>

            <div className="space-y-3">

              {results.recommendations?.map(
                (
                  item: string,
                  index: number
                ) => (

                  <div
                    key={index}
                    className="
                    bg-slate-950
                    border
                    border-slate-800
                    rounded-2xl
                    p-4
                    "
                  >
                    <div className="flex items-center gap-3">

                      <div
                        className="
                        w-8
                        h-8
                        rounded-full
                        bg-cyan-500
                        flex
                        items-center
                        justify-center
                        font-bold
                        "
                      >
                        {index + 1}
                      </div>

                      <p>
                        {item}
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

            {results.top_match && (

              <div
                className="
                mt-6
                p-5
                rounded-2xl
                border
                border-emerald-500/30
                bg-emerald-500/10
                "
              >

                <h3
                  className="
                  text-lg
                  font-bold
                  text-emerald-400
                  "
                >
                  🏆 Best Match
                </h3>

                <p className="mt-3">
                  {results.top_match}
                </p>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}
