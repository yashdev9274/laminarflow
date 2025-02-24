import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateInvoiceSheet } from "@/components/createInvoiceSheetButton";
import InvoiceTable from "@/components/InvoiceTable";


export default function InvoicePage(){
    return(
        <div className="flex flex-col gap-4 p-4 pt-0">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-semibold"> 
                                Invoices
                            </CardTitle>
                            <CardDescription className="text-sm">
                                You can manage your invoices here
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