import { auth } from "@/firebase/firebase";
import Link from "next/link";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "../Buttons/Logout";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import { useRouter } from "next/router";
import { problems } from "@/utils/problems";
import type { Problem } from "@/mockproblems/problems";
import AuthModal from "../Modals/AuthModal";
  // Import the AuthModal component

type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleProblemChange = (isForward: boolean) => {
    const { order } = problems[router.query.pid as string] as unknown as Problem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction;
    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextProblemOrder
    );

    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 1
      );
      router.push(`/problems/${firstProblemKey}`);
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === Object.keys(problems).length
      );
      router.push(`/problems/${lastProblemKey}`);
    } else {
      router.push(`/problems/${nextProblemKey}`);
    }
  };

  return (
    <>
      <nav
        className="relative flex h-[50px] w-full items-center px-5 justify-between text-white"
        style={{ height: "1.5cm", backgroundColor: "#111338" }}
      >
        {/* Left Side: Logo */}
        <Link href="/">
          <img src="/logo.png" alt="Logo" className="h-full w-auto" width={160} height={40} />
        </Link>

        {/* Centered Problem List with Navigation Buttons */}
        {problemPage && (
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 text-white cursor-pointer"
              onClick={() => handleProblemChange(false)}
            >
              <FaChevronLeft />
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium max-w-[170px] text-white cursor-pointer"
            >
              <BsList />
              <p>Problem List</p>
            </Link>
            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer text-white"
              onClick={() => handleProblemChange(true)}
            >
              <FaChevronRight />
            </div>
          </div>
        )}

        {/* Right Side: User Auth */}
        <div className="flex items-center space-x-4">
          {!user && (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded hover:bg-white hover:text-black"
            >
              Sign In
            </button>
          )}

          {user && (
            <div className="cursor-pointer group relative">
              <Image src="/avatar.png" alt="Avatar" width={30} height={30} className="rounded-full" />
              <div
                className="absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-dark-layer-1 text-black p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out"
              >
                <p className="text-sm">{user.email}</p>
              </div>
            </div>
          )}
          {user && <Logout />}
        </div>
      </nav>

      {/* Auth Modal - Only show if isAuthModalOpen is true */}
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </>
  );
};

export default Topbar;
