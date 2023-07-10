---
title: Developing a Dashboard using Typescript, HTML and CSS
author: Rioba Ian
pubDatetime: 2023-05-02T03:42:51Z
postSlug: how-to-use-typescript-with-html-css-to-build-dashboard
featured: false
draft: false
tags:
  - html/css
  - frontend-mentor
  - js
  - typescript
  - beginners
ogImage: https://res.cloudinary.com/drxurk7lu/image/upload/v1683227129/time-tracking-dashboard_at9yhu.png
description: How I approached the FEM dashboard application using Typescript
---

My experience in using Typescript for the dashboard time tracker frontend mentor challenge.

_You can use the table of contents to jump straight to the [main Content](#dashboard)._

## Table of contents

## Motivation

I have been learning typescript for a while and I considered a project which would get my hands on the keyboard trying out stuff in a new way. I wanted a project which required dom manipulation as I would now use typescript instead of the usual Javascript. The [live application](https://rioba-ian.github.io/time-tracking-dashboard-main/).

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

We have a sidebar which has links to toggle content for daily, weekly and monthly. Each card will hold the title, the current selected time in the sidebar and it's previous time.

That means that based on the **e.target.value** of the sidebar we shall have to change the **textContent** of each of the cards.

In JS, this can be achieved through normal DOM manipulation but since we are using typescript -- declaring types, we have to define interfaces for current/previous timeframe, the daily/weekly/monthly timeframes and the data itself.

We also need to define the initial state which will be the default one.

```ts
let state: string = "Daily";
```

### Defining Types

We shall define three interfaces below, which I shall explain afterwards

```ts
interface Timeframe {
  current: number;
  previous: number;
}

interface Timeframes {
  daily: Timeframe;
  weekly: Timeframe;
  monthly: Timeframe;
}

interface Data {
  title: string;
  timeframes: Timeframes;
}

// our json data will have type Data
type myData = Data[];
```

Above we see that we are mirroring the **data.json** single object that will be mapped. Destructuring a single object, to the last children are the current and previous types which are numbers, we call them Timeframe (the specfic time).

Timeframes has three keys: daily, weekly and monthly which are of type Timeframe (current or previous). Following this analogy, we get to the parent object Data which has the title - a string and the timeframes.

It is important to mention that when defining the datatypes e.g

```ts
interface Data {
  title: string;
  timeframes: Timeframes;
}
```

timeframes should be exactly how our **data.json** has been defined. Same goes to the other keys in our interfaces.

### DOM Manipulation

Manipulating the DOM is exactly like in js with a slight variation. Again let me show us the code and then explain a bit.

The single card which holds the skeleton structure for inserting our data.

```html
<div class="card">
  <div class="img-container">
    <img
      src="./images/icon-work.svg"
      alt="briefcase to showcase hours of work"
    />
  </div>
  <div class="card-row">
    <div>
      <p>Work</p>
      <img src="./images/icon-ellipsis.svg" alt="three icons for menu" />
    </div>
    <div class="card-row--content">
      <h2>32hrs</h2>
      <span>Last Week - 36hrs</span>
    </div>
  </div>
</div>
```

Grabbing the elements

```ts
const navLinks = document.querySelectorAll(".links-section li");
const cardRowTitle = document.querySelectorAll(".card-row p");
const cardHours: NodeListOf<Element> = document.querySelectorAll(
  ".card-row--content h2"
);
const cardHistory: NodeListOf<Element> = document.querySelectorAll(
  ".card-row--content span"
);
```

In the first part, you can guess that we are targeting the sidebar list items for **daily/weekly/monthly**. After that we grab all paragraphs that will match the Data interface and then content for holding the previous timeframes.

I bet the most complicated part is using

```ts
...
NodeListOf<Element> = document.querySelectorAll()
...
```

Because we are targeting a nodelist and intending to loop over it and change the content of every one of its items. It gives us a nodelist instead of an array which we can then manipulate directly.

The next thing we need to do is:

1. fetch the data
2. add event listener to change the state based on the value.
3. Based on the state, we change the hours and the previous timeframes.

#### Data fetching

I recommend using fetch and since the project has already been uploaded to github; to use the raw.githubusercontent. In short, to use github as your storage location.

```ts
const res = await fetch(
  "https://raw.githubusercontent.com/Rioba-Ian/time-tracking-dashboard-main/master/script/data.json"
);
const myData: myData = await res.json();
```

We can then change the titles for each card. I won't go over that since it's not a requirement.

#### Listen for click events on sidebar nav

```ts
navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const value = (e.target as HTMLLIElement).textContent;

      if (value === "Weekly") state = value;
      else if (value === "Monthly") state = value;
      else if (value === "Monthly") state = value;
      else state = "Daily";

      ...
```

We are looping using a forEach JS method for all the links and listening for click events. If the value matches what we need to change state, we change it or else it remains as daily.

The rest of the code is:

```ts
navLinks.forEach((link) => {
    ...

      switch (state) {
        case "Weekly":
          for (let i = 0; i < cardHours.length; i++) {
            cardHours[
              i
            ].textContent = `${myData[i].timeframes.weekly.current} hrs`;
            cardHistory[
              i
            ].textContent = `Last Week - ${myData[i].timeframes.weekly.previous}hrs`;
          }
          break;
        case "Monthly":
          for (let i = 0; i < cardHours.length; i++) {
            cardHours[
              i
            ].textContent = `${myData[i].timeframes.monthly.current} hrs`;
            cardHistory[
              i
            ].textContent = `Last Month - ${myData[i].timeframes.monthly.previous}hrs`;
          }
          break;
        default:
          for (let i = 0; i < cardHours.length; i++) {
            cardHours[
              i
            ].textContent = `${myData[i].timeframes.daily.current} hrs`;
            cardHistory[
              i
            ].textContent = `Yesterday - ${myData[i].timeframes.daily.previous}hrs`;
          }
          break;
      }
    });
  });
```

If we match a particular state we want to change the hours displayed and the previous timeframe's time. We use a for loop to chnage the textContent of the hours and the history timeframe. I've used a switch statement to make the code more readable. And that's all.

## Conclusion

Properly diving in into typescript is easier with small projects first and then bigger projects. I hope you've gotten some insight into using typescript for your html/css/js project. Let me leave you with a typescript mantra - _You type more and catch errors faster; a huge productivity boost_.

You can check me out on twitter and ask me any questions on my [Twitter](https://twitter.com/rioba_riri)
