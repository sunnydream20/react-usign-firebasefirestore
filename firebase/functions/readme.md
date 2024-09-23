# Firebase CLI and Emulator Suite Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js 18 and npm](https://nodejs.org/)

## Install Firebase CLI

First, install the Firebase CLI globally using npm:

```
npm install -g firebase-tools
```

## Log in to Firebase

Log in to your Firebase account using the CLI:

```
firebase login
```


## Create a `.env` File

Create a `.env` file in the `firebase` directory with the following environment variable:

```
FMP_API_KEY=YOUR_DEV_API_KEY
```

## install function deps

inside `firebase` directory install necessary dependencies to run the functions
```
npm install
```
## start emulator

```
firebase emulators:start
```

## use local emulators function url for baseAPI Url
in the app's root `.env` file add the following var
```
http://127.0.0.1:5001/dark-safeguard-369020/us-central1
```
ps: use your functions host:port if you decided to use custom ones

## start the app