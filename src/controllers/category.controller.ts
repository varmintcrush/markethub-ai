import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function createCategory(
  req: Request,
  res: Response
) {
  try {
    const { name } = req.body;

    const category =
      await prisma.category.create({
        data: {
          name,
        },
      });

    return res.status(201).json(category);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create category",
    });
  }
}

export async function getCategories(
  req: Request,
  res: Response
) {
  const categories =
    await prisma.category.findMany();

  return res.json(categories);
}

export async function deleteCategory(
  req: any,
  res: any
) {
  try {

    await prisma.category.delete({
      where: {
        id: req.params.id
      }
    });

    return res.json({
      message:
        "Category deleted"
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        "Delete failed"
    });

  }
}