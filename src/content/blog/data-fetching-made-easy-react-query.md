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

In this [Github repo](https://github.com/Rioba-Ian/data-fetching-react-query) I have two folders, finished and a starter project. To get upto speed with where I'll be starting you can clone the repo and

```bash
git clone https://github.com/Rioba-Ian/data-fetching-react-query

cd data-fetching-react-query

cd react-query-starter

```

After that:

```bash
npm install

npm run serve-json

npm run dev

```

open two terminal instances for running `npm run serve-json` and `npm run serve-json`

You should see your app in the browser as follows:

![project set up](https://res.cloudinary.com/drxurk7lu/image/upload/v1688739972/WhatsApp_Image_2023-07-07_at_5.25.46_PM_h7sihh.jpg)

## Basic queries and reusable query hooks

Fetching data with useEffect:

```jsx
useEffect(() => {
  axios
    .get("http://localhost:4000/movies")
    .then(res => {
      setData(res.data);
      setIsLoading(false);
    })
    .catch(error => {
      setError(error.message);
      console.log(error.message);
    });
}, []);
```

Using react query

```jsx
const fetchMoviesData = () => {
  return axios.get("http://localhost:4000/movies");
};

const { isLoading, data, isError, error } = useQuery(
  ["movies"],
  fetchMoviesData
);
```

The error handling in useEffect takes into account that axios uses `.catch()` promise which you'll resolve with your setError state. In react query, error handling is defined for you. You can break the url to get the error message in the browser.

You might also realize that react-query retries some couple of times before giving the error.

### React-query devtools

To install react query devtools:

```bash
npm i @tanstack/react-query-devtools
```

then in your App.jsx import and attach it just before closing the QueryClientProvider. You should see your ui with a dev tool.

### Caching and Stale time

In your network tab, throttle the connection to slow 3g or fast 3g. I like mine slow 3g to properly see the lag. Looking at the useeffect we see that if we go to another tab and back it takes longer as compared to the RQ list. This is because of caching. By default, react query caches the data for 5 minutes before it goes to stale. Becoming stale means that, react query will do a background fetch to get new data (incase the data response has been updated from the server.)

We can use the `isFetching` to see the data being refetched in the background once it has become stale.

```js
console.log({ isLoading, isFetching });
```

Update any value in your db.json and go back to your RQ movies, you will see the value changing. (If you are not on slow 3g it might happen so fast you won't see it).

Caching obsoletes the loading... indicator since the data is still present for our application. From the [react-query docs](https://tkdodo.eu/blog/practical-react-query) the creator explains why cachetime is better left as is and the staletime and refetch defaults are where we might change the refetching behaviour.

```jsx
const { isLoading, data, isError, error, isFetching } = useQuery(
  ["movies"],
  fetchMoviesData,
  {
    staleTime: 30000,
  }
);
```

Each time we go to rq-movies, we see a fetch being triggered in the network tab. We can override this so that it happens 3s after we've navigated to our page. It will also trigger a refetch after 30s. The default is 0 which means it will trigger a refetch once we get back to the route of our application.

### Other defaults

1. Refetch on mount.

React query will refetch everytime we go to our /rq-movies. It is set to true by default.

```jsx
...
   refetchOnMount: true,
   }
...
```

2. Refetch on Window focus

This set as true by default. What it means is that if we are on another application and come back to that window and data has changed, then it will always trigger a refetch on our data.
...
refetchOnWindowFocus: true,
}
...

## Polling data

Polling data means automatically refetching data at regular intervals. We can use the refetchInterval, by default it is set to false.

```jsx
  fetchMoviesData,
    {
      staleTime: 30000,
      refetchInterval: 2000,
    }
  );
```

If you look at the react-query devtools you'll see the data toggling between fetching and stale every two seconds.

N/B: The refetching stops once the window loses focus so if you want to override it, you can set the `refetchIntervalInBackground: true`

## Quering by ID

### Triggering a refetch

Before we trigger a refetch using a button we might want to override the fetching to be disabled until we click our button.

We can add the onClick handler `<button onClick={refetch}> Fetch Movie List</button>` and the refetch as part of the parameters to our fetchMoviesData.

### using custom query hooks

You can create a folder called hooks and create a new file useMoviesData.js. And in the file our logic before from RQMoviesPage would be:

```jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMoviesData = () => {
  return axios.get("http://localhost:4000/movies");
};

const useMoviesData = () => {
  return useQuery(["movies"], fetchMoviesData, {
    enabled: false,
  });
};

export default useMoviesData;
```

and then we would just call useMoviesData in our RQMoviesPage.

### By Id

We will first need to route to each movie page. I've set up a new route `/rq-movie/:movieId` and in our new RQMoviePage.jsx

```js
import useMovieData from "../hooks/useMovieData";
import { useParams } from "react-router-dom";

export default function RQMoviePage() {
  const movieId = useParams().movieId;
  const { data, isError, error, isFetching, isLoading } = useMovieData(movieId);

  if (isLoading && isFetching) {
    return <h2>Loading ...</h2>;
  }

  if (isError) {
    return <p>Error in fetching data {error}</p>;
  }

  return (
    <div>
      <h2>Movie name: {data?.data.name}</h2>
      <p>Producer: {data?.data.producer}</p>
    </div>
  );
}
```

The new custom hook for fetching a single movie is as follows:

```js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMovieData = movieId => {
  return axios.get(`http://localhost:4000/movies/${movieId}`);
};

const useMovieData = movieId => {
  return useQuery(["movie", movieId], () => fetchMovieData(movieId));
};

export default useMovieData;
```

### Paginated queries

You can go to our localhost:4000 and add put in the following query:
http://localhost:4000/series?\_limit=2&\_page=2, by changing the limit and the page number we paginate between the data. I've created a new component called PaginatedQueries.jsx where we shall paginate the data.

First if we want to display the whole data we can do so by

```jsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSeries = () => {
  return axios.get(`http://localhost:4000/series`);
};

export default function PaginatedQueries() {
  const { data, isLoading, isError, isFetching, error } = useQuery(
    ["colors"],
    fetchSeries
  );

  if (isLoading && isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <h2>Series</h2>
      {data?.data.map(serie => (
        <ul key={serie.id}>
          {serie.id}. {serie.name}
        </ul>
      ))}
    </div>
  );
}
```

In order to paginate we can use state to help us in changing the query key.

```jsx
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

const fetchSeries = pageNumber => {
  return axios.get(`http://localhost:4000/series?_limit=2&_page=${pageNumber}`);
};

export default function PaginatedQueries() {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isError, isFetching, error } = useQuery(
    ["series", pageNumber],
    () => fetchSeries(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  data;

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        <h2>Series</h2>
        {data?.data.map(serie => (
          <ul key={serie.id}>
            {serie.id}. {serie.name}
          </ul>
        ))}
      </div>

      <div>
        <button
          onClick={() => setPageNumber(page => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>
        <button
          onClick={() => setPageNumber(page => page + 1)}
          disabled={pageNumber === 5}
        >
          Next Page
        </button>
      </div>

      {isFetching && "Loading"}
    </>
  );
}
```

## Updating data through mutations

### Invalidate data after mutations

## Optimistic updates
