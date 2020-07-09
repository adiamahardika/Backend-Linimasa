const { port } = require('./src/configs')
const express = require('express')
const app = express()
const logger = require('morgan')
const bodyParser = require('body-parser')

app.listen(port, () => console.log(`This Server is running on port ${port}`))

app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))