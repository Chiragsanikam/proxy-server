const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = 3000

app.use(cors())


//routes

app.use('/api', require('./routes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

