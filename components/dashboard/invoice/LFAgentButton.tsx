import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";
import { AIChatbot } from "./AIChatBot";
// import AIChatBot from "./LFAIChatBot";

export default function LFAgentButton() {
   return(
      <AIChatbot>
         <Button variant="outline" className="hover:bg-neutral-900 font-bold py-2 px-4 rounded h-9">
         <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm">
               LF Agent
            </span>
         </Button>
      </AIChatbot>
   )
}