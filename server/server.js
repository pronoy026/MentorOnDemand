const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const api = require('./routes/api')
const app = express()

app.use('/api', api) //routing the request to api when /api is entered in browser
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('The server is up and running')
})

app.listen(config.port_no, () => {
    console.log(`The server is running on port : ${config.port_no}`)
})