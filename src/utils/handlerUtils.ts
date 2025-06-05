import assert from "assert";

type TestCase<T, U> = {
  input: T[];
  output: U;
};

export const createHandler = <T, U>(testCases: TestCase<T, U>[]) => {
  return (fn: (...args: T[]) => U) => {
    try {
      for (let i = 0; i < testCases.length; i++) {
        const result = fn(...testCases[i].input);
        assert.deepStrictEqual(result, testCases[i].output);
      }
      return true;
    } catch (error) {
      console.log("Handler function error");
      throw new Error((error as Error).message);
    }
  };
};
