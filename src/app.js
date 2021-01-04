const express = require('express')
const routes = require('./routes')
const cookieParser = require('cookie-parser')
const compress = require('compression')
const methodOverride = require('method-override')
const helmet = require('helmet')
const cors = require('cors')
const app = express()
const expressLogger = require('./config/winston/express')()

// parse body params and attache them to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(methodOverride())

// logs
app.use(expressLogger)

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Shari
app.use(cors())

app.use(routes)

app.listen(3333, () => {
  console.log('🚀️ Backend started! - 5000')
})

module.exports = app
