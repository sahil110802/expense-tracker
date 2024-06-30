import { useUser } from '@clerk/nextjs';
import React from 'react'

type Props = {}

export default function Dashboard({}: Props) {
  const { user } = useUser();

  return (
    <div className="p-5">
      
      <h2>Hi, {user?.fullName}</h2>
    </div>
  );
}