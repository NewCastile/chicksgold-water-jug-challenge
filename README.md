# Chicks Water Jug Challenge

## Overview

Welcome to the Water Jug Challenge! In this task, you'll create an application to
solve the classic Water Jug Riddle. The challenge involves using two jugs with
different capacities (X gallons and Y gallons) to measure exactly Z gallons of water.
Your application should have a user interface (UI) that displays the state changes
of each jug (Empty, Full, or Partially Full) as it progresses towards the solution.
Goals

1. Problem Solving: Measure Z gallons of water using only the two jugs in the
   most efficient way possible.
2. User Interface Development: Create a UI where users can input any values
   for X, Y, and Z, and see the step-by-step solution. If a solution is not
   possible, the UI should display “No Solution”.

## Installation

Download the code or clone the repo via your terminal, then access the projects folder
and run the command `npm install`.

## Project structure

- `types` folder contains all the typings for the project.

- `utils` folder contains all functions that helps to simplify and clarify the applications components.

- `hooks` folder contains custom hooks.

- `components` folder contains the apps components.

- `data` folder contains the apps contants modularized for simplification of the code.

## My solution

The solution i found came actually from trial and error. The simplest way to solve this problem
is by either filling the X jug then transfering to Y, filling X each time its empty and emptying
Y whenever its full.

The conditions for which the problem has a solution are:

- The GCD between the capacities of bucket X and Y divides the target capacity.
- The capacities of X and Y has to be integers.
- The capacity of X or Y has to be greater than the target capacity.

To show the user the optimal solution i run this steps at the same time using the useTrack hook,
which helps to complete both paths, storing the state of each buckets in an array that represents
am iteration of the solution, and then concatenating this iteration to another array, that contains
all the previous steps.

The optimal solution is then checked by another hook that sets the optimal solution as the one
with less iterations.

You can find my trial an error process in the chicks-water-jug-challenge.png image located in assests
folder.

**Remainder**: To make another test yo have to reload the page.

## The React approach

The whole loop algorithm its made by the useTrack custom hook. This hook is responsible running the loop, keeping the state
of steps taken to achieve the goal and to end the loop in case the goal is achieved or the loop repeats itself at a certain point.
In the `useTrack.tsx` file you will also find comments pointing out important information to understand the hooks functionality.

## Testing

For the evaluation of the most important function of the app i used **vitest** which its vite-native testing framework and
**react-testing-library**, which a react package that contains all the necessary browser DOM manipulation API for testing
web pages by querying and interacting with DOM node including easy-to-use APIs for several JavasScript frameworks.

Both of this library que by used to do **E2E testing**, **unit testing** and even **React Hooks**.

All the folders inside the `tests` folder whereas the E2E test are stored in the `tests/e2e` sub-folder.

For e2e testing, the queryed elements has to be tagged with a `data-testid` data attribute, this makes the DOM querying
easier and more intuitive.

To separate the testing code from production the branch `vitest` was created, ensuring that no code test-related
is present in production which made lead to all kind of problems (for example: The `data-testid` attributes leads to
worst accesibility and SEO metrics).

To run all the test run the command `npm run test` in your terminal
