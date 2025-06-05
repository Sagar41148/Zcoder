import type { Problem } from "../types/problems";
import { containerWithMostWater } from "./container-problem";
import { jumpGame } from "./jump-game";
import { mergeIntervals } from "./merge-intervals";
import { palindromeNumber } from "./palindrome-no";
import { reverseLinkedList } from "./Reverse-linkedlist";
import { search2DMatrix } from "./searcd-2d-matrix";
import { twoSum } from "./two-sum";
import { validParentheses } from "./valid-parantheses";

interface ProblemMap{
    [key:string]:Problem; 
}

export const problems:ProblemMap ={
  "two-sum":twoSum,
  "reverse-linked-list":reverseLinkedList,
  "jump-game":jumpGame,
  "search-a-2d-matrix": search2DMatrix,
  "valid-parentheses": validParentheses,
  "container-with-most-water":containerWithMostWater,
  "merge-intervals":mergeIntervals,
  "palindrome-number":palindromeNumber
};

export type DBProblem = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  problemStatement: string;
  examples: { id: string; inputText: string; outputText: string; explanation?: string; img?: string }[];
  constraints: string;
};
