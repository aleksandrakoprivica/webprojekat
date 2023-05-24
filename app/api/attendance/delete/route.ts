import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, eventId } = await req.json();

  try {
    const attendance = await prisma.attendance.findFirst({
      where: {
        AND: [{ userId: userId }, { eventId: eventId }],
      },
    });

    if (!attendance) {
      return NextResponse.json({ error: "No attendance" }, { status: 400 });
    }
    const deletedAttendance = await prisma.attendance.delete({
      where: {
        id: attendance?.id,
      },
    });
    return NextResponse.json(deletedAttendance);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to delete an event" },
      { status: 500 }
    );
  }
}
