# react-session-dynamodb

> A session management component in React that uses dynamodb as the backend.

[![NPM](https://img.shields.io/npm/v/react-session-dynamodb.svg)](https://www.npmjs.com/package/react-session-dynamodb) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Note

This component is under active development. Expect frequent updates.

## Overview

This component provides the session management functionality in the superflows architecture. 

### About Authentication in Superflows

Authentication in superflows is token based. User signs in using email and otp. After successful sign in, a token is generated, stored in the dynamodb and returned to the client side, where it is then encrypted and stored in the local storage. As long as the token present in local storage is valid in dynamodb, the user stays logged in.

### Session management

Job of this session management module is to check the validity of the client side token and to return the status as true or false. It does so, by polling the backend (dynamodb) continuously at a configurable time interval (default interval being 15 seconds).


## Install

```bash
npm install --save react-session-dynamodb
```

## Usage

```jsx
import React from 'react'

import { Session } from 'react-session-dynamodb'
import 'react-session-dynamodb/dist/index.css'

const App = () => {

  function onSessionCheck(result) {
    console.log('session check result', result);
  }

  return (
  
    /*
      
      interval: polling duration
      onSessionCheck: callback function
      awsRegion: aws region
      awsSecret: aws secret
      awsKey: aws access key
      email: email address (from local storage)
      token: token (from local storage)

    */

    <Session 
      interval={15000}
      onSessionCheck={onSessionCheck}
      awsRegion="awsRegion"
      awsSecret="awsSecret"
      awsKey="awsKeyu"
      email="hru************@**ail.com"
      token="980c914d-6242-4aec-9b2c-c24b050519db"
        />

  )
}

export default App

```

## Tests


PASS src/index.test.js (13.854s)
- ✓ Render, no token on server (3021ms)
- ✓ Render, token mismatch with server (3004ms)
- ✓ Render, token match with server (3006ms)
- ✓ Render, no local token (3005ms)

-------------|----------|----------|----------|----------|-------------------|
File         |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-------------|----------|----------|----------|----------|-------------------|
All files    |    89.19 |    81.82 |    90.91 |    88.24 |                   |
 index.js    |    95.65 |       85 |      100 |    95.24 |                33 |
 services.js |       25 |      100 |        0 |       25 |           7,14,15 |
 utils.js    |      100 |       50 |      100 |      100 |                16 |
-------------|----------|----------|----------|----------|-------------------|
Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        15.262s
Ran all test suites.


## License

MIT © [superflows-dev](https://github.com/superflows-dev)
