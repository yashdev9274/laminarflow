import { ReactNode, createContext, useState } from "react";
import { useToast } from "../ui/use-toast";

type StreamResponse = {
   addMessage: ()=> void,
   message: string,
   handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>)=> void,
   isLoading: boolean,
}

export const ChatContext = createContext<StreamResponse>({
   addMessage: ()=>{},
   message: '',
   handleInputChange: ()=>{},
   isLoading: false,
})

interface Props{
   fileId: string
   children: ReactNode
}

export const ChatContextProvider = ({fileId, children}: Props)=>{
   const [message, setMesasge] = useState<string>('')

   const {toast} = useToast()
}