import { cn } from "@/lib/utils";

interface TimelineItemProps {
   title: string;
   date: string;
   variant: 'gray' | 'green'  
}

export function TimelineItem({title, date, variant}:TimelineItemProps){
   return(
      <div className="flex items-start">
         <div className="mr-3 relative">
            <div
               className={cn("w-2 h-2 rounded-full mt-2",
                  variant === "gray" ? "bg-gray-300" : "bg-green-500"
               )}
            />
            {/* Vertical line connecting timeline items */}
            <div className="absolute top-3 left-1 w-[1px] h-10 bg-gray-200 -translate-x-1/2" />
         </div>
         <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{date}</p>
         </div>
      </div>
   )
}