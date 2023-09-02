const mongoose = require('mongoose');

//Schema is the pattern of our database
//Right now We are creating our database pattern
const postSchema = mongoose.Schema({
    //Personal Info
    firstName: String,
    lastName: String,
    bio:String,
    email: String,
    number: String,
    state: String,
    profilePic: String,
    //Management
    password: String,
    authorId: String,
    referralCode: String,
    emailBox:{
        inbox:[Object]
    },
    //Authority
    sectionAccess:[String],
    authorityLevel:String,

});
//This will turn our (schema ) pattern into a model
const PostAuthors = mongoose.model('PostAuthors',postSchema);

module.exports = PostAuthors;