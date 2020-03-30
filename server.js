const path = require('path')
const express = require('express')
const PORT = 3000 || process.env.PORT

const app = express()

app.use(express.static(path.join(__dirname,'public')))

app.listen(PORT,() => console.log(`Server started running on port ${PORT}`)) 

