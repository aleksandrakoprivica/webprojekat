import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const email = req.url?.split("/")[5];
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        attendances: true,
      },
    });
    if (user) {
      const { password, ...rest } = user;

      return NextResponse.json(rest);
    } else {
      return NextResponse.json({ error: "User doesn't exists" }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 400 });
  }
}
