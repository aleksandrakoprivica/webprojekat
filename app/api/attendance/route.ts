import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, eventId } = await req.json();
  try {
    const alreadyAttending = await prisma.attendance.findFirst({
      where: {
        AND: [{ userId: userId }, { eventId: eventId }],
      },
    });

    if (alreadyAttending) {
      return NextResponse.json({ error: "Already attending" }, { status: 400 });
    }

    const attendance = await prisma.attendance.create({
      data: {
        user: { connect: { id: userId } },
        event: { connect: { id: eventId } },
      },
    });
    return NextResponse.json(attendance);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create an event" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { userId, eventId } = await req.json();
  try {
    const attendance = await prisma.attendance.create({
      data: {
        user: { connect: { id: userId } },
        event: { connect: { id: eventId } },
      },
    });
    return NextResponse.json(attendance);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create an event" },
      { status: 500 }
    );
  }
}
