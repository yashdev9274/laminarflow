import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { PlusIcon } from "lucide-react"

export function CreateInvoiceSheet() {
  return (
    <div className="flex items-center justify-center">
        <Sheet>
            <SheetTrigger asChild>
                <Button className={buttonVariants()}>
                    <PlusIcon/>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>Invoices</SheetTitle>
                <SheetDescription>
                    You can create your invoices here.
                </SheetDescription>
                </SheetHeader>
                <div>
                    Invoice List
                </div>  
                <SheetFooter>
                <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    </div>
  )
}
