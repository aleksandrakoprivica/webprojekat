import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const eventId = parseInt(req.url?.split("/")[5]);
  const data: any = await req.json();
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });
  if (!event) {
    return NextResponse.json(
      { error: "Event doesn't exists" },
      { status: 400 }
    );
  }

  try {
    const updatedEvent = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: data,
    });
    return NextResponse.json(updatedEvent);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to update an event" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const eventId = parseInt(req.url?.split("/")[5]);

  try {
    const deletedEvent = await prisma.event.delete({
      where: {
        id: eventId,
      },
    });
    return NextResponse.json(deletedEvent);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to delete an event" },
      { status: 500 }
    );
  }
}
