import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireAuth";

export async function GET(request: NextRequest) {
  try {
    const session = await requireUser();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const generatedInvoices = await prisma.generatedInvoice.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(generatedInvoices);
  } catch (error) {
    console.error("Error fetching generated invoices:", error);
    return NextResponse.json(
      { error: "Failed to fetch generated invoices" },
      { status: 500 }
    );
  }
} 