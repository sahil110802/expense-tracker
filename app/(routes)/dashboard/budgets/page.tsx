import React from 'react'
import BudgetList from './_components/BudgetList'

type Props = {}

export default function Budgets({}: Props) {
  return (
    <div className='p-3'>
      <h2 className='text-3xl font-bold'>My Budgets</h2>
      <BudgetList/></div>
  )
}