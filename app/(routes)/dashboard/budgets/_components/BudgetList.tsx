import React from 'react'
import CreateBudget from './CreateBudget'

type Props = {}

export default function BudgetList({}: Props) {
  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <CreateBudget/>
        </div>
        </div>
  )
}