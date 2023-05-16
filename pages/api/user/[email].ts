import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const email = req.query.email as string;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          events: true,
        },
      });
      res.status(200).json(user);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "error" });
    }
  }
}
