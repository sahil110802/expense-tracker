'use client';
import { UserButton } from '@clerk/nextjs';
import React from 'react';
import { useUser } from "@clerk/clerk-react";
import Link from 'next/link';
type HeaderProps = {
    
};

const Header:React.FC<HeaderProps> = () => {
    const {user,isSignedIn}=useUser();
    return <div className='flex justify-between  bg-gray-800 text-white font-bold text-4xl items-center h-16 px-6'>
        <div>S</div>
        {isSignedIn?<UserButton/>:
        <Link href='/sign-in'>
        <button>Get Started</button>
        </Link>}
    </div>
}
export default Header;