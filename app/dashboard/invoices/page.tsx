import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateInvoiceSheet } from "@/components/createInvoiceSheetButton";


export default function InvoicePage(){
    return(
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
            </Card>
    )
}