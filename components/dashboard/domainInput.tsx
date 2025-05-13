import { useId } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DomainInput() {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Input with start add-on</Label>
      <div className="flex rounded-md shadow-xs">
        <span className="border-input bg-background text-muted-foreground -z-10 inline-flex items-center rounded-s-md border px-3 text-sm border-zinc-700 border-spacing-3 font-semibold ">
          https://
        </span>
        <Input
          id={id}
          className="-ms-px rounded-s-none shadow-none border-zinc-700 border-spacing-3 text-2xl font-semibold w-full"
          placeholder="google.com"
          type="text"
        />
      </div>
    </div>
  )
}
