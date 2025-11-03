
import { prisma } from "@/app/utils/db";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";


export const appRouter = router({
    getUserFinancialData: privateProcedure
    .input(z.object({key: z.string()}))
    .query(async ({ ctx, input }) => {
        const { userId } = ctx;

        const userFinancialData = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                transactions: true,
                invoices: true,
                companies: true,
                polarAccounts: true,

            }
        });

        if (!userFinancialData) {
            throw new TRPCError({ code: "NOT_FOUND" });
        }

        return userFinancialData;
    })
});


export type AppRouter = typeof appRouter;