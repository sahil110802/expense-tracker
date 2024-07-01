'use client';
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/app/utils/db'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/app/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem';
import { PgInteger } from 'drizzle-orm/pg-core';
import moment from 'moment';
type Props = {}

export default function BudgetList({}: Props) {
  const [budgetList, setBudgetList] = useState<any[]>([])
  const {user}=useUser();
  useEffect(() => {
    user&&getBudgetList();
  }, [user])
  
  const getBudgetList=async()=>{
    const result=await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(cast(${Expenses.amount} as decimal))`.mapWith(Number),
      totalItem:sql `count(${Expenses.id})`.mapWith(Number),
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id));
    // console.log(result);
    setBudgetList(result);
  }
  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <CreateBudget refreshData={()=>getBudgetList()}/>
            {budgetList?.length>0? budgetList.map((budget,index)=>(
              <BudgetItem key={index} budget={budget}/>
            )):
            [0,1,2,3,4,5,6].map((item,index)=>(
              <div key={index} className='w-full rounded-lg bg-slate-700 h-[120px] animate-pulse'>

              </div>
            ))

            
          }
          
        </div>
        </div>
  )
}