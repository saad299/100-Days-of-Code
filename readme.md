# 100 Days of code

The sole purpose of creating and starting this 100 days of code was to motivate myself to become a full-stack dev, someone who can knows how the purpose of creating softwares inside and out, someone who can efficiently code in JavaScript, TypeScript, and Python.

This 100 days of code starts from revision of React.js. The reason for doing this was I already know the pre-requisites including HTML, CSS, JavaScript, TailwindCSS, but somehow my learning progress got stalled on React.js. Therefore, I decided to start this 100 days of code.

## Day 1: React Refresher + Project Setup
Installed React + Tailwind

React installation:
> ```powershell
> npm create vite@latest
> ```

named the project `react_app`

then,
> ```powershell
> cd project-directory
> ```

install project dependencies
> ```powershell
> npm install
> ```

install tailwindcss
> ```powershell
> npm install tailwindcss @tailwindcss/vite
> ```

## Day 1: React Refresher
For day 1, go to `Basics.jsx` in `Days_1-10_react/react_app/src/components` directory

## Day 2: useState basics
For day2, I used the same `react_app` project
For day 2, go to `State.jsx` in `Days_1-10_react/react_app/src/components` directory

## Day 3: Rendering List + Conditional Rendering
For day3, I used the same `react_app` project
For day 3, go to `ListRendering.jsx` in `Days_1-10_react/react_app/src/components` directory

## Day 4: useEffect basics
For day4, I used the same `react_app` project
For day 4, go to `Effect.jsx` in `Days_1-10_react/react_app/src/components` directory

## Day 5: Fetching Data (useEffect/axios)
For day5, I used the same `react_app` project
For day 5, go to `Fetch.jsx` in `Days_1-10_react/react_app/src/components` directory

## Day 6: TypeScript Basics
For day6, I installed and learned the basics of TypeScript
For day 6, go to `TypeScript` folder in `Days_1-10_react` directory

Install TypeScript:
```powershell
npm install -D typescript
```
Then,
```powershell
npx tsc --init
```

Create a TypeScript file. To compile TypeScript file into JavaScript file:
```powershell
npx tsc filename.ts
```
Then, in order to see the result of the compiled JavaScript file:
```powershell
node filename.js
```

You have to manually type the above commands again and again in order to compile the file into js file. In order to automatically compile the TS file into JS and see the result at the same time, do this.
### Step1:
Open the terminal and type the following command:
```powershell
npx tsc --watch
```
This command will automatically compile the TS file into JS whenever you type some TS code in the TS file
### Step2:
Open another terminal (don't close the previous terminal) on the other side in the editor and enter the following command:
```powershell
node --watch filename.js
```
This command will instantly show the result of the JS file once the TS file is done compiling into JS

## Day 7: Custom Hooks
For day7, I used the same `react_app` project
For day 7, go to `Effect.jsx` in `Days_1-10_react/react_app/src/components`

## Day 8: Understanding Form Handling with TypeScript in React
For day8, I used the same `react_app` project
For day 8, go to `FormHandling.jsx` in `Days_1-10_react/react_app/src/components`
Additionally, go to `react_tsx` folder in `Days_1-10_react` directory. go to `FormHandling.tsx` in `Days_1-10_react/react_tsx/src`

## Day 9: Understanding the React Context API
For day9, I used the same `react_app` project
For day 9, go to `context` folder in `Days_1-10_react/react_app/src/components`

## Day 10: Building a Weather App
For day10, I used the same `react_app` project
For day 10, go to `weather_app` folder in `Days_1-10_react/react_app/src/components`
Additionally, go to `react_tsx` folder in `Days_1-10_react` directory. go to `weather_app` folder in `Days_1-10_react/react_tsx/src/components`

## Day 11: Understanding State Management in React
For day11, I created a new folder `Days_11_20` in `Days_1-10_react` directory. In it, I created `react_advanced` folder
For day 11, go to `StateManagement.tsx` folder in `Days_11_20/react_advanced/src/components`

## Day 12: Understanding Zustand
For day12, I used the same `StateManagement.tsx` file in `Days_11_20/react_advanced/src/components`

## Day 13: TanStack Query
For day13, I used the same `StateManagement.tsx` file in `Days_11_20/react_advanced/src/components`

## Day 14: Pagination + Infinite Scroll
For day14, I used the same `StateManagement.tsx` file in `Days_11_20/react_advanced/src/components`

## Day 15: Performance Optimization
For day15, I used the same `StateManagement.tsx` file in `Days_11_20/react_advanced/src/components`

## Day 16: Routing in React
For day16, I used the same `StateManagement.tsx` file in `Days_11_20/react_advanced/src/components`

## Day 17: Forms with libraries
For day17, I used the same `StateManagement.tsx` file in `Days_11_20/react_advanced/src/components`

## Day 18: Understanding File Uploads
For day18, I used the same `StateManagement.tsx` file in `Days_11_20/react_advanced/src/components`

## Day 19: Tour Project App
For day19, I created a new folder in `src` of the `react_advanced` folder named `TourProject` and started working on Tour Project App

## Day 20: Tour Project App
For day20, I worked and completed the Tour Project App `Days_11_20/react_advanced/src/components/TourProject`