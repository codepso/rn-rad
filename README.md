# rn-rad
CLI for Rapid Application Development using React Native.

[![npm Package](https://img.shields.io/npm/v/@codepso/rn-rad)](https://www.npmjs.org/package/@codepso/rn-rad)
[![downloads per month](http://img.shields.io/npm/dm/@codepso/rn-rad.svg)](https://www.npmjs.org/package/@codepso/rn-rad)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<h1 align="center">
  <img src="https://codepso-comunity.s3.us-east-2.amazonaws.com/rn-rad/rn-rad-h-5.jpg" alt="Codepso" width="900">
</h1>

## Table of content
- [Requirements](#requirements)
- [Installation](#installation)
- [Commands](#commands)
- [Packages](#packages)
- [License](#license)
## Requirements
You need the following requirements:
 - node 10+
 - npm & npx
 - react native cli
## Installation
```bash
npm install -g @codepso/rn-rad
npm update -g @codepso/rn-rad
```
## Commands
```bash
Initializers (i)
rn-rad i packages [redux=true]
rn-rad i structure [redux=true]
rn-rad i project [resources=true]

Generators (g)
rn-rad g component [name] [path=d]
rn-rad g screen [name] [path=d]
rn-rad g form [name] [path=d] [screen=true]

About
rn-rad help
rn-rad version
```
#### command: i packages
install the most used [packages](#packages) and pod's (ios)

--redux (-r) Flag to indicate if a redux packages are added, default: true

```bash
rn-rad i packages
rn-rad i packages --redux false
rn-rad i packages -r false
```
#### command: i structure [options]
Create the directory structure

--redux (-r) Flag to indicate if a redux directory is added, default: true

```bash
rn-rad i structure
rn-rad i structure --redux false
rn-rad i structure -r false
```
<h1>
  <img src="https://codepso-comunity.s3.us-east-2.amazonaws.com/rn-rad/rn-rad-s-3.jpg" alt="Codepso">
</h1>

#### command: i project [options]
Add theme, styles, images and helpers to RN project, rn-rad.config.js will be created<br/>
Note: i structure (it's required)

--resources (-r) Flag to indicate if a resources are added, default: true

```bash
rn-rad i project
rn-rad i project --resource false
rn-rad i project -r false
```  
## Packages
- React Native 0.6.1+
- React Navigation 5+
- React Native Elements 1.2.0+
- Vector Icons 6
- Redux
- Yup
- Formik 
## License
The React Init is licensed under the terms of the GPL Open Source license and is available for free.
