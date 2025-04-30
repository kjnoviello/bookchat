import { BookOpen } from "lucide-react"
import Link from "next/link"

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-2">
        <BookOpen className="h-6 w-6 text-amber-600" />
        <h1 className="text-xl font-bold text-gray-800">Libro Chat</h1>
      </div>
      <div className="text-sm text-gray-500 hover:hover:text-gray-900">
        <Link href={"https://www.yenny-elateneo.com/"} target="_blank" rel="noopener noreferrer" >
          Asistente de Yenny-El Ateneo
        </Link>
      </div>
    </header>
  )
}
