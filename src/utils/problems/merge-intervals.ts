import assert from "assert";
import type { Problem } from "../types/problems";

const starterCodeMergeIntervals = `function merge(intervals) {
  // Write your code here
};`;

const handlerMergeIntervals = (fn: (intervals: number[][]) => number[][]) => {
  try {
    const intervals = [
      [[1, 3], [2, 6], [8, 10], [15, 18]],
      [[1, 4], [4, 5]],
    ];

    const answers = [
      [[1, 6], [8, 10], [15, 18]],
      [[1, 5]],
    ];

    for (let i = 0; i < intervals.length; i++) {
      const result = fn(intervals[i]);
      assert.deepStrictEqual(result, answers[i]);
    }
    return true;
  } catch (error: unknown) {
    console.log("Merge Intervals handler function error");
    throw new Error((error as Error).message);
  }
};

export const mergeIntervals: Problem = {
  id: "merge-intervals",
  title: "56. Merge Intervals",
  problemStatement: `<p class='mt-3'>
    Given an array of <code>intervals</code> where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, 
    merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
  </p>`,
  examples: [
    {
      id: 1,
      input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
      output: "[[1,6],[8,10],[15,18]]",
      explanation: "Intervals [1,3] and [2,6] overlap, so they are merged into [1,6]."
    },
    {
      id: 2,
      input: "intervals = [[1,4],[4,5]]",
      output: "[[1,5]]",
      explanation: "Intervals [1,4] and [4,5] overlap, so they are merged into [1,5]."
    }
  ],
  constraints: `<li class='mt-2'>
    <code>1 ≤ intervals.length ≤ 10<sup>4</sup></code>
  </li> 
  <li class='mt-2'>
    <code>intervals[i].length == 2</code>
  </li> 
  <li class='mt-2'>
    <code>0 ≤ start<sub>i</sub> ≤ end<sub>i</sub> ≤ 10<sup>4</sup></code>
  </li>`,
  handlerFunction: handlerMergeIntervals,
  starterCode: starterCodeMergeIntervals,
  order: 56,
  starterFunctionName: "function merge(",
  name: ""
};
