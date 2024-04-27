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

## About testing

Im new to testing and to be fair this was a real challenge for me, not only did i run out of time but most
import i lack knowledge on this important area of web development. That aside, i will be aiming to found a
more cosistent and simple solution for this challenge and to learn more about unit testing, so i can finally
beat this challenge.
