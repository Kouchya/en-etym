# en-etym

[![Build Status](https://travis-ci.org/Kouchya/en-etym.svg?branch=master)](https://travis-ci.org/Kouchya/en-etym)

A tool for searching etymology of English words on https://www.etymonline.com/

## Installation

```
npm i en-etym
```

## Usage

```javascript
const etym = require('en-etym')
```

## API

### etym.getEtym

```typescript
(word: String) => Promise
```

Fetch etymology information of a word in an asynchronized way. The resolved value of the Promise is the array of etymology information.

```javascript
const etym = require('en-etym')

etym.getEtym('glitter').then(etymList => console.log(JSON.stringify(etymList)))
// [{"title":"glitter (v.)","etymDict":{"Old Norse":["glitra"],"Proto-Germanic":["*glit-"],"Old English":["glitenian"],"PIE":["*ghleid-","*ghel-"],"Greek":["khlidon"]}}]
```

### etym.getEtymSync

```typescript
(word: String, callback: (etymList: Array) => any) => void
```

Fetch etymology information of a word in a synchronized way. The argument of the callback function is the array of etymology information.

```javascript
const etym = require('en-etym')

etym.getEtymSync('glitter', etymList => console.log(JSON.stringify(etymList)))
// [{"title":"glitter (v.)","etymDict":{"Old Norse":["glitra"],"Proto-Germanic":["*glit-"],"Old English":["glitenian"],"PIE":["*ghleid-","*ghel-"],"Greek":["khlidon"]}}]
```
