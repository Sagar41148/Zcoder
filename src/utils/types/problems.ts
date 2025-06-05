export type Example = {
    id: number;
    input: string; // Changed from inputText
    output: string; // Changed from outputText
    explanation?: string;
    img?: string;
};

// Local problem data
export type Problem = {
    id: string;
    name: string;
    title: string;
    problemStatement: string;
    examples: Example[]; // This should now match expectations
    constraints: string;
    order: number;
    starterCode: string;
    handlerFunction: ((fn: any) => boolean) | string;
    starterFunctionName: string;
};

export type DBProblem = {
    constraints: string;
    examples: Example[]; // Changed from 'any' to 'Example[]'
    problemStatement: string;
    id: string;
    title: string;
    category: string;
    difficulty: string;
    likes: number;
    dislikes: number;
    order: number;
    videoId?: string;
    link?: string;
};
