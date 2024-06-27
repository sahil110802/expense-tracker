'use client';
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {}

export default function SideNav({}: Props) {
  const menuList=[
    {
      id:1,
      name:'Dashboard',
      icon:'s',
      path:'/dashboard',
    },
    {
      id:2,
      name:'Budgets',
      icon:'s',
      path:'/dashboard/budgets',
    },
    {
      id:3,
      name:'Expenses',
      icon:'s',
      path:'/dashboard/expenses',
    },
    {
      id:4,
      name:'Upgrade',
      icon:'s',
      path:'/dashboard/upgrade',
    }
    
  ]

  const path=usePathname();
  useEffect(() => {
    console.log(path);
  }, [path])
  
  return (
    <div className='h-screen'>
      <div>S</div>
    <div className=' mt-5'>{menuList.map((menu,index)=>(
      <h2 key={index} className={`flex mb-2 gap-2 items-center text-white font-medium p-5 
      cursor-pointer rounded-md hover:bg-blue-200 hover:text-blue-600 
      ${path==menu.path&& 'text-blue-700 bg-blue-200'}`}>
        <menu.icon/> 
        {menu.name}</h2>
    ))}</div>
    <div className='flex fixed bottom-10 p-5 gap-3'>
      <UserButton/><h1>Profile</h1>
    </div>
    </div>
  )
}