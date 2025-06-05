import { firestore } from '@/firebase/firebase';
import type { DBProblem } from '@/utils/types/problems';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiFillYoutube } from 'react-icons/ai';
import { BsCheckCircle } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import YouTube from 'react-youtube';

type ProblemsTableProps = Record<string, never>;

const ProblemsTable: React.FC<ProblemsTableProps> = () => {
    const [loadingProblems, setLoadingProblems] = useState(true);
    const problems = useGetProblems(setLoadingProblems);
    const [youtubePlayer, setYoutubePlayer] = useState({ isOpen: false, videoId: "" });

    const closeModal = () => {
        setYoutubePlayer({ isOpen: false, videoId: "" });
    };

    return (
        <>
            <tbody>
                {loadingProblems ? (
                    <tr><td colSpan={5} className="text-center">Loading...</td></tr>
                ) : (
                    problems.map((doc, idx) => {
                        const difficultyColor = doc.difficulty === "Easy" ? "text-dark-green-s" :
                            doc.difficulty === "Medium" ? "text-dark-yellow" : "text-dark-pink";

                        return (
                            <tr className={`${idx % 2 === 1 ? "bg-dark-layer-1" : ""}`} key={doc.id}>
                                <th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
                                    <BsCheckCircle fontSize={"18"} width='18' />
                                </th>
                                <td>
                                    <Link className='hover:text-blue-500 cursor-pointer text-black' href={`/problems/${doc.id}`}>
                                        {doc.title}
                                    </Link>
                                </td>
                                <td className={`px-6 py-4 ${difficultyColor}`}>
                                    {doc.difficulty}
                                </td>
                                <td className='px-6 py-4 text-black'>
                                    {doc.category}
                                </td>
                                <td>
                                    {doc.videoId && doc.videoId.trim() !== "" ? (
                                        <AiFillYoutube
                                            fontSize={"28"} className='cursor-pointer text-red-600 align-center'
                                            onClick={() => setYoutubePlayer({ isOpen: true, videoId: doc.videoId as string })} />
                                    ) : (
                                        <p className='text-black'>Coming Soon</p>
                                    )}
                                </td>
                            </tr>
                        );
                    })
                )}
            </tbody>
            {youtubePlayer.isOpen && (
                <tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
                    <div className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'></div>
                    <div className='w-full z-50 h-full px-6 relative max-w-4xl'>
                        <div className='w-full h-full flex items-center justify-center relative'>
                            <div className='w-full relative'>
                                <IoClose fontSize={"35"} className='cursor-pointer absolute -top-16 right-0' onClick={closeModal} />
                                <YouTube videoId={youtubePlayer.videoId} loading='lazy' iframeClassName='w-full min-h-[450px]' />
                            </div>
                        </div>
                    </div>
                </tfoot>
            )}
        </>
    );
};

export default ProblemsTable;

function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
    const [problems, setProblems] = useState<DBProblem[]>([]);

    useEffect(() => {
        const getProblems = async () => {
            try {
                setLoadingProblems(true);
                const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
                const querySnapshot = await getDocs(q);
                const tmp: DBProblem[] = [];
                querySnapshot.forEach((doc) => {
                    tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
                });
                setProblems(tmp);
            } catch (error) {
                console.error("Error fetching problems:", error);
            } finally {
                setLoadingProblems(false);
            }
        };

        getProblems();
    }, [setLoadingProblems]);

    return problems;
}
