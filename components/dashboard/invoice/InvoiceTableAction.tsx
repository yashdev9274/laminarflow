import { Download, FolderOpen, MoreHorizontal, PenBoxIcon, Trash2Icon } from "lucide-react";
import { DropdownMenu,DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem } from "../../ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function InvoiceTableAction({ status, id }: { status: string; id: string }) {
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="w-7 h-5">
                    <MoreHorizontal className="size-3"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuGroup>
                    <DropdownMenuItem><FolderOpen/> Open</DropdownMenuItem>
                    <DropdownMenuItem><PenBoxIcon/> Edit</DropdownMenuItem>
                    <DropdownMenuItem><Trash2Icon/> Delete</DropdownMenuItem>
                    <DropdownMenuItem><Download/> Download</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    ) 
}