
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-provider";
export default function Navbar(){
    return (
        <nav className="h-16 w-full bg-white border-b border-gray-200 flex items-center mb-4 px-4">
            <Link href="/">
                <h1 className="text-xl font-bold">Next 
                    <span className="text-blue-500">Logo</span></h1>
            </Link>
            <div className="flex item-center gap-3 ml-8">
                <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
                <Link href="/" className="text-gray-600 hover:text-gray-800">Blog</Link>
                <Link href="/" className="text-gray-600 hover:text-gray-800">Create</Link>
            </div>
            <div className="flex items-center gap-3 ml-auto">
                <Link href="/login" className={buttonVariants()}>Login</Link>
                <Link href="/register" className={buttonVariants({ variant: "outline" })}>sign up</Link>
                <ThemeToggle />
            </div>
        </nav>
    )
}