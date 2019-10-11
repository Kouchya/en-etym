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

etym.getEtym('glitter', etymList => console.log(etymList))
/* Output:
[ { title: 'glitter (v.)',
    etymDict:
    { 'Proto-Germanic': '*glit-',
      'Old English': 'glitenian',
      'Greek': 'khlidon' }
  } ]
*/
```
