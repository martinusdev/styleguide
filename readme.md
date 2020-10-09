# Martinus LB styleguide

Styleguide for [Martinus](https://www.martinus.sk), designed and created by [Lighting Beetle
](https://github.com/lightingbeetle).

> Light is backbone for living styleguides.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Install](#install)
- [Features](#features)
- [Usage](#usage)

## Prerequisites

* [Node.js](http://nodejs.org/) `>= 6.9.0`  
* [Yarn](https://yarnpkg.com/)  

## Install

Installation process:
1. Clone this repository  
2. Run `yarn install` to install dependencies (alternative is `npm install` if you don't use `yarn`)  

## Features

Build process is powered by `light-scripts` ( [docs](https://github.com/lightingbeetle/light-scripts))

## Usage

* For project development with live-reload run:
```
gulp serve
```

* To build project run: (Result will be in `dist/` folder.)
```
gulp build [--force]
```

* To serve built project run:
```
gulp serve:dist
```

[![Lighting Beetle](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Lighting Beetle")](http://www.lbstudio.sk)
