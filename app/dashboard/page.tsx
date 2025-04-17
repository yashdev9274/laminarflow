import { DashboardBlocks } from "@/components/dashboard/analytics/dashboardBlocks";
import SubmitButton from "../components/submitButton"
import { signOut } from "../utils/auth"
import { prisma } from "../utils/db";
import { requireUser } from "../utils/requireAuth"
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { DashboardEmptyState } from "@/components/dashboard/emptyStates/dashboardEmptystate";
import { InvoiceAnalyticGraph } from "@/components/dashboard/analytics/invoiceAnalyticGraph";
import { RecentInvoices } from "@/components/dashboard/analytics/recentInvoices";


async function getData(userId: string) {
    const data = await prisma.invoice.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
        },
        });

    return data;
}

export default async function Dashboard() {



    const session = await requireUser() 
    const data = await getData(session.user?.id as string)
    return (
        <>
        {data.length < 1 ? (
            <DashboardEmptyState
                title="No invoices found"
                description="Create an invoice to see it right here"
                buttontext="Create Invoice"
                href="/dashboard/invoices/"
            />
        ) : (
            <Suspense fallback={<Skeleton className="w-full h-full flex-1" />}>
            <DashboardBlocks/>
            <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
                <InvoiceAnalyticGraph/>
                <RecentInvoices/>
            </div>
            </Suspense>
        )}
    </>
    )
}