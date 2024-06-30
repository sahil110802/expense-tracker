import { Button } from '@/components/ui/button';
import { PenBox } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from 'emoji-picker-react';
import { useUser } from '@clerk/nextjs';
import { Input } from '@/components/ui/input';
import { db } from '@/app/utils/db';
import { Budgets } from '@/app/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from '@/components/ui/use-toast';
type Props = {
  budgetInfo: any;
  refreshData:()=>void;
};






export default function EditBudget({budgetInfo,refreshData}: Props) {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [emojiIcon, setEmojiIcon] = useState<string>(budgetInfo?.icon);
  const [name, setName] = useState<string>(budgetInfo?.name);
  const [amount, setAmount] = useState<number | any>(budgetInfo?.amount);
  const { user } = useUser();

  useEffect(() => {
    setEmojiIcon(budgetInfo?.icon);
    
  }, [budgetInfo])
  

  const onUpdateBudget=async()=>{
    const result=await db.update(Budgets).set({
        name:name,
        amount:amount,
        icon:emojiIcon,
    }).where(eq(Budgets.id,budgetInfo.id))
    .returning();

    if(result){
        refreshData();
        toast({
            title:"Budget Updated!",
        })
    }
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-full">
          <Button className="rounded-md border bg-blue-800 border-black">
            <PenBox />
            Edit
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className=" border-black text-2xl"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
              </div>
              <div className="absolute z-20">
                <EmojiPicker
                  open={openEmojiPicker}
                  onEmojiClick={(e) => {
                    setEmojiIcon(e.emoji);
                    setOpenEmojiPicker(false);
                  }}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-sm text-black font-semibold my-1">
                    Budget Name
                </h2>
                <Input
                  placeholder="eg. Electricity bill"
                  defaultValue={budgetInfo?.name}
                  className="border-black"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-sm text-black font-semibold my-1 ">
                  Budget Amount
                </h2>
                <Input
                  placeholder="eg. $500"
                  type="number"
                  defaultValue={budgetInfo?.amount}
                  className="border-black"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    className="w-full mt-5"
                    onClick={() => onUpdateBudget()}
                  >
                    Update Budget
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}