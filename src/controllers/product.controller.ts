import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import axios from "axios";
import cloudinary from "../lib/cloudinary";


export async function createProduct(
  req: Request,
  res: Response
) {
  try {
    const {
      title,
      description,
      price,
      stock,
      categoryId,
      storeId,
      imageUrl
    } = req.body;



    const product =
      await prisma.product.create({
        data: {
          title,
          description,
          price: Number(price),
          stock: Number(stock),
          imageUrl,
          categoryId,
          storeId
        }
      });

      
    
    // AI Service → ChromaDB indexing
    try {
      await axios.post(
        "http://127.0.0.1:8000/index-product",
        {
          id: product.id,
          title: product.title,
          description: product.description
        }
      );

      console.log(
        `Indexed product: ${product.title}`
      );

    } catch (aiError) {

      console.error(
        "AI Service Error:",
        aiError
      );

    }

    return res.status(201).json(product);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create product"
    });
  }
}

import { redis } from "../lib/redis";

export async function getProducts(
  req: Request,
  res: Response
) {
  const cached =
    await redis.get("products");

  if (cached) {
    console.log("Products from Redis");

    return res.json(
      JSON.parse(cached)
    );
  }

  const products =
    await prisma.product.findMany({
      include: {
        category: true,
        store: true
      }
    });

  await redis.set(
    "products",
    JSON.stringify(products),
    {
      EX: 60
    }
  );

  console.log("Products from PostgreSQL");

  return res.json(products);
}

export async function uploadProductImage(
  req: any,
  res: any
) {
  try {

    const file = req.file;

    if (!file) {

      return res.status(400).json({
        message: "Image required"
      });

    }

    const base64 =
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    const result =
      await cloudinary.uploader.upload(
        base64,
        {
          folder:
            "marketplace-products"
        }
      );

    return res.json({
      imageUrl:
        result.secure_url
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Upload failed"
    });

  }
}


export async function deleteProduct(
  req: any,
  res: any
) {
  try {

    await prisma.product.delete({
      where: {
        id: req.params.id
      }
    });

    return res.json({
      message:
        "Product deleted"
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Delete failed"
    });

  }
}


export async function updateProduct(
  req: any,
  res: any
) {
  try {

    const product =
      await prisma.product.update({
        where: {
          id: req.params.id
        },
        data: req.body
      });

    return res.json(
      product
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Update failed"
    });

  }
}

