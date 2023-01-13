const mongoose = require('mongoose')
const usercollection = require('./data')

mongoose.connect('mongodb://localhost:27017/test2')
.then(()=>{console.log('Connected to db')})
.catch((err)=>{console.log(err)})