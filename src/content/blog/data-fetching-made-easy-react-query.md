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

In this article I'll be covering important ways that you can better fetch your data in a react application while having less work in handling state and other functionalities such as retrying requests, caching, polling, deduping, mutations, inifinite scrolling and many more. React query is not only a state management tool but a productivity tool in your react application which you should start using if you are not using it.

_You can use the table of contents to jump straight to the [main Content]()._

## Table of contents

## Motivation

React has no say on how you would like to fetch your data from the backend. You can use the `fetch` method or a library like `axios` to handle fetching of your data. We can take a look at the following data just for a comparison.

## Comparing fetching using useEffect and React query

### How does useEffect really work
