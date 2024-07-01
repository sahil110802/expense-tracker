/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { db } from '@/app/utils/db'
import { Budgets } from '@/app/utils/schema'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const {user}=useUser();
  const router=useRouter();
  useEffect(() => {
    user&&checkUserBudgets();
  }, [user])
  
  const checkUserBudgets=async()=>{
  const userAddress: any = user?.primaryEmailAddress?.emailAddress;

    const result=await db.select()
    .from(Budgets)
    .where(eq(Budgets.createdBy,userAddress))

    if(result.length==0){
      router.replace('/dashboard/budgets');
    }
  }
    
  return (
    <div>
      <div className='fixed md:w-64 hidden md:block bg-gray-900 '>
        <SideNav/>
      </div>
    <div className='md:ml-64 bg-gray-500 min-h-screen h-full'><DashboardHeader/>{children}</div>
    </div>
  )
}