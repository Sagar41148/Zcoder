 # Zcoder - Online Coding Platform

Zcoder is a full-stack web platform that allows users to solve coding problems online. Built with **React, Next.js, TypeScript, Tailwind CSS**, and **Firebase**, it features secure authentication, a curated problem set, an integrated code editor, and sandboxed code execution.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Usage](#usage)
- [Project Structure](#project-structure)
 

---

## Features

- **User Authentication & Authorization**
  - Firebase Authentication with Recoil for state management.
  - Route protection and secure Firestore rules.

- **Curated Problem Set**
  - Problems categorized by difficulty: Easy, Medium, Hard.
  - Sample test cases for each problem.
  - Tracks user progress and solved problems.

- **Monaco-Based Code Editor**
  - Integrated in-browser editor using Monaco Editor.
  - Syntax highlighting and multi-language support.
  - LocalStorage persistence to prevent code loss.

- **Sandboxed Code Execution**
  - Custom sandbox environment executes code safely.
  - Validates outputs against test cases and provides real-time verdicts.
  - Prevents infinite loops or unsafe operations.

- **User Dashboard**
  - Displays solved problems and submission history.

- **Responsive UI**
  - Fully responsive interface built with Tailwind CSS.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Next.js, TypeScript, Tailwind CSS |
| State Management | Recoil |
| Authentication | Firebase Authentication |
| Database | Firebase Firestore |
| Code Editor | Monaco Editor |
| Code Execution | Custom sandboxing technique |

---

## Architecture


- **Frontend:** React + Next.js for routing, UI rendering, and server-side rendering.  
- **Authentication:** Firebase Authentication with Recoil state management and secure Firestore rules.  
- **Database:** Firestore stores problems, user submissions, and progress tracking.  
- **Code Editor:** Monaco Editor embedded in React for in-browser code editing with syntax highlighting and persistence.  
- **Code Execution:** Custom sandbox environment executes submitted code safely and validates against test cases.  
- **Feedback:** Results (Accepted/Rejected/Error) displayed in real-time to the user.  

---

## Usage

1. Sign up or log in using Firebase Authentication.  
2. Browse the curated problem set and select a problem.  
3. Write your solution in the **Monaco-based code editor**.  
4. Click **Run** to test your code or **Submit** to validate it against all test cases in the sandbox.  
5. View real-time execution results (Accepted/Rejected/Error).  
6. Track solved problems and submission history on your dashboard.

---

## Project Structure

- /components   # React components (Editor, ProblemCard, Navbar)
- /pages        # Next.js pages (home, problems, dashboard)
- /utils        # Helper functions (sandbox execution, test case validation)
- /firebase     # Firebase configuration and services
- /styles       # Tailwind CSS customizations
