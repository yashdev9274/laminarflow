"use server";

import { auth } from "@/app/utils/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUploadedFiles() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  return await prisma.uploadedFile.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
