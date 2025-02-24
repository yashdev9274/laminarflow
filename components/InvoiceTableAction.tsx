import { Download, MoreHorizontal, PenBoxIcon, Trash2Icon } from "lucide-react";
import { DropdownMenu,DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export default function InvoiceTableAction(){
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary">
                    <MoreHorizontal className="size-3"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuGroup>
                    <DropdownMenuItem><PenBoxIcon/> Edit</DropdownMenuItem>
                    <DropdownMenuItem><Trash2Icon/> Delete</DropdownMenuItem>
                    <DropdownMenuItem><Download/> Download</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    ) 
}