if (process.env.NODe_ENV !== 'production'){
  require('dotenv').parse()
}
const express =require('express');
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes')

const app = express();


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
})
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.group('Connected to mongoDB'))

app.use('/', indexRouter)


app.listen(process.env.PORT || 3000)