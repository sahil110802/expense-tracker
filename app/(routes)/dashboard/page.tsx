"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import { db } from "@/app/utils/db";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/app/utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseList from "./expenses/_components/ExpenseList";
type Props = {};

export default function Dashboard({}: Props) {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState<any[]>([]);
  const [expensesList, setExpensestList] = useState<any[]>([]);

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(cast(${Expenses.amount} as decimal))`.mapWith(
          Number
        ),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
      // console.log(result);
    setBudgetList(result);
    getAllExpenses();
  };

  const getAllExpenses=async()=>{
    const result=await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(Expenses.id));
    // console.log(result);
    setExpensestList(result);
  }
useEffect(() => {
  user&&getBudgetList();
}, [user])

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold">Hi, {user?.fullName} 💸</h2>
      <p>Here's what happening with your money, Lets manage your expenses.</p>
      <CardInfo budgetList={budgetList} />
      <div className=" grid grid-cols-1 md:grid-cols-3 mt-3">
        <div className="md:col-span-2 bg-gray-300 p-2">
          <h2 className="text-2xl font-bold">Activity</h2>
          <BarChartDashboard budgetList={budgetList}/>
          <ExpenseList expenseList={expensesList} refreshData={()=>getBudgetList()}/>
        </div>
        <div>
          <h2 className="text-2xl m-3 font-bold">Latest Budgets</h2>
       
         {budgetList.map((budget,index)=>(
          
            <BudgetItem key={index} budget={budget}/>
          
         ))}
        </div>
      </div>
    </div>
  );
}
