import React, { useEffect, useState, type ReactNode } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import Codemirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { problems } from "@/mockproblems/problems";
import { toast, ToastContainer } from "react-toastify";
import { doc, setDoc, arrayUnion, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css"; 
import type { Problem } from "@/utils/types/problems";

interface Example {
  id: number;
  inputText: ReactNode;
  outputText: ReactNode;
  input: string;
  output: string;
}

type PlaygroundProps = {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  const [userCode, setUserCode] = useState<string>(problem.starterCode);
  const [user] = useAuthState(auth);
  const { query } = useRouter();
  const pid = query.pid as string;

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to submit your code", { position: "top-center", autoClose: 3000, theme: "dark" });
      return;
    }

    try {
      if (!problem.starterFunctionName || !userCode.includes(problem.starterFunctionName)) {
        toast.error("Invalid function definition in your code!", { position: "top-center", autoClose: 3000, theme: "dark" });
        return;
      }

      const extractedCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
      const cb = new Function(`"use strict"; return ${extractedCode}`)();
      const handler = problems?.[pid]?.handlerFunction;

      if (typeof handler === "function") {
        const success = handler(cb);
        if (success) {
          toast.success("Congrats! All tests passed!", { position: "top-center", autoClose: 3000, theme: "dark" });
          setSuccess(true);
          setTimeout(() => setSuccess(false), 4000);

          const solvedProblemRef = doc(firestore, "solvedProblems", user.uid);
          const solvedProblemDoc = await getDoc(solvedProblemRef);

          if (solvedProblemDoc.exists()) {
            await updateDoc(solvedProblemRef, {
              problems: arrayUnion(problem.title),
              lastSolved: serverTimestamp(),
            });
          } else {
            await setDoc(solvedProblemRef, {
              problems: [problem.title],
              lastSolved: serverTimestamp(),
            });
            setSolved(true);
          }

          toast.success("Problem marked as solved!", { position: "top-center", autoClose: 3000, theme: "dark" });
        } else {
          toast.error("Test cases failed. Try again!", { position: "top-center", autoClose: 3000, theme: "dark" });
        }
      } else {
        toast.error("Handler function is not defined!", { position: "top-center", autoClose: 3000, theme: "dark" });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Execution Error:", error.message);
        toast.error(error.message.includes("AssertionError") 
          ? "Oops! One or more test cases failed." 
          : error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
      } else {
        console.error("Unknown error occurred", error);
        toast.error("An unknown error occurred.", { position: "top-center", autoClose: 3000, theme: "dark" });
      }
    }
  };

  useEffect(() => {
    if (!pid) return;
    const code = localStorage.getItem(`code-${pid}`);
    setUserCode(user ? (code ? JSON.parse(code) : problem.starterCode) : problem.starterCode);
  }, [pid, user, problem.starterCode]);

  return (
    <div className="flex flex-col bg-dark-layer-2 relative h-screen">
      <PreferenceNav />
      <ToastContainer />
      <Split className="flex flex-col h-[calc(100vh-50px)] split" sizes={[70, 30]} minSize={70} gutterSize={6} direction="vertical">
        <div className="h-full">
          <Codemirror value={userCode} theme={vscodeDark} onChange={setUserCode} extensions={[javascript()]} style={{ fontSize: 16, height: "100%" }} />
        </div>
        <div className="w-full px-5 overflow-auto">
          <div className="flex h-10 items-center justify-between">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">Testcases</div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
            <EditorFooter handleSubmit={handleSubmit} />
          </div>
          <div className="flex mt-2">
            {problem.examples.map((example, index) => (
              <div key={example.id} className={`mr-2 items-start text-white cursor-pointer ${activeTestCaseId === index ? "bg-dark-fill-2" : ""}`} onClick={() => setActiveTestCaseId(index)}>
                <div className="flex flex-wrap items-center gap-y-4">
                  <div className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 whitespace-nowrap ${activeTestCaseId === index ? "text-white" : "text-gray-500"}`}>Case {index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Split>
    </div>
  );
};

export default Playground;
