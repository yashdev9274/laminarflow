import { createContext } from "react";

type StreamResponse = {
   addMessage: ()=> void,
   message: string,
   handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>)=> void,
   isLoading: boolean,
}

export const ChatContext = createContext({
   addMessage: ()=>{},
   message: [],
   handleInputChange: ()=>{},
   isLoading: false,
})

export const ChatContextProvider = ({})