import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const events = await prisma.event.findMany();
      res.status(200).json(events);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "error" });
    }
  } else if (req.method === "POST") {
    const eventId = req.body.eventId;
    const userEmail = req.body.userEmail;

    try {
      const updatedEvent = await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: {
          events: {
            connect: {
              id: eventId,
            },
          },
        },
      });
      res.status(200).json(updatedEvent);
    } catch (e) {
      console.error(e);
      res.status(500).send({ message: "error" });
    }
  }
}
