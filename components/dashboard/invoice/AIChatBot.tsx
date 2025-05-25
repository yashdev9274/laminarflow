"use client"

import type React from "react"

import { useState } from "react"
import { Send, X, Maximize2, Minimize2, Sparkles, Mail, Calendar, FileText, Users, Search, ReceiptIndianRupee,Building2, BadgeIndianRupee, AlignEndHorizontal } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
// import LF-logo from "/LF-logo.png";
import { Textarea } from "@/components/ui/textarea"

interface AIChatbotProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

export function AIChatbot({ isOpen, onOpenChange, children }: AIChatbotProps) {
  const [input, setInput] = useState("")
  const [isMaximized, setIsMaximized] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string; timestamp: Date }>>([])
  const [isTyping, setIsTyping] = useState(false)

  const quickActions = [
    { icon: ReceiptIndianRupee, label: "Show unpaid Invoices", color: "bg-blue-500" },
    { icon: BadgeIndianRupee, label: "Show recent transaction", color: "bg-green-500" },
    { icon: Building2, label: "Show new clients", color: "bg-orange-500" },
    { icon: Users, label: "Emails from team", color: "bg-purple-500" },
    { icon: AlignEndHorizontal, label: "Financial Analysis", color: "bg-red-500" },
  ]

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input, timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        role: "assistant" as const,
        content: `I'll help you with "${input}". Here's what I found in your emails...`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickAction = (action: string) => {
    setInput(action)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent
        className={`bg-gray-950 border border-gray-800 text-white p-0 gap-0 transition-all duration-300 ${
          isMaximized ? "max-w-4xl w-full h-[80vh]" : "max-w-lg w-full h-[600px]"
        }`}
      >
        {/* Custom Header with Controls */}
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-800 bg-gray-900/50  space-y-0">
          {/* <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src="/LF-logo.png"
                alt="lF-logo"
                width={50}
                height={50}
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-950"></div>
            </div>
            <div>
              <DialogTitle className="font-semibold text-sm text-white">LF Ai Assistant</DialogTitle>
              <DialogDescription className="text-xs text-gray-400 m-0">
                Create Invoice with LF-Agent
              </DialogDescription>
            </div>
          </div> */}
          <div className="flex items-center gap-1 mr-7">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-gray-800 h-8 w-8"
              onClick={() => setIsMaximized(!isMaximized)}
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            {/* <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-gray-800 h-8 w-8"
              onClick={() => onOpenChange?.(false)}
            >
              <X className="w-4 h-4" />
            </Button> */}
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
              <div className="text-center space-y-3">
                <Image
                  src="/LF-logo.png"
                  alt="lF-logo"
                  width={50}
                  height={50}
                  className="items-center justify-center mx-auto"
                />
                <div>
                  <h2 className="text-xl font-bold text-white bg-clip-text text-transparent">
                    LF Ai Agent
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Generate Invoices with LF-Ai Agent.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent flex-1"></div>
                  <span className="text-xs text-gray-500 px-2">Quick Actions</span>
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent flex-1"></div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 text-left justify-start h-auto p-3 group transition-all duration-200"
                      onClick={() => handleQuickAction(action.label)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div
                          className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <action.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">{action.label}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-300">Pro Tip</span>
                </div>
                <p className="text-xs text-gray-400">
                  Use LF prompts for better user experience.
                </p>
              </div>
            </div>
          ) : (
            /* Chat Messages */
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-start gap-2 max-w-[85%]">
                    {message.role === "assistant" && (
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className="space-y-1">
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                            : "bg-gray-800 text-gray-100 border border-gray-700"
                        }`}
                      >
                        {message.content}
                      </div>
                      <p className="text-xs text-gray-500 px-2">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-800 bg-gray-900/30 backdrop-blur-sm">
            <div className="flex items-center gap-2 bg-gray-800 rounded-xl p-2 border border-gray-700 focus-within:border-blue-500 transition-colors">
                <Textarea
                  placeholder="Paste your invoice text here..."
                  className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
              />
              <Button
                size="icon"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white h-8 w-8 rounded-lg transition-all duration-200"
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            {messages.length === 0 && (
              <p className="text-xs text-gray-500 mt-2 text-center">Press Enter to send • AI responses are simulated</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
