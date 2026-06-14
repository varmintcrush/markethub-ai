"use client";

import { useEffect, useState } from "react";
import { api } from "../lib/api";
import AdminRoute from "../components/AdminRoute";

export default function AdminPage() {

  const [categories, setCategories] =
    useState<any[]>([]);

  const [products, setProducts] =
    useState<any[]>([]);

  const [categoryName, setCategoryName] =
    useState("");

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

  async function createCategory() {

    try {

      await api.post(
        "/categories",
        {
          name: categoryName
        }
      );

      setCategoryName("");

      loadCategories();

    } catch (error) {

      console.error(error);

    }
  }
async function deleteCategory(
  id: string
) {
  try {

    await api.delete(
      `/categories/${id}`
    );

    await loadCategories();

    alert(
      "Category deleted"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Delete failed"
    );

  }
}
  return (
    <AdminRoute>
    <div className="p-8">

      <h1 className="text-4xl font-bold text-red-400 mb-8">
        Admin Panel
      </h1>

      {/* CREATE CATEGORY */}

      <div className="
      bg-slate-900</AdminRoute>
      border
      border-slate-800
      rounded-3xl
      p-6
      mb-10
      ">

        <h2 className="text-2xl font-bold mb-4">
          Create Category
        </h2>

        <div className="flex gap-4">

          <input
            value={categoryName}
            onChange={(e) =>
              setCategoryName(
                e.target.value
              )
            }
            placeholder="Category Name"
            className="
            flex-1
            bg-slate-950
            border
            border-slate-700
            rounded-xl
            p-3
            "
          />

          <button
            onClick={createCategory}
            className="
            px-6
            py-3
            rounded-xl
            bg-gradient-to-r
            from-red-500
            to-pink-600
            "
          >
            Create
          </button>

        </div>

      </div>

     {/* CATEGORIES */}

<div className="mb-10">

  <h2 className="text-2xl font-bold text-red-400 mb-5">
    Categories
  </h2>

  <div className="grid md:grid-cols-4 gap-4">

    {categories.map((category: any) => (

      <div
        key={category.id}
        className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-4
        "
      >

        <p className="font-semibold">
          {category.name}
        </p>

        <button
          onClick={() =>
            deleteCategory(
              category.id
            )
          }
          className="
          w-full
          mt-3
          py-2
          rounded-xl
          bg-red-600
          hover:bg-red-700
          transition
          "
        >
          Delete
        </button>

      </div>

    ))}

  </div>

</div>

      {/* PRODUCTS */}

      <div>

        <h2 className="text-2xl font-bold text-red-400 mb-5">
          Products
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          {products.map((product) => (

            <div
              key={product.id}
              className="
              bg-slate-900
              border
              border-slate-800
              rounded-2xl
              p-5
              "
            >

              <h3 className="font-bold">
                {product.title}
              </h3>

              <p className="text-slate-400 mt-2">
                {product.description}
              </p>

              <p className="text-emerald-400 mt-3">
                ${product.price}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
    </AdminRoute>
  );
}