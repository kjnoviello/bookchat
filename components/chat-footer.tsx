import Link from 'next/link'
import React from 'react'
import {
    Github,
    Linkedin,
} from "lucide-react"

const ChatFooter = () => {
    return (
        <footer className=" mx-2 my-1 w-full h-[30px] mx-auto p-1 flex flex-row md:items-center">
            <div className="w-full justify-center flex items-center text-sm text-gray-500 sm:text-center gap-2">© 2025
                <Link href="https://kevinjoelnoviello.vercel.app/" className="hover:underline hover:text-gray-900 me-4" target='_blank' rel='noopener noreferrer'>Kevin Joel Noviello</Link>
                <Link href={"https://github.com/kjnoviello"} target="_blank" rel="noreferrer" className="items-center hover:underline ">
                    <Github className="h-4 w-4 text-sm font-medium text-gray-500 hover:text-gray-900" />
                </Link>
                <Link href={"https://www.linkedin.com/in/kevinjoelnoviello/"} target="_blank" rel="noreferrer" className="hover:underline ">
                    <Linkedin className="h-4 w-4 text-sm font-medium text-gray-500 hover:text-gray-900" />
                </Link>
            </div>
        </footer>
    )
}

export default ChatFooter