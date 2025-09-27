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
import { Sun, Moon, Zap } from "lucide-react"
import { useTheme } from "next-themes"
import { SignInButton, useUser } from "@clerk/clerk-react"
import { User2 } from "lucide-react"
import UsageCreditsProgress from "./UsageCreditsProgress"

export function AppSidebar() {
    const { theme, setTheme } = useTheme();
    const { user } = useUser();
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
                    {user ?
                        <Button className={"mt-7 w-full"} size="lg">+ New Chat</Button> :
                        <SignInButton>
                            <Button className={"mt-7 w-full"} size="lg">+ New Chat</Button>
                        </SignInButton>
                    }
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup >
                    <div className="p-3">
                        <h2 className="font-bold text-lg">Chat</h2>
                        {!user && <p className="text-sm text-gray-400">Sign in to start using multiple ai models</p>}
                    </div>
                </SidebarGroup >
            </SidebarContent>
            <SidebarFooter>
                <div className="p-3 mb-12">
                    {!user ? <SignInButton mode='modal'>
                        <Button className={"w-full"}>Sign In / Sign Up</Button>
                    </SignInButton>
                        :
                        <div>
                            <UsageCreditsProgress />
                            <Button className={"w-full mb-3"}><Zap />Upgrade Plan</Button>
                            <Button className="flex w-full" variant={'ghost'}>
                                <User2 /> <h2>Settings</h2>
                            </Button>
                        </div>
                    }
                </div>
            </SidebarFooter>
        </Sidebar >
    )
}