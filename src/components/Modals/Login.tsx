import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

type LoginProps = {
    onForgotPassword: () => void;
    onSignup: () => void;
};

const Login: React.FC<LoginProps> = ({ onForgotPassword, onSignup }) => {
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
    
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) {
            alert("Please fill all fields");
            return;
        }
        try {
            const loggedInUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (!loggedInUser) return;
            router.push('/');
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        if (error) alert(error.message);
    }, [error]);

    return (
        <> 
            <form onSubmit={handleLogin} className="space-y-6 p-10">
                <h1 className="mr-5 font-sans text-xl font-semibold">Sign in to Zcoder</h1>

                <h2 className="font-sans">Your email</h2>
                <input
                    onChange={handleInputChange}
                    type="email"
                    name="email"
                    value={inputs.email}
                    placeholder="Enter your email"
                    className="border-2 outline-none sm:text-sm rounded-lg border-gray-500 placeholder-gray-400 h-10 w-full"
                />

                <h2 className="font-sans">Password</h2>
                <input
                    onChange={handleInputChange}
                    type="password"
                    name="password"
                    value={inputs.password}
                    placeholder="Type your Password"
                    className="border-2 outline-none sm:text-sm rounded-lg border-gray-500 placeholder-gray-400 h-10 w-full"
                />

                {error && <p className="text-red-500">{error.message}</p>}

                <button
                    type="submit"
                    className="border-2 outline-none sm:text-sm rounded-lg bg-[#131538] text-white h-10 w-full mt-4"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Submit"}
                </button>
            </form>

            <div className="text-right mt-2 pr-14">
                <a href="#" className="hover:underline hover:text-red-600" onClick={onForgotPassword}>
                    Forgot Password?
                </a>
            </div>

            <div className="mt-4 text-center">
                Not Registered? <a href="#" className="text-blue-600" onClick={onSignup}>Create account</a>
            </div>
        </>
    );
};   

export default Login;
