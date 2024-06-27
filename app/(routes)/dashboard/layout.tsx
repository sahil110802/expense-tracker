import React from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className='fixed md:w-64 hidden md:block bg-gray-900 '>
        <SideNav/>
      </div>
    <div className='md:ml-64 bg-green-600'><DashboardHeader/>{children}</div>
    </div>
  )
}