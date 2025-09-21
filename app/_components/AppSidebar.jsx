"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export function AppSidebar() {
    const { theme, setTheme } = useTheme();
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="p-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 ">
                            <Image src={'/logo.svg'} alt="logo" width={60} height={60} className="w-[40px] h-[40px]"></Image>
                            <h2 className="font-bold text-xl">AI Fusion</h2>
                        </div>
                        <div>
                            {theme == "light" ? <Button variant={"ghost"} onClick={() => setTheme("dark")}><Moon /></Button>
                                : <Button variant={"ghost"} onClick={() => setTheme("light")}><Sun /></Button>
                            }
                        </div>
                    </div>
                    <Button className={"mt-7 w-full"} size="lg">+ New Chat</Button>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup >
                    <div className="p-3">
                        <h2 className="font-bold text-lg">Chat</h2>
                        <p className="text-sm text-gray-400">Sign in to start using multiple ai models</p>
                    </div>
                </SidebarGroup >
            </SidebarContent>
            <SidebarFooter>
                <div className="p-3 mb-12">
                    <Button className={"w-full"}>Sign In / Sign Up</Button>
                </div>
            </SidebarFooter>
        </Sidebar >
    )
}