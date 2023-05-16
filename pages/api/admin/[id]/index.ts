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
  } else if (req.method === "DELETE") {
    try {
      const eventId = parseInt(req.query.id as string);
      const eventExists = await prisma.event.count({
        where: {
          id: eventId,
        },
      });
      if (eventExists === 0) {
        res.status(400).send({ message: "Event with the id is not found" });
      }

      const deletedEvent = await prisma.event.delete({
        where: {
          id: eventId,
        },
      });
      res.status(200).send({ message: "deleted" });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "error" });
    }
  } else if (req.method === "PUT") {
    try {
      const eventId = parseInt(req.query.id as string);
      const eventExists = await prisma.event.count({
        where: {
          id: eventId,
        },
      });
      if (eventExists === 0) {
        res.status(400).send({ message: "Event with the id is not found" });
      }

      const event = await prisma.event.findFirst({
        where: {
          id: eventId,
        },
      });

      if (event && event.authorEmail !== req.body.authorEmail) {
        res.status(403).send({ message: "You can edit only your events" });
      }

      console.log(req.body);

      const updatedEvent = await prisma.event.update({
        where: {
          id: eventId,
        },
        data: req.body,
      });

      res.status(200).json({ message: "Updated" });
    } catch (e) {
      console.log(e);
    }
  }
}
