import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const newEvent = await prisma.event.create({ data: req.body });
      res.status(200).json(newEvent);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "error" });
    }
  } else if (req.method === "GET") {
    try {
      const events = await prisma.event.findMany();
      res.status(200).json(events);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "error" });
    }
  }
}
