const openbrowser = require('open');
const express = require('express');
const app = express()
const port = 4444

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
  openbrowser(`http://localhost:${port}`)
})