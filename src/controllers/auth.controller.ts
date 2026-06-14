import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "../lib/prisma";

export async function register(
  req: Request,
  res: Response
) {
  try {
    const {
      fullName,
      email,
      password,
      role
    } = req.body;

    const existingUser =
      await prisma.user.findUnique({
        where: { email }
      });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          fullName,
          email,
          password: hashedPassword,
          role
        }
      });

    return res.status(201).json({
      message: "User created",
      user
    });

  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function login(
  req: Request,
  res: Response
) {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await prisma.user.findUnique({
        where: { email }
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isValid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isValid) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token =
      jwt.sign(
        {
          userId: user.id,
          role: user.role
        },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d"
        }
      );

    return res.json({
      token,
      user
    });

  } catch (error) {
    return res.status(500).json(error);
  }
}