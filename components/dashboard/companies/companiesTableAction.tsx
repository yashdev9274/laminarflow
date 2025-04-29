import { Download, FolderOpen, MoreHorizontal, PenBoxIcon, Trash2Icon, CreditCard   } from "lucide-react";
import { DropdownMenu,DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem } from "../../ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CompaniesTableAction({ status, id }: { status: string; id: string }) {
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="w-7 h-5">
                    <MoreHorizontal className="size-3"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/invoices/${id}`}>
                        <FolderOpen  /> Open
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={`/dashboard/invoices/${id}/edit`}>
                            <PenBoxIcon/> Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem><Trash2Icon/> Delete</DropdownMenuItem>
                    {/* <DropdownMenuItem asChild>
                        <Link href="https://test.checkout.dodopayments.com/buy/pdt_8hDaIWhwG9i2oHdoGWkVE?quantity=1">
                            <CreditCard />
                            Pay with DoDo
                        </Link>
                    </DropdownMenuItem> */}
                    {/* <DropdownMenuItem><Download/> Download</DropdownMenuItem> */}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    ) 
}