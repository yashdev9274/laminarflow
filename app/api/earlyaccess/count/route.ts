import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const count = await prisma.earlyAccess.count();
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching waitlist count" },
      { status: 500 }
    );
  }
}