'use client';
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link';
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
  }, [path])
  
  return (
    <div className='h-screen'>
      <div>S</div>
    <div className=' mt-5'>{menuList.map((menu,index)=>(
      <Link key={index} href={menu.path}>
      <h2  className={`flex mb-2 gap-2 items-center text-white font-medium p-5 
      cursor-pointer rounded-md hover:bg-blue-200 hover:text-blue-600 
      ${path==menu.path&& 'text-blue-800 bg-blue-200'}`}>
        <menu.icon/> 
        {menu.name}</h2></Link>
    ))}</div>
    <div className='flex fixed bottom-10 p-5 gap-3'>
      <UserButton/><h1 className='text-white'>Profile</h1>
    </div>
    </div>
  )
}