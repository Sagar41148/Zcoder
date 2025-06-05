import Link from 'next/link';
import React from 'react';

interface NavbarProps {
    onSignIn: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSignIn }) => {
    return (
        <nav className="h-8 p-4 flex items-center justify-between text-white" style={{ height: '1.5cm', backgroundColor: '#111338' }}>
            <div>
                <Link href='/'>
                    <img src='logo.png' alt='Logo' className='h-20 w-auto' />
                </Link>
            </div>

            <div className="flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
                <Link href='/' className='text-lg hover:underline'>Problems</Link>
                <Link href='/contest' className='text-lg hover:underline'>Contests</Link>
                <Link href='/standings' className='text-lg hover:underline'>Standings</Link>
            </div>

            <div>
                <button onClick={onSignIn} className='px-3 py-2 border-2 border-transparent rounded-md hover:border-white text-white hover:underline'>
                    Sign In
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
