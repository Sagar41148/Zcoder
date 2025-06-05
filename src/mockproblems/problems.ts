export type Problem = {
	handlerFunction?: (cb: (...args: any[]) => any) => unknown;
	id: string;
	title: string;
	difficulty: "Easy" | "Medium" | "Hard";
	category: string;
	order: number;
	videoId?: string;
};


export const problems: Record<string, Problem> = {
	"two-sum": {
		id: "two-sum",
		title: "Two Sum",
		difficulty: "Easy",
		category: "Array",
		order: 1,
		videoId: "8-k1C6ehKuw",
		handlerFunction: (cb: Function) => {
			const testCases = [
				{ input: [[2, 7, 11, 15], 9], expected: [0, 1] },
				{ input: [[3, 2, 4], 6], expected: [1, 2] },
				{ input: [[3, 3], 6], expected: [0, 1] },
			];

			return testCases.every(({ input, expected }) => {
				try {
					const result = cb(...input);
					return JSON.stringify(result) === JSON.stringify(expected);
				} catch {
					return false;
				}
			});
		},
	},
	"reverse-linked-list": {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Hard",
    category: "Linked List",
    order: 2,
    videoId: "",
    handlerFunction: (cb) => {
        class ListNode {
			val: number;
			next: ListNode | null;
			constructor(val?: number, next?: ListNode | null) {
				this.val = val ?? 0;
				this.next = next ?? null;
			}
		}
		

        function areListsEqual(l1: { val: any; next: any } | null,
  l2: { val: any; next: any } | null) {
            while (l1 && l2) {
                if (l1.val !== l2.val) return false;
                l1 = l1.next;
                l2 = l2.next;
            }
            return l1 === null && l2 === null;
        }

        const testCases = [
            {
                input: [new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))))],
                expected: new ListNode(5, new ListNode(4, new ListNode(3, new ListNode(2, new ListNode(1))))),
            },
        ];

        return testCases.every(({ input, expected }) => {
            try {
                const result = cb(...input);
                return areListsEqual(result, expected);
            } catch {
                return false;
            }
        });
    },
},

	"jump-game": {
		id: "jump-game",
		title: "Jump Game",
		difficulty: "Medium",
		category: "Dynamic Programming",
		order: 3,
		videoId: "",
		handlerFunction: (cb: Function) => {
			const testCases = [
				{ input: [[2, 3, 1, 1, 4]], expected: true },
				{ input: [[3, 2, 1, 0, 4]], expected: false },
			];

			return testCases.every(({ input, expected }) => {
				try {
					const result = cb(...input);
					return result === expected;
				} catch {
					return false;
				}
			});
		},
	},
	"valid-parentheses": {
		id: "valid-parentheses",
		title: "Valid Parentheses",
		difficulty: "Easy",
		category: "Stack",
		order: 4,
		videoId: "xty7fr-k0TU",
		handlerFunction: (cb: Function) => {
			const testCases = [
				{ input: ["()"], expected: true },
				{ input: ["()[]{}"], expected: true },
				{ input: ["(]"], expected: false },
				{ input: ["([)]"], expected: false },
				{ input: ["{[]}"], expected: true },
			];

			return testCases.every(({ input, expected }) => {
				try {
					const result = cb(...input);
					return result === expected;
				} catch {
					return false;
				}
			});
		},
	},
	"search-a-2d-matrix": {
		id: "search-a-2d-matrix",
		title: "Search a 2D Matrix",
		difficulty: "Medium",
		category: "Binary Search",
		order: 5,
		videoId: "ZfFl4torNg4",
		handlerFunction: (cb: Function) => {
			const testCases = [
				{ input: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3], expected: true },
				{ input: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13], expected: false },
			];

			return testCases.every(({ input, expected }) => {
				try {
					const result = cb(...input);
					return result === expected;
				} catch {
					return false;
				}
			});
		},
	},
	"container-with-most-water": {
		id: "container-with-most-water",
		title: "Container With Most Water",
		difficulty: "Medium",
		category: "Two Pointers",
		order: 6,
		videoId: "",
		handlerFunction: (cb: Function) => {
			const testCases = [
				{ input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
				{ input: [[1, 1]], expected: 1 },
			];

			return testCases.every(({ input, expected }) => {
				try {
					const result = cb(...input);
					return result === expected;
				} catch {
					return false;
				}
			});
		},
	},
	"merge-intervals": {
		id: "merge-intervals",
		title: "Merge Intervals",
		difficulty: "Medium",
		category: "Intervals",
		order: 7,
		videoId: "",
		handlerFunction: (cb: Function) => {
			const testCases = [
				{ input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
				{ input: [[[1, 4], [4, 5]]], expected: [[1, 5]] },
			];

			return testCases.every(({ input, expected }) => {
				try {
					const result = cb(...input);
					return JSON.stringify(result) === JSON.stringify(expected);
				} catch {
					return false;
				}
			});
		},
	},
	"palindrome-number": {
		id: "palindrome-number",
		title: "Palindrome Number",
		difficulty: "Easy",
		category: "Math",
		order: 8,
		videoId: "4qYTqOiRMoM",
		handlerFunction: (cb: Function) => {
			const testCases = [
				{ input: [121], expected: true },
				{ input: [-121], expected: false },
				{ input: [10], expected: false },
			];

			return testCases.every(({ input, expected }) => {
				try {
					const result = cb(...input);
					return result === expected;
				} catch {
					return false;
				}
			});
		},
	},
	"best-time-to-buy-and-sell-stock": {
		id: "best-time-to-buy-and-sell-stock",
		title: "Best Time to Buy and Sell Stock",
		difficulty: "Easy",
		category: "Array",
		order: 9,
		videoId: "1pkOgXD63yU",
		handlerFunction: (cb: Function) => {
			const testCases = [
				{ input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
				{ input: [[7, 6, 4, 3, 1]], expected: 0 },
			];

			return testCases.every(({ input, expected }) => {
				try {
					const result = cb(...input);
					return result === expected;
				} catch {
					return false;
				}
			});
		},
	},
};

