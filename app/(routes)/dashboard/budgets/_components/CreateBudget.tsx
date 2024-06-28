'use client';
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import EmojiPicker from 'emoji-picker-react';

type Props = {}

export default function CreateBudget({}: Props) {
  const [emojiIcon, setEmojiIcon] = useState('😊');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  return (
    <div>
      <Dialog>
  <DialogTrigger>
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
          <Button variant="outline" className='text-2xl'
          onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}
          >{emojiIcon}</Button>
          
        </div>
        <div className='absolute'>
            <EmojiPicker  open={openEmojiPicker}
            onEmojiClick={(e)=>{setEmojiIcon(e.emoji); setOpenEmojiPicker(false)}}
            />
          </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

      
    </div>
  )
}