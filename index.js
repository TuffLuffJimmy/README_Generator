// Required node packages
const axios = require('axios')
const chalk = require('chalk')
const { readFile, writeFile } = require('fs')
const inquirer = require('inquirer')
const { promisify } = require('util')

// modifies readFile and writeFile to make them promise based
const writeFileSync = promisify(writeFile)
const readFileSync = promisify(readFile)


// the questions the user will be presented with. answers are collected
inquirer.prompt([
  {
    type: 'input',
    message: 'What is your GitHub username?',
    name: 'username'
  },
  {
    type: 'input',
    message: 'What is this project called?',
    name: 'projectTitle'
  },
  {
    type: 'input',
    message: 'Describe the project',
    name: 'description'
  },
  {
    type: 'input',
    message: 'Installation instructions:',
    name: 'install'
  },
  {
    type: 'input',
    message: 'List any usage requirements or stipulations',
    name: 'usage'
  },
  {
    type: 'input',
    message: 'License information:',
    name: 'license'
  },
  {
    type: 'input',
    message: 'Contributing...',
    name: 'contribute'
  }
])
  .then(answers => {
    console.log(answers)
    writeMD(answers)
    callGitHub(answers.username)

  })
  .catch(err => {
    console.log(err)
  })

// use username to call github api for user information
function callGitHub (usr) {
  const userObject = axios.get(`https://api.github.com/users/${usr}`)
  console.log(userObject)
}

function writeMD (answer) {
  const { username, projectTitle, description, install, usage, license, contribute } = answer
  const template = `
# ${projectTitle}
## Description
>${description}
## Table of Contents
*[Installation](*installation)
*[Usage](*usage)
*[License](*license)
*[Contribute](*contribute)
*[Credits](*credits)

## Installation
>${install}
## Usage
>${usage}
### License
>${license}
#### Contribute
>${contribute}
  `
  writeFileSync('READ2ME.md', template)
}