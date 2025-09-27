"use client"
import React, { useContext, useState } from 'react';
import AiModeList from '../shared/AiModeList';
import Image from 'next/image';
import { Switch } from "@/components/ui/switch";
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '@/config/FirestoreConfig';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from '@radix-ui/react-select';
import { AiSelectedModelContext } from '@/context/aiSelectedModelContext';
import { useUser } from '@clerk/clerk-react';

function AiMultiModels() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [aiModelList, setAiModelList] = useState(AiModeList);
    const { aiSelectedModels, setAiSelectedModels } = useContext(AiSelectedModelContext);

    const onToggleChange = (model, value) => {
        setAiModelList(prev =>
            prev.map(m => (m.model === model ? { ...m, enable: value } : m))
        );
    };

    const onSelectValue = async (parentModel, value) => {
        if (!isLoaded || !isSignedIn || !user) return;

        const updatedModels = {
            ...aiSelectedModels,
            [parentModel]: { modelId: value }
        };

        setAiSelectedModels(updatedModels);

        const docRef = doc(db, "users", user?.primaryEmailAddress?.emailAddress);

        await updateDoc(docRef, {
            SelectedModelPref: aiSelectedModels
        })
    };


    if (!isLoaded || !isSignedIn || !user) return null;

    return (
        <div className='flex flex-1 h-[75vh] border-b'>
            {aiModelList.map((model, index) => (
                <div
                    key={index}
                    className={`flex flex-col border-r h-full overflow-auto transition-all p-4 ${model.enable ? 'flex-1 min-w-[400px]' : 'w-[100px] flex-none'
                        }`}
                >
                    <div className='flex w-full h-[70px] items-center justify-between border-b'>
                        <div className='flex items-center gap-4'>
                            <Image src={model.icon} alt={model.model} width={24} height={24} />
                            {model.enable && (
                                <Select
                                    value={aiSelectedModels?.[model.model]?.modelId || model.subModel.find(sm => !sm.premium)?.name || model.subModel[0]?.name}
                                    onValueChange={(value) => onSelectValue(model.model, value)}
                                    disabled={model.premium}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue
                                            placeholder={aiSelectedModels?.[model.model]?.modelId || model.subModel.find(sm => !sm.premium)?.name || model.subModel[0]?.name}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup className='px-3'>
                                            <SelectLabel className='text-sm text-gray-400'>Free</SelectLabel>
                                            {model.subModel
                                                .filter(sm => !sm.premium)
                                                .map((subModel, i) => (
                                                    <SelectItem key={i} value={subModel.name}>
                                                        {subModel.name}
                                                    </SelectItem>
                                                ))}
                                        </SelectGroup>
                                        <SelectGroup className='px-3'>
                                            <SelectLabel className='text-sm text-gray-400'>Premium</SelectLabel>
                                            {model.subModel
                                                .filter(sm => sm.premium)
                                                .map((subModel, i) => (
                                                    <SelectItem key={i} value={subModel.name} disabled>
                                                        {subModel.name} <Lock className='h-4 w-4' />
                                                    </SelectItem>
                                                ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                            )}
                        </div>
                        <div>
                            {model.enable ? (
                                <Switch checked={model.enable} onCheckedChange={(v) => onToggleChange(model.model, v)} />
                            ) : (
                                <MessageSquare onClick={() => onToggleChange(model.model, true)} />
                            )}
                        </div>
                    </div>
                    {model.premium && model.enable && (
                        <div className='flex items-center justify-center h-full'>
                            <Button><Lock />Upgrade to Premium</Button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default AiMultiModels;
