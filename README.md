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

### etym.getEtym(word)

Fetch etymology information of a word in an asynchronized way. It returns a Promise which resolves the array of etymology information.

```javascript
const etym = require('en-etym')

etym.getEtym('glitter').then(etymList => console.log(JSON.stringify(etymList)))
// [{"title":"glitter (v.)","etymDict":{"Old Norse":["glitra"],"Proto-Germanic":["*glit-"],"Old English":["glitenian"],"PIE":["*ghleid-","*ghel-"],"Greek":["khlidon"]}}]
```

### etym.getEtymSync(word, callback)

Fetch etymology information of a word in a synchronized way. The argument of the callback function is the array of etymology information.

```javascript
const etym = require('en-etym')

etym.getEtymSync('glitter', etymList => console.log(JSON.stringify(etymList)))
// [{"title":"glitter (v.)","etymDict":{"Old Norse":["glitra"],"Proto-Germanic":["*glit-"],"Old English":["glitenian"],"PIE":["*ghleid-","*ghel-"],"Greek":["khlidon"]}}]
```
