import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateInvoiceSheet } from "@/components/dashboard/invoice/createInvoiceSheetButton";
import { InvoiceTable } from "@/components/dashboard/invoice/InvoiceTable";
import InvoiceInfo from "@/components/dashboard/invoice/invoiceInfo";
import { ReceiptIndianRupee } from "lucide-react";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireAuth";
import { DashboardEmptyState } from "@/components/dashboard/emptyStates/dashboardEmptystate";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardBlocks } from "@/components/dashboard/analytics/dashboardBlocks";
import { Separator } from "@/components/ui/separator";
import ExportButton from "@/app/components/exportButton";



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

export default async function InvoicePage(){

    const session = await requireUser() 
    const data = await getData(session.user?.id as string)

    return(
        <div className="flex flex-col gap-4 p-4 pt-0">
            {/* <div className="flex justify-end">
                <ExportButton />
            </div> */}
            <Card>
                <CardHeader className="mb-2">
                    <div className="flex items-center justify-between ml-2">
                        <div>
                            <CardTitle className="text-lg font-semibold"> 
                                <div className="flex items-center gap-4">
                                    <ReceiptIndianRupee/>
                                    Invoices
                                    <InvoiceInfo/>
                                </div>
                            </CardTitle>
                            <CardDescription className="text-sm">
                                You can track your invoices here
                            </CardDescription>
                        </div>
                        <CreateInvoiceSheet/>
                    </div>
                </CardHeader>
                <Separator/>
                {/* Remove commented fragment start */}
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
                            <Separator/>
                            <CardContent>
                                <InvoiceTable/>
                            </CardContent>
                        </Suspense> // Close Suspense here
                    )}
                {/* Remove commented fragment end */}
                
            </Card>
            
        </div>
    )
}