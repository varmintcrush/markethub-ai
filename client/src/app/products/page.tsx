"use client";

import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useCartStore } from "../store/cartStore";

export default function ProductsPage() {

  const [products, setProducts] = useState<any[]>([]);

 const {
  addToCart,
  items
} = useCartStore();

  useEffect(() => {
    loadProducts();
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

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Products
      </h1>
<p className="text-red-400 mb-4">
  Cart Count: {items.length}
</p>
      <div className="grid md:grid-cols-3 gap-6">

        {products.map((product) => (

          <div
            key={product.id}
            className="
            bg-slate-900
            border
            border-slate-800
            rounded-3xl
            p-5
            hover:border-cyan-500
            transition
            "
          >

            {product.imageUrl && (

              <img
                src={product.imageUrl}
                alt={product.title}
                className="
                w-full
                h-52
                object-cover
                rounded-2xl
                mb-4
                "
              />

            )}

            <h2 className="text-xl font-bold">
              {product.title}
            </h2>

            <p className="text-slate-400 mt-2">
              {product.description}
            </p>

            <p className="text-emerald-400 text-2xl font-bold mt-4">
              ${product.price}
            </p>

            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  quantity: 1
                })
              }
              className="
              w-full
              mt-4
              py-3
              rounded-2xl
              bg-gradient-to-r
              from-emerald-500
              to-green-600
              "
            >
              Add To Cart
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}