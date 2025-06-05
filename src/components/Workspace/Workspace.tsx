import React, { useState } from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import Playground from './Playground/Playground';
import type { Problem } from '@/utils/types/problems';
import Confetti from "react-confetti";
import useWindowSize from '@/hooks/useWindowSize';

type WorkspaceProps = {
    problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
    const { width, height } = useWindowSize();
    const [success, setSuccess] = useState(false);
    const [solved, setSolved] = useState(false);

    return (
        <Split className='split'>
            <ProblemDescription problem={problem} solved={solved} />
            <div> 
                <Playground problem={problem} setSuccess={setSuccess} setSolved={setSolved} />
                {success && <Confetti gravity={0.3} tweenDuration={4000} width={width} height={height} />}
            </div>
        </Split>
    );
};

export default Workspace;
