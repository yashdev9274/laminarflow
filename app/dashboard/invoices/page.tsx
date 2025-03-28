import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateInvoiceSheet } from "@/components/dashboard/invoice/createInvoiceSheetButton";
import { InvoiceTable } from "@/components/dashboard/invoice/InvoiceTable";


export default function InvoicePage(){
    return(
        <div className="flex flex-col gap-4 p-4 pt-0">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between ml-2">
                        <div>
                            <CardTitle className="text-lg font-semibold"> 
                                Invoices
                            </CardTitle>
                            <CardDescription className="text-sm">
                                You can track your invoices here
                            </CardDescription>
                        </div>
                        <CreateInvoiceSheet/>
                    </div>
                </CardHeader>
                <CardContent>
                    <InvoiceTable/>
                </CardContent>
            </Card>
            {/* <div>
                <Card>
                    <CardContent>
                        <InvoiceTable/>
                    </CardContent>
                </Card>
            </div> */}
        </div>
    )
}