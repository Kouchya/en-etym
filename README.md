# en-etym

[![Build Status](https://travis-ci.org/Kouchya/en-etym.svg?branch=master)](https://travis-ci.org/Kouchya/en-etym)

A tool for searching etymology of English words on https://www.etymonline.com/

## Installation

```
npm i en-etym
```

## Usage

```javascript
const etym = require('etym')

etym.getEtym('glitter', etymList => console.log(JSON.stringify(etymList)))
// [{"title":"glitter (v.)","etymDict":{"Old Norse":["glitra"],"Proto-Germanic":["*glit-"],"Old English":["glitenian"],"PIE":["*ghleid-","*ghel-"],"Greek":["khlidon"]}}]
```
