const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./routes/router.js')

//This is our router
const app = express();


app.use(bodyParser.json({limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true }));
app.use(cors());

app.use('/', router );
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;

const  uri = 'mongodb+srv://potos:Pearloftheorientseas@cluster0.pvukg.mongodb.net/<dbname>?retryWrites=true&w=majority'
//this is how to connect to the database
//we pass in two parameters in the mongoose.connect
//first the MongoDB link and the options 
// if we dont pass in this options there will be possible errors
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true})
    //This will return a Promise
    // now we will run ourserver with the access of the database
    .then(()=> app.listen(PORT, ()=> console.log(`SERVER RUNNING WITH MONGO.DB AND PORT ${PORT}`)))
    // if error
    .catch((error)=> console.log(error.message));

//it makes sure there is no warning in the future
mongoose.set('useFindAndModify', false);