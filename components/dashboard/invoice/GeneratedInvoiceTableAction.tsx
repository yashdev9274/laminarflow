import { Download, FolderOpen, MoreHorizontal, Trash2Icon } from "lucide-react";
import { DropdownMenu,DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GeneratedInvoiceTableAction({ id }: { id: string }) {
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
                      <Link href={`/dashboard/agents/invoice-data/${id}`}> {/* Assuming a detail page for generated invoices */}
                        <FolderOpen  /> Open
                      </Link>
                    </DropdownMenuItem>
                    {/* Add delete functionality if needed */}
                    <DropdownMenuItem asChild>
                        <Link href={`/api/agents/invoice/downloadGeneratedInvoice/${id}`}>  
                            <Download/> Download PDF
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 