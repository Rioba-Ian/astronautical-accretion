---
title: Data Fetching with React Query
author: Rioba Ian
pubDatetime: 2023-07-06T13:05:51Z
postSlug: data-fetching-with-react-query-caching-polling-mutations
featured: true
draft: false
tags:
  - react
  - axios
  - js
  - typescript
  - useEffect
  - react-query
  - data fetching
ogImage: https://res.cloudinary.com/drxurk7lu/image/upload/v1688632999/1688545962339_dvr6tv.jpg
description: Data fetching made easy with react query, caching, retries, deduping, polling, infinite data, mutations, invaidations
---

In this article I'll be covering important ways that you can better fetch your data in a react application while having less work in handling state and other functionalities such as retrying requests, caching, polling, deduping, mutations, inifinite scrolling and many more.

_You can use the table of contents to jump straight to the [main Content]()._

## Table of contents

## Motivation

React has no say on how you would like to fetch your data from the backend. You can use the `fetch` method or a library like `axios` to handle fetching of your data. We can take a look at the following table just for a comparison.

| Feature              | `fetch` | `axios`   | `react-query` |
| -------------------- | ------- | --------- | ------------- |
| Built-in             | Yes     | No        | No            |
| JSON parsing         | Manual  | Automatic | Automatic     |
| Request cancellation | No      | Yes       | Yes           |
| Request timeout      | No      | Yes       | Yes           |
| Request retries      | No      | No        | Yes           |
| Request progress     | No      | Yes       | No            |
| Cache management     | No      | No        | Yes           |
| Query invalidation   | No      | No        | Yes           |

## Why React Query

Because, there is no specific way to fetch our data, using `useEffect` for fetching and then `useState` for mainatining state, error and the data itself is the method used. If we need the data throughout the app then we use state management libraries such as Redux, Zustand or ContextAPI.

But wait, state management libraries are good working with client state and not server state / asynchronous state like data fetching.

- server state is persisted remotely and requires aync calls to APIs
- It is shared meaning that someone might update it and our UI will be out of sync.
- It is quite complex dealing with deduping, caching and invalidating stale data

Enter React Query.

## Comparing fetching using useEffect and React query

<a href="https://imgflip.com/i/7rodxx"><img src="https://i.imgflip.com/7rodxx.jpg" title="made at imgflip.com"/></a><div><a href="https://imgflip.com/memegenerator">from Imgflip Meme Generator</a></div>

### How does useEffect updates the DOM

We'll start with a simple set up where we render a simple app and track any updates to the DOM.

![DOM updates when we type inside the input and increasing the count](https://res.cloudinary.com/drxurk7lu/image/upload/v1688638072/WhatsApp_Image_2023-07-06_at_1.06.39_PM_kznv6f.jpg)

Above we can see that the dom first updates when the app is first rendered, it actually renders twice. I've removed the React strict mode and so our component renders and then the useEffect runs. The code is as below:

```jsx
import { useEffect, useState } from "react";
function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    console.count("useEffect runs!");
    document.title = `You are on count ${count}`;
  });
  console.count("component rendered!");
  return (
    <>
      <h1>Hello React</h1>
      <p>You click {count} times</p>
      <div>
        <input
          type="text"
          name="name"
          id="name"
          onChange={e => setName(e.target.value)}
        />
      </div>
      <button onClick={() => setCount(prev => prev + 1)}>Add</button>
    </>
  );
}
export default App;
```

If we type anything in the input it will cause a re-render and the useEffect also fires off.

![useEffect triggers a re-render](https://res.cloudinary.com/drxurk7lu/image/upload/v1688638072/WhatsApp_Image_2023-07-06_at_1.07.12_PM_uofa0w.jpg)

Of course, we can stop this re-rendering of the useEffect by updating our dependency array with count variable. This time typing inside the input will not fire off the useEffect.

The useEffect will always run after the component has rendered, and will re-render if any state that is part of the component has been included in the dependency array and it also changes.

## Set up

## Basic queries and reusable query hooks

## Polling data

## Quering by ID

### Paginated queries

## Updating data through mutations

## Invalidate data after mutations

## Optimistic updates
