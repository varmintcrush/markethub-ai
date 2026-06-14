"use client";

import { api } from "../lib/api";
import { useCartStore } from "../store/cartStore";
import ProtectedRoute from "../components/ProtectedRoute";
import toast from "react-hot-toast";

export default function CartPage() {

  const {
    items,
    removeFromCart,
    clearCart
  } = useCartStore();

  const total =
    items.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.quantity,
      0
    );

  async function checkout() {

    try {

      const payload =
        items.map((item) => ({
          productId: item.id,
          quantity: item.quantity
        }));

      await api.post(
        "/orders",
        {
          items: payload
        }
      );

      clearCart();

     toast.success(
  "Order created successfully"
);

    } catch (error) {

      console.error(error);

     toast.error(
  "Checkout failed"
);
    }
  }

return (
  <ProtectedRoute>

    <div className="p-8">

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Shopping Cart
      </h1>

      {items.length === 0 ? (

        <p>
          Cart is empty
        </p>

      ) : (

        <>
          {items.map((item) => (

            <div
              key={item.id}
              className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-4
              mb-4
              "
            >
              <h2 className="font-bold">
                {item.title}
              </h2>

              <p>
                ${item.price}
              </p>

              <button
                onClick={() =>
                  removeFromCart(item.id)
                }
                className="
                mt-3
                text-red-400
                "
              >
                Remove
              </button>

            </div>

          ))}

          <div className="mt-6">

            <h2 className="text-3xl font-bold text-emerald-400">
              Total: ${total}
            </h2>

            <button
              onClick={checkout}
              className="
              mt-4
              px-6
              py-3
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              "
            >
              Checkout
            </button>

          </div>

        </>

      )}

    </div>

  </ProtectedRoute>
); }
