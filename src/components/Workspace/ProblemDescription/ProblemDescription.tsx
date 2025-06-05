import { auth, firestore } from "@/firebase/firebase";
import type { DBProblem, Problem } from "@/utils/types/problems";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import Image from "next/image";

type ProblemDescriptionProps = {
    problem?: Problem;
    solved: boolean;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem, solved }) => {
    if (!problem) return <div className="text-center py-4">Loading problem...</div>;
    
    const { currentProblem, loading, problemDifficultyClass } = useGetCurrentProblem(problem.id);

    return (
        <div className="bg-white text-black">
            <div className="flex h-11 w-full items-center pt-2 bg-white text-black overflow-x-hidden">
                <div className="bg-white font-bold rounded-t-[5px] px-5 py-[10px] text-sm cursor-pointer">
                    Description
                </div>
            </div>
            <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
                <div className="px-5 w-full">
                    <div className="w-full">
                        <div className="flex space-x-4">
                            <div className="flex-1 mr-2 text-lg font-medium">{problem.title}</div>
                        </div>
                        {!loading && currentProblem && (
                            <div className="flex items-center mt-3">
                                <div className={`${problemDifficultyClass} inline-block rounded-[21px] px-2.5 py-1 text-xs font-medium capitalize`}>
                                    {currentProblem.difficulty}
                                </div>
                                {solved && (
                                    <div className="rounded p-[3px] ml-4 text-lg text-green-600">
                                        <BsCheck2Circle />
                                    </div>
                                )}
                                <div className="flex items-center cursor-pointer hover:bg-gray-300 space-x-1 rounded p-[3px] ml-4 text-lg text-gray-700">
                                    <AiFillLike />
                                    <span className="text-xs">120</span>
                                </div>
                                <div className="flex items-center cursor-pointer hover:bg-gray-300 space-x-1 rounded p-[3px] ml-4 text-lg text-gray-700">
                                    <AiFillDislike />
                                    <span className="text-xs">2</span>
                                </div>
                                <div className="cursor-pointer hover:bg-gray-300 rounded p-[3px] ml-4 text-xl text-gray-700">
                                    <TiStarOutline />
                                </div>
                            </div>
                        )}
                        <div className="text-black text-sm">
                            <div dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
                        </div>
                        <div className="mt-4">
                            {problem.examples?.map((example, index) => (
                                <div key={example.id}>
                                    <p className="font-medium text-black">Example {index + 1}:</p>
                                    {example.img && (
                                        <Image src={example.img} alt="Example" width={500} height={300} className="mt-3" />
                                    )}
                                    <div className="bg-gray-100 p-3 rounded-md mt-2">
                                        <pre>
                                            <strong>Input:</strong> {example.input}
                                            <br />
                                            <strong>Output:</strong> {example.output}
                                            <br />
                                            {example.explanation && (
                                                <>
                                                    <strong>Explanation:</strong> {example.explanation}
                                                </>
                                            )}
                                        </pre>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="my-5">
                            <div className="text-black text-sm font-medium">Constraints:</div>
                            <ul className="text-black ml-5 list-disc my-4">
                                <div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemDescription;

function useGetCurrentProblem(problemId?: string) {
    const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [problemDifficultyClass, setProblemDifficultyClass] = useState<string>("");

    useEffect(() => {
        if (!problemId) return;
        const fetchProblem = async () => {
            try {
                const docRef = doc(firestore, "problems", problemId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const problem = docSnap.data() as DBProblem;
                    setCurrentProblem(problem);
                    setProblemDifficultyClass(
                        problem.difficulty === "Easy" ? "bg-olive text-black" :
                        problem.difficulty === "Medium" ? "bg-dark-yellow text-black" :
                        "bg-dark-pink text-black"
                    );
                }
            } catch (error) {
                console.error("Error fetching problem:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProblem();
    }, [problemId]);

    return { currentProblem, loading, problemDifficultyClass };
}
