import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function createStore(
  req: any,
  res: Response
) {
  try {

    const {
      name,
      description
    } = req.body;

    const store =
      await prisma.store.create({
        data: {
          name,
          description,
          ownerId: req.user.userId
        }
      });

    return res.status(201).json(store);

  } catch (error) {
  console.error(error);
  console.log(req.user);

  return res.status(500).json(error);
}
}

export async function getStores(
  req: Request,
  res: Response
) {

  const stores =
    await prisma.store.findMany({
      include: {
        owner: true
      }
    });

  return res.json(stores);
}

