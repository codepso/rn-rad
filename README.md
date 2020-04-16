<h1 align="center">
  <img src="https://s3.us-east-2.amazonaws.com/codepso-comunity/react-init/rn-rad_108.png" alt="Codepso" width="645">
</h1>

# rn-rad
CLI for Rapid Application Development using React Native.
## Table of content
- [Requirements](#requirements)
- [Installation](#installation)
- [Commands](#commands)
- [License](#license)
## Requirements
You need the following requirements:
 - Node 8+
 - NPM & NPX
 - React Native CLI
## Installation
```bash
npm install -g @codepso/rn-rad
npm update -g @codepso/rn-rad
```
## Commands
```bash
rn-rad i packages
rn-rad i project
rn-rad g structure
rn-rad g component [name] [path]
rn-rad g screen [name] [path]
rn-rad g form [name] [path] [screen=true]
rn-rad help
rn-rad version
```
#### command: i packages
```bash
rn-rad i packages
cd ios && pod install
```
#### command: i project
Add theme, styles, images and helpers to RN project, rn-rad.config.js will be created
```bash
rn-rad g structure (it must be first)
rn-rad i project
```
## Architecture
- React Native 0.6.1+
- React Navigation 5+
- React Native Elements 1.2.0+
- Vector Icons 6
- Redux
- Yup
- Formik 
## License
The React Init is licensed under the terms of the GPL Open Source license and is available for free.
