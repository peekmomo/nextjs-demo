"use client"
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-provider";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
export default function Navbar() {
    const { isAuthenticated, isLoading } = useConvexAuth();
    return (
        <nav className="h-16 w-full  border-b border-gray-200 flex items-center mb-4 px-4">
            <Link href="/">
                <h1 className="text-xl font-bold">Next
                    <span className="text-blue-500">Logo</span></h1>
            </Link>
            <div className="flex items-center gap-3 ml-8">
                <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
                <Link href="/Blog" className="text-gray-600 hover:text-gray-800">Blog</Link>
                <Link href="/create" className="text-gray-600 hover:text-gray-800">Create</Link>
            </div>
            <div className="flex items-center gap-3 ml-auto">
                {/* 1. 处理身份验证的逻辑块 */}
                {isLoading ? null : isAuthenticated ? (
                    <Button variant="outline" onClick={() => { authClient.signOut({
                        fetchOptions: {
                            onSuccess: () => {
                                // 退出成功后的回调，例如重定向到登录页
                                toast.success("Logged out successfully!");
                            },
                            onError: (error) => {
                                // 处理退出失败的情况，例如显示错误消息
                                toast.error("Failed to log out: " + error.error.message);
                            }
                        }
                    });}}>
                        Logout
                    </Button>
                ) :(
                    <>
                        <Link href="/auth/login-in" className={buttonVariants()}>Login</Link>
                        <Link href="/auth/sign-up" className={buttonVariants()}>Sign up</Link>
                    </>
                )}

                {/* 2. 主题切换按钮：无论是否登录都显示，并且放在最右侧 */}
                <ThemeToggle />
            </div>
            {/* <div className="flex items-center gap-3 ml-auto">
                <Link href="/login" className={buttonVariants()}>Login</Link>
                <Link href="/auth/sign-up " className={buttonVariants()}>sign up</Link>
                <ThemeToggle />
            </div> */}
        </nav>
    )
}