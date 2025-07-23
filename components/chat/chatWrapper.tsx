'use client'

import { trpc } from '@/app/_trpc/client'
import Messages from './messages'
import { Loader2 } from 'lucide-react'
import ChatInput from './chat-input'

interface ChatWrapperProps {
   userId: string
}

const ChatWrapper = ({ userId }: ChatWrapperProps) => {

    return (
      <div className='relative min-h-full bg-zinc-50 flex flex-col justify-between gap-2'>
        <div className='flex-1 flex justify-center items-center flex-col mb-28'>
          <div className='flex flex-col items-center gap-2'>
            {/* <Loader2 className='h-8 w-8 text-blue-500 animate-spin' /> */}
            <h3 className='font-semibold text-xl'>
              Loading...
            </h3>
            <p className='text-zinc-500 text-sm'>
              Preparing your financial data.
            </p>
          </div>
        </div>
        <ChatInput/>
      </div>
    )

  // We don't have a processing/failed state in the same way as Quill's file upload.
  // The query will either be loading, successful, or in an error state,
  // which is handled by react-query's `isError` property (not used here for simplicity yet).

  return (
      <div className='relative min-h-full bg-zinc-50 flex flex-col justify-between gap-2'>
        <div className='flex-1 justify-between flex flex-col mb-28'>
          {/* The Messages component will need to be adapted to work with the financialData */}
          <Messages/>
        </div>
        <ChatInput />
      </div>
  )
}

export default ChatWrapper