import { UserButton } from '@clerk/nextjs'
import React from 'react'

type Props = {}

export default function DashboardHeader({}: Props) {
  return (
    <div className='p-5 flex bg-slate-800 justify-between'>
        <div>
        S
        </div>
        <div>
            <UserButton/>
        </div>
    </div>
  )
}