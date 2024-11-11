const express = require('express')
const cors = require(cors)
const noteRoutes = require('./routes/noteRoutes');

const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/notes', noteRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
