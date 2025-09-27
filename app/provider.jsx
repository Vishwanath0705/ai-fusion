"use client"
import React, { useEffect } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'
import { useUser } from '@clerk/clerk-react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/config/FirestoreConfig'

function provider({
    children,
    ...props
}) {
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            CreateNewUser();
        }
    })
    const CreateNewUser = async () => {
        const userRef = doc(db, "users", user?.primaryEmailAddress?.emailAddress);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            console.log("Existing user..");
            return;
        } else {
            const userData = {
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                createdAt: new Date(),
                remainingMsg: 5,
                credits: 1000,
                plan: "Free"
            }
            await setDoc(userRef, userData);
            console.log("New user data Saved");
        }


    }
    return (
        <NextThemesProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            {...props}>
            <SidebarProvider>
                <AppSidebar />


                <div className='w-full'>
                    <AppHeader />
                    {children}
                </div>
            </SidebarProvider>
        </NextThemesProvider>
    )
}

export default provider