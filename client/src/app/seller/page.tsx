"use client";

import { useEffect, useState } from "react";
import { api } from "../lib/api";
import SellerRoute from "../components/SellerRoute";

export default function SellerPage() {
  const [products, setProducts] =
    useState<any[]>([]);

  const [categories, setCategories] =
    useState<any[]>([]);

  const [categoryId, setCategoryId] =
    useState("");

  const [editingId, setEditingId] =
  useState("");

const [editTitle, setEditTitle] =
  useState("");

const [editDescription, setEditDescription] =
  useState("");

const [editPrice, setEditPrice] =
  useState("");

const [editStock, setEditStock] =
  useState("");
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
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

  async function loadCategories() {
    try {
      const res =
        await api.get("/categories");

      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  }
 async function deleteProduct(
  id: string
) {
  try {

    await api.delete(
      `/products/${id}`
    );

    loadProducts();

    alert(
      "Product deleted"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Delete failed"
    );

  }
  }
  async function updateProduct(
  id: string
) {
  try {

    await api.put(
      `/products/${id}`,
      {
        title: editTitle,
        description:
          editDescription,
        price:
          Number(editPrice),
        stock:
          Number(editStock)
      }
    );

    setEditingId("");

    await loadProducts();

    alert(
      "Product updated"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Update failed"
    );

  }
}
  async function createProduct() {
    try {
      setLoading(true);

      let imageUrl = "";

      if (image) {
        const formData =
          new FormData();

        formData.append(
          "image",
          image
        );
    



        const uploadRes =
          await api.post(
            "/products/upload",
            formData
          );console.log(uploadRes.data);

        imageUrl =
          uploadRes.data.imageUrl;
      }

      await api.post(
        "/products",
        {
          title,
          description,
          price: Number(price),
          stock: Number(stock),

          imageUrl,

          categoryId,

          storeId:
            "de6450c2-2c37-46b7-a213-5454485ed6f9",
        }
      );

      setTitle("");
      setDescription("");
      setPrice("");
      setStock("");
      setImage(null);
      setCategoryId("");

      await loadProducts();

      alert(
        "Product created successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  }

 

  return (
    <SellerRoute>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-cyan-400 mb-8">
          Seller Dashboard
        </h1>

        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-6
          mb-10
          "
        >
          <h2 className="text-2xl font-bold mb-5">
            Create Product
          </h2>

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Product Title"
            className="
            w-full
            bg-slate-950
            border
            border-slate-700
            p-3
            rounded-xl
            mb-3
            "
          />

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Description"
            className="
            w-full
            bg-slate-950
            border
            border-slate-700
            p-3
            rounded-xl
            mb-3
            "
          />

          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            placeholder="Price"
            className="
            w-full
            bg-slate-950
            border
            border-slate-700
            p-3
            rounded-xl
            mb-3
            "
          />

          <input
            type="number"
            value={stock}
            onChange={(e) =>
              setStock(e.target.value)
            }
            placeholder="Stock"
            className="
            w-full
            bg-slate-950
            border
            border-slate-700
            p-3
            rounded-xl
            mb-3
            "
          />

          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(
                e.target.value
              )
            }
            className="
            w-full
            bg-slate-950
            border
            border-slate-700
            p-3
            rounded-xl
            mb-3
            "
          >
            <option value="">
              Select Category
            </option>

            {categories.map(
              (category: any) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              )
            )}
          </select>

          <input
            type="file"
            onChange={(e) =>
              setImage(
                e.target.files?.[0] ||
                  null
              )
            }
            className="
            w-full
            bg-slate-950
            border
            border-slate-700
            p-3
            rounded-xl
            mb-5
            "
          />

          <button
            onClick={createProduct}
            disabled={
              loading ||
              !categoryId
            }
            className="
            px-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            hover:scale-105
            transition
            disabled:opacity-50
            "
          >
            {loading
              ? "Creating..."
              : "Create Product"}
          </button>
          
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {products.map(
            (product: any) => (
              <div
                key={product.id}
                className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                overflow-hidden
                "
              >
                {product.imageUrl && (
                  <img
                    src={
                      product.imageUrl
                    }
                    alt={
                      product.title
                    }
                    className="
                    w-full
                    h-56
                    object-cover
                    "
                  />
                )}

                <div className="p-5">
                  <h3 className="font-bold text-lg">
                    {product.title}
                  </h3>

                  <p className="text-slate-400 mt-2">
                    {
                      product.description
                    }
                  </p>

                  <p className="text-emerald-400 text-xl font-bold mt-3">
                    $
                    {product.price}
                  </p>

                  <p className="text-slate-500 mt-2">
                    Stock:{" "}
                    {product.stock}
                  </p>


<button
  onClick={() => {

    setEditingId(
      product.id
    );

    setEditTitle(
      product.title
    );

    setEditDescription(
      product.description
    );

    setEditPrice(
      String(
        product.price
      )
    );

    setEditStock(
      String(
        product.stock
      )
    );

  }}
  className="
  mt-3
  w-full
  py-2
  rounded-xl
  bg-amber-600
  "
>
  Edit
</button>
<button
  onClick={() =>
    deleteProduct(
      product.id
    )
  }
  className="
  mt-3
  px-4
  py-2
  rounded-xl
  bg-red-600
  "
>
  Delete
</button>

{editingId ===
  product.id && (

  <div className="mt-4">

    <input
      value={editTitle}
      onChange={(e) =>
        setEditTitle(
          e.target.value
        )
      }
      placeholder="Title"
      className="
      w-full
      p-2
      mb-2
      bg-slate-950
      border
      border-slate-700
      rounded-xl
      "
    />

    <textarea
      value={editDescription}
      onChange={(e) =>
        setEditDescription(
          e.target.value
        )
      }
      placeholder="Description"
      className="
      w-full
      p-2
      mb-2
      bg-slate-950
      border
      border-slate-700
      rounded-xl
      "
    />

    <input
      value={editPrice}
      onChange={(e) =>
        setEditPrice(
          e.target.value
        )
      }
      placeholder="Price"
      className="
      w-full
      p-2
      mb-2
      bg-slate-950
      border
      border-slate-700
      rounded-xl
      "
    />

    <input
      value={editStock}
      onChange={(e) =>
        setEditStock(
          e.target.value
        )
      }
      placeholder="Stock"
      className="
      w-full
      p-2
      mb-2
      bg-slate-950
      border
      border-slate-700
      rounded-xl
      "
    />

    <button
      onClick={() =>
        updateProduct(
          product.id
        )
      }
      className="
      w-full
      py-2
      rounded-xl
      bg-green-600
      "
    >
      Save
    </button>

  </div>

)}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </SellerRoute>
  );
}