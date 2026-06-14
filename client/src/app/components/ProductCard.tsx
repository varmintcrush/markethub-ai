"use client";

import {
  useCartStore
} from "../store/cartStore";

export default function ProductCard({
  product
}: any) {

  const addToCart =
    useCartStore(
      (state) => state.addToCart
    );

  return (
    <div className="border p-4 rounded">

      <h2 className="font-bold">
        {product.title}
      </h2>

      <p>
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
        className="bg-black text-white px-4 py-2 mt-2"
      >
        Add To Cart
      </button>

    </div>
  );
}