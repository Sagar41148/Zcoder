import { auth } from '@/firebase/firebase';
import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from 'react-icons/fi';

type LogoutProps = {
    
};

const Logout:React.FC<LogoutProps> = () => {
    const[signOut] =useSignOut(auth);
    const handleLogout=() =>{
          signOut();
    }
    return  (
        <button className='bg-[#111338]  cursor-pointer text-white' onClick={handleLogout} >
            <FiLogOut  fontSize={"23"}/>
        </button>
    );
}
export default Logout;