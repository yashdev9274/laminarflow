import InvoiceTableAction from "./InvoiceTableAction";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHeader, TableRow } from "./ui/table";

export default function InvoiceTable() {
    return(
        <div className="flex items-center justify-center">
            <Table>
                <TableHeader>
                    <TableRow>
                        <th>Serial No.</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>$100</TableCell>
                        <TableCell>12/12/2021</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell className="text-right"><InvoiceTableAction/></TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter>
                <TableCaption> A list of all your invoices.</TableCaption>
            </Table>
        </div>
    )
}