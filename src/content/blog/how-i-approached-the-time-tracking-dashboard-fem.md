---
title: Developing a Dashboard using Typescript, HTML and CSS
author: Rioba Ian
pubDatetime: 2023-05-02T03:42:51Z
postSlug: how-to-use-typescript-with-html-css-to-build-dashboard
featured: true
draft: false
tags:
  - frontend-mentor
  - js
  - typescript
ogImage: https://res.cloudinary.com/drxurk7lu/image/upload/v1683227129/time-tracking-dashboard_at9yhu.png
description: How I approached the FEM dashboard application using Typescript
---

My experience in using Typescript for the dashboard time tracker frontend mentor challenge.

## Table of contents

## Motivation

I have been learning typescript for a while and I considered a project which would get my hands on the keyboard trying out stuff in a new way. I wanted a project which required a lot of dom manipulation as I would now use typescript. The [live application](https://rioba-ian.github.io/time-tracking-dashboard-main/).

## Overview of the project

![Time tracking dashboard on desktop](/fem-dashboard/time-tracking-dashboard.png)

The project on desktop

![Time tracking dashboard on desktop](/fem-dashboard/time-tracking-dashboard-mobile.png)

The project on mobile

## Typescript

To get up and running with typescript we would need to install it globally:

```bash
npm install -g typescript
```

or

```bash
yarn install -g typescript
```

After that it would be to set up a tsconfig that helps in controlling the compilation of the typescript to js. In the project folder run:

```bash
tsc --init
```

After that, it will generate a **tsconfig.json**.

In the config file the most important settings to uncomment would be the following:

```json
{
    "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "outDir": "public/js"
        "rootDir": "src",
        "strict": true,
        "esModuleInterop": true
        "forceConsistentCasingInFileNames": true
    },
    "include": ["src"]
}
```

Let me explain a bit on the outDir, rootDir and include; the outDir is the specific folder in which the js shall be compiled to, the rootDir is where your typescript files are located and **"include": ["src"]** will mean that **.ts** files that exist in src are the ones that shall be compiled. If you don't specify the **"include": ["src"]** then it will compile every **.ts** in the whole project to js.

## HTML/CSS Styling

Because in this project my emphasis was to use typescript, I shall go directly on how I used typescript on making the dashboard data.

## Dashboard

The **data.json** looks as follows:

```json
[
  {
    "title": "Work",
    "timeframes": {
      "daily": {
        "current": 5,
        "previous": 7
      },
      "weekly": {
        "current": 32,
        "previous": 36
      },
      "monthly": {
        "current": 103,
        "previous": 128
      }
    }
  },
  ...
```

The first object will represent the
