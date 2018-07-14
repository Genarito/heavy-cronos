# Cronos

Simple and ultra light tool to prevent multiple heavy function calls in short time intervals.

## Introduction

At work I faced (multiple times) issues on performance caused by multiple heavy function calls (user click many times on same button, async functions that excecute at the same time, several continuous events calls, etc). 

That's why I write this simple library, problem solved.

## Instalation

> npm i heavy-cronos --save

Or if you're using Yarn

> yarn add heavy-cronos

## Usage

```javascript
import { Cronos } from '../Cronos';

let cronos = new Cronos(() => {
    console.log('It works!');
    // Very HEAVY task that we don't want
    // to execute 40 times a second
    // [...]
}, 3000, 'avoid');

cronos.run(); // Prints 'It works!'
cronos.run(); // Waits for 3 seconds
cronos.run(); // It will be ignored
cronos.run(); // It will be ignored
cronos.run(); // It will be ignored
cronos.run(); // It will be ignored

setTimeout(function () {
    console.log("We have waited for 4 seconds!");
    cronos.run(); // Prints 'It works!'
    cronos.run(); // It will be ignored
}, 4000);
```
**There are 3 samples for every possible method: 'avoid', 'once' and 'every' in 'samples' folder**

## API

constructor(functionToExcecute, timeToWait, method)

Name | Type | Required | Description
--- | --- | --- | ---
functionToExcecute | Function | **YES** | Function to excecute when time was met
timeToWait | number | **YES** | Time to wait (miliseconds) to prevent excecutions
method | string | **NO** | Possible values: 'avoid', 'once', 'every' to prevent excecute function if time was not met, execute once when time is reached, or excecute as many times as run() was called when time is reached. Default: **'avoid'**