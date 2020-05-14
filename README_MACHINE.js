const axios = require('axios')
const chalk = require('chalk')
const {readFile, writeFile} = require('fs')
const { promisify } = require('util')

const writeFileSync = promisify(writeFile)
const readFileSync = promisify(readFile)
