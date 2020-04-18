<h1 align="center">
  <img src="https://codepso-comunity.s3.us-east-2.amazonaws.com/rn-rad/rn-rad-h.jpg" alt="Codepso">
</h1>

# rn-rad
CLI for Rapid Application Development using React Native.
## Table of content
- [Requirements](#requirements)
- [Installation](#installation)
- [Commands](#commands)
- [Packages](#packages)
- [License](#license)
## Requirements
You need the following requirements:
 - Node 10+
 - NPM & NPX
 - React Native CLI
## Installation
```bash
npm install -g @codepso/rn-rad
npm update -g @codepso/rn-rad
```
## Commands
```bash
rn-rad i packages [redux=true]
rn-rad i structure [redux=true]
rn-rad i project
rn-rad g component [name] [path]
rn-rad g screen [name] [path]
rn-rad g form [name] [path] [screen=true]
rn-rad help
rn-rad version
```
#### command: i packages
install the most used [packages](#packages) and pod's (ios)
```bash
rn-rad i packages
```
#### command: i structure
Create the directory structure
```bash
rn-rad i structure
```
<h1 align="center">
  <img src="https://codepso-comunity.s3.us-east-2.amazonaws.com/rn-rad/rn-rad-s-1.jpg" alt="Codepso">
</h1>

#### command: i project
Add theme, styles, images and helpers to RN project, rn-rad.config.js will be created
```bash
rn-rad i structure (it must be first)
rn-rad i project
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
