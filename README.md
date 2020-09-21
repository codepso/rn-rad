# rn-rad
CLI for React Native, boilerplates and generators. Rapid Application Development (RAD) model for React Native.

[![npm Package](https://img.shields.io/npm/v/@codepso/rn-rad)](https://www.npmjs.org/package/@codepso/rn-rad)
[![downloads per month](http://img.shields.io/npm/dm/@codepso/rn-rad.svg)](https://www.npmjs.org/package/@codepso/rn-rad)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<h1 align="center">
  <img src="https://codepso-comunity.s3.us-east-2.amazonaws.com/rn-rad/rn-rad-h-1.jpg" alt="Codepso" width="900">
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
rn-rad g component [name] [path]
rn-rad g screen [name] [path]
rn-rad g form [name] [path] [screen=true]

About
rn-rad help
rn-rad version
```
#### command: i packages [options]
install the most used [packages](#packages) and pod's (ios)

- --redux (-r) Flag to indicate if a redux packages will be added, default: true
- --lang (-l) Flag to indicate if languages packages will be added, default: true

```bash
rn-rad i packages
rn-rad i packages --redux false
rn-rad i packages -r false

rn-rad i packages --lang false
rn-rad i packages -l false
```

##### Icons
ios/AwesomeProject/info.plist
```bash
<key>UIAppFonts</key>
<array>
  <string>MaterialCommunityIcons.ttf</string>
  <string>MaterialIcons.ttf</string>
</array>
``` 

android/app/build.gradle
```bash
project.ext.vectoricons = [
    iconFontNames: ['MaterialIcons.ttf', 'MaterialCommunityIcons.ttf']
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```  

#### command: i structure [options]
Create the directory structure

- --redux (-r) Flag to indicate if redux directory will be added, default: true
- --lang (-l) Flag to indicate if i18n directory will be added, default: true

```bash
rn-rad i structure
rn-rad i structure --redux false
rn-rad i structure -r false

rn-rad i structure --lang false
rn-rad i structure -l false
```
<h1>
  <img src="https://codepso-comunity.s3.us-east-2.amazonaws.com/rn-rad/rn-rad-s-3.jpg" alt="Codepso">
</h1>

#### command: i project [options]
Add a theme, styles, images and helpers to RN project, rn-rad.config.js will be created<br/>
Note: i structure (it's required)

- --resources (-r) Flag to indicate if the resources will be added, default: true

```bash
rn-rad i project
rn-rad i project --resource false
rn-rad i project -r false
```  

#### command: g theme [name]
Create a new theme (styles, colors)
 
- name: theme name (use kebab-case)

```bash
rn-rad g theme
rn-rad g theme codepso
```  

#### command: g screen [name] [options]
Create a screen

- name: Screen name (use UpperCamelCase)<br/>
- --path (-p): Flag to indicate the path where it will be created, default: src/screens

```bash
rn-rad g screen
rn-rad g screen Welcome
rn-rad g screen Welcome --path src/screens/home
rn-rad g screen Welcome -p src/screens/home
```  

#### command: g component [name] [options]
Create a component

- name: Component name (use UpperCamelCase)<br/>
- --path (-p) Flag to indicate the path where it will be created, default: src/components

```bash
rn-rad g component
rn-rad g component Footer
rn-rad g component Footer --path src/ui
rn-rad g component Footer -p src/ui
```  

#### command: g form [name] [options]
Create a form<br/>
Require: yup, formik.

- name: Form name (use UpperCamelCase)<br/>
- --path (-p) Flag to indicate the path where it will be created, default: src/forms
- --view (-v) Flag to indicate if the view will be created, default: true

```bash
rn-rad g form
rn-rad g form User

rn-rad g form User --path src/forms/user
rn-rad g form User -p src/forms/user

rn-rad g form User --view false
rn-rad g form User -v false

rn-rad g form User -p src/forms/user -v false
```  

## Packages
- React Native 0.6.1+
- React Navigation 5+
- React Native Paper 3.10+/4
- Vector Icons 6
- Redux
- Yup
- Formik
- React Native Localize
- i18n js
- React Native Helper
## License
The React RAD is licensed under the terms of the GPL Open Source license and is available for free.
