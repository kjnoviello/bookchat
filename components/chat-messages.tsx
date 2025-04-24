"use client"

import { useEffect, useRef } from "react"
import type { Message } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface ChatMessagesProps {
  messages: Message[]
  loading?: boolean
}

export function ChatMessages({ messages, loading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="space-y-4 py-4">
      {messages.map((message) => (
        <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
          <div
            className={cn(
              "max-w-[80%] rounded-lg px-4 py-3",
              message.role === "user" ? "bg-amber-600 text-white" : "bg-white text-gray-800 border border-gray-200",
              message.role === "system" ? "bg-gray-100 text-gray-800 border border-gray-200 w-full text-center" : "",
            )}
          >
            {message.content}
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-lg px-4 py-3 bg-red text-gray-800 border border-gray-200 flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin text-amber-600" />
            <span>Pensando...</span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
