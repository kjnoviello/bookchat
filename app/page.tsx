"use client"

import { useState } from "react"
import { ChatHeader } from "@/components/chat-header"
import { ChatInput } from "@/components/chat-input"
import { ChatMessages } from "@/components/chat-messages"
import type { Message } from "@/lib/types"
import { cn } from "@/lib/utils"

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "system",
      content:
        "Bienvenido a Libro Chat. Soy un asistente virtual especializado en libros de Yenny-El Ateneo. ¿En qué puedo ayudarte hoy?",
    },
  ])
  const [loading, setLoading] = useState(false)

  const addMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    }

    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error("Error al comunicarse con la IA")
      }

      const data = await response.json()

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.text,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error:", error)

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, intenta de nuevo.",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ChatHeader />
      <div
        className={cn(
          "flex-1 overflow-y-auto p-4",
          "bg-[url('/bgopacity.png?height=800&width=800')] bg-fixed bg-center bg-cover bg-no-repeat",
        )}
      >
        <div className="max-w-3xl mx-auto">
          <ChatMessages messages={messages} loading={loading} />
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSend={addMessage} disabled={loading} />
        </div>
      </div>
    </div>
  )
}
