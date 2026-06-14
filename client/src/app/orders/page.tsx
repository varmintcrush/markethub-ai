
"use client";

import { useEffect, useState } from "react";
import { api } from "../lib/api";
import ProtectedRoute from "../components/ProtectedRoute";

export default function OrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {

      const res =
        await api.get("/orders");

      setOrders(res.data);

    } catch (error) {

      console.error(error);

    }
  }

  return (
    <ProtectedRoute>

      <div className="p-8">

        <h1 className="text-4xl font-bold text-cyan-400 mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (

          <div
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            "
          >
            No orders found
          </div>

        ) : (

          <div className="space-y-4">

            {orders.map(
              (order: any) => (

                <div
                  key={order.id}
                  className="
                  bg-slate-900
                  border
                  border-slate-800
                  rounded-2xl
                  p-6
                  "
                >

                  <div className="flex justify-between">

                    <h2 className="font-bold">
                      Order #{order.id}
                    </h2>

                    <span
                      className="
                      px-3
                      py-1
                      rounded-full
                      bg-amber-500/20
                      text-amber-400
                      "
                    >
                      {order.status}
                    </span>

                  </div>

                  <p className="mt-4 text-emerald-400 text-xl font-bold">
                    ${order.total}
                  </p>

                  <p className="text-slate-500 mt-2">
                    {new Date(
                      order.createdAt
                    ).toLocaleString()}
                  </p>

                  <div className="mt-4">

                    {order.items?.map(
                      (item: any) => (

                        <div
                          key={item.id}
                          className="
                          border-t
                          border-slate-800
                          pt-3
                          mt-3
                          "
                        >
                          <p>
                            {
                              item.product
                                ?.title
                            }
                          </p>

                          <p className="text-slate-400">
                            Qty:
                            {" "}
                            {item.quantity}
                          </p>

                        </div>

                      )
                    )}

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </ProtectedRoute>
  );
}
