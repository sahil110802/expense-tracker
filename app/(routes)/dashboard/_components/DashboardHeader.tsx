import { UserButton } from '@clerk/nextjs'
import React from 'react'

type Props = {}

export default function DashboardHeader({}: Props) {
  return (
    <div className='p-5 flex justify-between'>
        <div>

        </div>
        <div>
            <UserButton/>
        </div>
    </div>
  )
}