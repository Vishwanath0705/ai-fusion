"use client"
import React, { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'
import { useUser } from '@clerk/clerk-react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/config/FirestoreConfig'
import { AiSelectedModelContext } from "@/context/aiSelectedModelContext";
import { DefaultModel } from './shared/AiModelsShared'
import { UserDetailsContext } from '@/context/UserDetailsContext'

function provider({
    children,
    ...props
}) {
    const { user } = useUser();
    const [aiSelectedModels, setAiSelectedModels] = useState(DefaultModel);
    const [userDetail, setUserDetail] = useState();

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
            const userInfo = userSnap.data();
            setAiSelectedModels(userInfo?.selectedModelPref);
            setUserDetail(userInfo);
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
            setUserDetail(userData);
        }


    }
    return (
        <NextThemesProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            {...props}>
            <UserDetailsContext.Provider value={{ userDetail, setUserDetail }}>
                <AiSelectedModelContext.Provider value={{ aiSelectedModels, setAiSelectedModels }}>
                    <SidebarProvider>
                        <AppSidebar />


                        <div className='w-full'>
                            <AppHeader />
                            {children}
                        </div>
                    </SidebarProvider>
                </AiSelectedModelContext.Provider>
            </UserDetailsContext.Provider>
        </NextThemesProvider>
    )
}

export default provider