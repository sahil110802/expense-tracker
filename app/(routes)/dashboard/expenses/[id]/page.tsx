'use client';
import React, { useEffect, useState } from 'react'
import { eq, getTableColumns, sql } from 'drizzle-orm';
import { db } from '@/app/utils/db';
import { Budgets, Expenses } from '@/app/utils/schema';
import { useUser } from '@clerk/nextjs';
import BudgetItem from '../../budgets/_components/BudgetItem';



export default function ExpensesScreen({params}:any) {
    const {user}=useUser();
    const [budgetInfo, setBudgetInfo] = useState();
    useEffect(() => {
      user&&getBudgetInfo();
    }, [user])
    
    const getBudgetInfo=async()=>{
    const result=await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(cast(${Expenses.amount} as decimal))`.mapWith(Number),
      totalItem:sql `count(${Expenses.id})`.mapWith(Number),
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .where(eq(Budgets.id,params.id))
    .groupBy(Budgets.id)
    console.log(result[0])
    setBudgetInfo(result[0]);
  }
  return (
    <div className='p-10'>
        <h2 className='text-2xl font-bold'>Expenses</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <BudgetItem budget={budgetInfo}/>
        </div>

        </div>
  )
}