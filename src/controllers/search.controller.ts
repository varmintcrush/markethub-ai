import axios from "axios";
import { Request, Response } from "express";

export async function semanticSearch(
  req: Request,
  res: Response
) {
  try {

    const { query } = req.body;

    const response =
      await axios.post(
        "http://127.0.0.1:8000/search",
        {
          query
        }
      );

    return res.json(
      response.data
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: "Search failed"
    });
  }
}