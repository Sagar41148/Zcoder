import AuthModal from '@/components/Modals/AuthModal';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import React, { useState } from 'react';

const AuthPage: React.FC = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <div>
            <Navbar onSignIn={() => setIsAuthModalOpen(true)} />
            <div className='flex space-x-20'>
                <div style={{ height: '2cm', width: '16cm' }}>
                    <h1 className='font-sans text-5xl font-semibold ml-20 mt-10 px-10'>Welcome to Zcoder</h1>
                    <p className='font-sans text-gray-500 ml-20 px-10 mt-10'>
                        Z Coder is an online coding platform designed to help programmers enhance their problem-solving skills through coding challenges and contests. 
                        With a vast collection of problems, real-time leaderboards, and interactive features, Z Coder fosters learning and competition. 
                        Whether you're a beginner or an expert, sharpen your coding skills and compete with the best!
                    </p>
                    <Link href='/'>
                        <div className='ml-8'>
                            <button className="bg-[#111338] text-white border border-white px-4 py-2 rounded-md hover:bg-[#222448] transition ml-20 px-20 mt-10">
                                Solve Problems
                            </button>
                        </div>
                    </Link>
                </div>
                <div className='mt-12 px-5'>
                    <img src='img2.png' alt='img2' className='rounded-md ' />
                </div>
            </div>

            {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
        </div>
    );
};

export default AuthPage;
