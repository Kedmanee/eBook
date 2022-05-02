const express = require("express")
var cors = require('cors')

const app = express();
app.use(cors())
// Statics
app.use(express.static('static'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const userRouter = require('./routes/user')
const ebookRouter = require('./routes/Ebook')
const indexRouter = require('./routes/index')

app.use(userRouter.router)
app.use(ebookRouter.router)
app.use(indexRouter.router)

app.listen(5000, () => {
  console.log(`Example app listening at http://localhost:5000`)
})