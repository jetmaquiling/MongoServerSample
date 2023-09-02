const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema is the pattern of our database
//Right now We are creating our database pattern
const postSchema = mongoose.Schema({
        article:{
            title:String,
            titlePic:String,
            subTitle:String,
            section:String,
            tags: String,
            description: String,
            urlImage: String,
            authorName:String
        },
        content: {
            type:String,
        },
        authorId: {
            type: String,
            ref: 'User'
        },
        articlePosition: String,
        createdAt:{
            type: Date,
            default: new Date()
        },
});
//This will turn our (schema ) pattern into a model
const PostArticles = mongoose.model('PostArticles',postSchema);

module.exports = PostArticles;