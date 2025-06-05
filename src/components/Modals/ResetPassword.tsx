import { auth } from '@/firebase/firebase';
import React, { useState, FormEvent, useEffect } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';

interface ResetPasswordProps {
    onLogin: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

    const handleReset = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const success= await sendPasswordResetEmail(email);
         if(success){
            alert("Sent Email");
         }
    };

    useEffect(()=>{
        if(error){
            alert(error.message);
        }
    },[error]);

    return (
        <div className='p-6'>
            <h1 className='font-sans text-xl font-semibold'>Reset Password</h1>
            <p className='font-sans mt-5 mb-5'>
                Forgotten your password? Enter your e-mail address below and we will send you an email allowing you to reset it.
            </p>

            <h2 className='font-sans text-xl font-semibold'>Your email</h2>
            <form onSubmit={handleReset}>
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    className='border-2 outline-none sm:text-sm rounded-lg border-gray-500 placeholder-gray-400 h-10 w-full mt-4'
                />

                <button
                    type='submit'
                    className='border-2 outline-none sm:text-sm rounded-lg bg-[#131538] text-white h-10 w-full mt-6'
                    disabled={sending}
                >
                    {sending ? 'Sending...' : 'Submit'}
                </button>
            </form>

            {error && <p className='mt-4 text-red-600 text-center'>{error.message}</p>}

            <p className='mt-4 text-center'>
                Remember your password? <span className='text-blue-600 cursor-pointer' onClick={onLogin}>Log In</span>
            </p>
        </div>
    );
};

export default ResetPassword;
