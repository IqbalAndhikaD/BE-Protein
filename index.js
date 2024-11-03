const express = require('express')
const setUp = express()
const port = 3523

setUp.get('/', (req, res) => {
    res.send('Welcome to LMS')
})

setUp.listen(port, () => {
    console.log(`Server berjalan pada http://localhost:${port}`)
} )