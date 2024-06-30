'use client';
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import EmojiPicker from 'emoji-picker-react';
import { Input } from '@/components/ui/input';
import { Budgets } from '@/app/utils/schema';
import { db } from '@/app/utils/db';
import { useUser } from '@clerk/nextjs';
import { toast } from '@/components/ui/use-toast';
import { DialogClose } from '@radix-ui/react-dialog';

type Props = {
  refreshData:any,
}

export default function CreateBudget({}: Props) {
  
  const [emojiIcon, setEmojiIcon] = useState('😊');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState<string>();
  const [amount, setAmount] = useState<number|any>();
  const {user}=useUser();
  const onCreateBudget=async()=>{
    const result=await db.insert(Budgets)
    .values({
      name:name,
      amount:amount,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      icon:emojiIcon,
    }).returning({insertedId:Budgets.id})
    if(result){
      toast({
        title:"Budget created!"
      })
    location.reload();

    }
    
  }
  return(
    <div>
      <Dialog>
  <DialogTrigger className='w-full'>
    <div className='border-2 bg-gray-400 border-dashed rounded-lg p-10 items-center 
      flex flex-col cursor-pointer hover:shadow-2xl shadow-white'>
        <h2 className='text-3xl'>+</h2>
        <h2>Create Budget</h2>
      </div>
      </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        <div className='mt-5'>
          <Button variant="outline" className=' border-black text-2xl'
          onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}
          >{emojiIcon}</Button>
          
        </div>
        <div className='absolute z-20'>
            <EmojiPicker  open={openEmojiPicker}
            onEmojiClick={(e)=>{setEmojiIcon(e.emoji); setOpenEmojiPicker(false)}}
            />
          </div>
        <div className='mt-2'>
          <h2 className='text-2xl text-black font-semibold my-1'>Create Budget</h2>
          <Input placeholder='eg. Electricity bill' className='border-black'
          onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className='mt-2'>
          <h2 className='text-2xl text-black font-semibold my-1 '>Amount</h2>
          <Input placeholder='eg. $500' type='number' className='border-black'
          onChange={(e)=>setAmount(e.target.value)}
          />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
           <Button disabled={!name || !amount} className='w-full mt-5' 
        onClick={()=>onCreateBudget()}
        >Create Budget</Button> 
          </DialogClose>
        </DialogFooter>
        

      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

      
    </div>
  )
}