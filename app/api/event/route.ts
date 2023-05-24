import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const events = await prisma.event.findMany({
    include: {
      creator: true,
      attendees: {
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      },
    },
  });

  if (events) {
    return NextResponse.json(events);
  } else {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
}

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const event = await prisma.event.create({
      data,
    });
    return NextResponse.json(event);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create an event" },
      { status: 500 }
    );
  }
}
