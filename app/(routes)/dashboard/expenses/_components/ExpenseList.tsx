import { db } from "@/app/utils/db";
import { Expenses } from "@/app/utils/schema";
import { toast } from "@/components/ui/use-toast";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
    expenseList:Object|any,
    refreshData:()=>void,
};

export default function ExpenseList({ expenseList, refreshData }: Props) {
  const deleteExpense = async (expenses:any) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expenses.id))
      .returning();

    if (result) {
      refreshData();
      toast({
        title: "Expense Deleted!",
      });
    }
  };
  return (
    <div className="mt-5">
      <h2 className="font-bold">Latest Expenses</h2>
      <div className="mt-3">
        <div className="grid grid-cols-4 bg-black text-white p-2">
          <h2>Name</h2>
          <h2>Amount</h2>
          <h2>Date</h2>
          <h2>Action</h2>
        </div>
        {expenseList.map((expenses:any, index:any) => (
          <div
            key={index}
            className={`grid grid-cols-4 ${index%2===0?'bg-gray-400':'bg-gray-800'} text-white p-2`}
          >
            <h2>{expenses.name}</h2>
            <h2>{expenses.amount}</h2>
            <h2>{expenses.createdAt}</h2>
            <h2>
              <Trash
                className="text-red-700 cursor-pointer"
                onClick={() => deleteExpense(expenses)}
              />
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
