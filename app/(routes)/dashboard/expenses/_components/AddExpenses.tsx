import { db } from "@/app/utils/db";
import { Budgets, Expenses } from "@/app/utils/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import moment from 'moment'
type Props = {
  budgetId:string;
  user:any;
  refreshData:()=>void;
};

export default function AddExpenses({budgetId,user,refreshData}:Props) {
    const [name,setName] = useState<string>();
    const [amount, setAmount] = useState<string>();

    const addExpense=async()=>{
        const result = await db.insert(Expenses).values({
          name: name,
          amount: amount,
          budgetId: budgetId,
          createdAt: moment().format('DD/MM/yyy'),
        }).returning({insertedId:Budgets.id})

        console.log(result);
        if(result){
            refreshData(),
              toast({
                title: "New Expense Added!",
              });
        }
    }
  return (
    <div className="bg-cyan-700 p-5 border-black border-2 rounded-md">
      <h2 className="font-bold">Add Expenses</h2>
      <div className="mt-2">
        <h2 className="text-lg text-black  my-1">Expense Name</h2>
        <Input
          placeholder="eg. Electricity bill"
          className="border-black"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-lg text-black  my-1 ">Expense Amount</h2>
        <Input
          placeholder="eg. $500"
          type="number"
          className="border-black"
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          disabled={!name || !amount}
          className="w-full mt-5"
          onClick={() => addExpense()}
        >
          Add Expense
        </Button>
      </div>
    </div>
  );
}
