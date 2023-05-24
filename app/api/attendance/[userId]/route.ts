import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = parseInt(req.url?.split("/")[5]);
  try {
    const attendance = await prisma.attendance.findMany({
      where: {
        userId: userId,
      },
      include: {
        event: true,
      },
    });

    const events = attendance.map((attendedEvent) => attendedEvent.event);

    return NextResponse.json(events);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create an event" },
      { status: 500 }
    );
  }
}
