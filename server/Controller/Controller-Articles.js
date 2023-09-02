const express = require('express');
const router = express.Router();
const { mongoose } = require('mongoose');
const PostArticles = require('../models/article.js');








const GetArticleData = async (req,res)=>{

     try {

         //we use await to open it asyncronously
        const postArticles = await PostArticles.find();

        console.log('From Controller Server Route this is the model');
        console.log('Model Sent and Created SuccessFuly');
        res.status(200).json(postArticles);
        res.setHeader('Alfa', 'Beta');
        
    } catch (error) {
        console.log("ERROR IN GETTING DATA IN THE MONGO DB");
        console.log(error);
        //this will return the error
        res.status(404).json({message: error.message});
    }
    
    };



// This is the Logic For adding The data
// This is async because we are fetching data and it will take time 
const CreateArticle = async (req,res)=>{
    //with post request we have access to the body
    // The req.body will be our new post so we name it as post
    let newPost = new PostArticles({ content: req.body.content, authorId: req.body.authorId, authorName: req.body.authorName,  article: req.body.article});
    
    //this is where we match the new post into the new database model and pass it to the MongoDD

    try {

        console.log("SUCCESSFUL TRANSFER OF DATA TO THE SERVER");
        console.log('Waiting to transefer data to the DataBase...');
        // This is async because we are fetching data and it will take time
        //If the data is successfully transfered to the server
        //we pass in the new post to pass it to the MongoDD
        await newPost.save();

        // learn more about httpStatus Code here
        // restapitutorial.com/httpstatuscodes.html
        res.status(200).json(newPost);
        
        console.log(newPost);
        
    } catch (error) {
        console.log("ERROR IN SENDING DATA TO THE SERVER");
        res.status(409).json({message: error.message});
    }




    //res.send('POST CREATION')
    
    };


    //GetContentsByAuthorId
    const GetContentsByAuthorId = async  (req, res) => {
        
        try{
            const articlesData = await PostArticles.find();
            const filteredData = articlesData.filter(article => article.authorId === req.params.authorId);
            res.json(filteredData);
            //console.log('Success All articles Found');
        }catch{
            console.log('Failure No article found');
            //it will send a 400 status code and show in the client side
            // a json file containing a message(msg)
            res.status(400).json({
                msg: `member not Found ${req.params.authorId}`
            });

        }
       //console.log('End');
        
    
    };

    const GetContentsByArticlePosition = async  (req, res) => {
        
        try{
            const articlesData = await PostArticles.find();
            const filteredData = articlesData.filter(article => article.articlePosition === req.params.articlePosition);
            res.json(filteredData);
            console.log('Success All articles Found');
        }catch{
            console.log('Failure No article found');
            //it will send a 400 status code and show in the client side
            // a json file containing a message(msg)
            res.status(400).json({
                msg: `member not Found ${req.params.authorId}`
            });

        }
       //console.log('End');
        
    
    };

    const GetArticles = async  (req, res) => {
        console.log('STARTING Section');
        console.log(req.params.section);
        const articlesData = await PostArticles.find();
        console.log(articlesData);
        const data = articlesData.some(article => article.article.section === req.params.section);
       
        if (data) {
            //this will respond to the client the out put of the data
            const filteredData = articlesData.filter(article => article.article.section === req.params.section);
            //const  actualData  = await PostAuthors.findById(filteredData[0]._id);
            res.json(filteredData);
            //console.log(actualData);
            // console.log(filteredData);
            console.log('Success All Section articles Found');
        } else {
            console.log('Failure No Section article found');
            //it will send a 400 status code and show in the client side
            // a json file containing a message(msg)
            res.status(400).json({
                msg: `member not Found ${req.params.authorId}`
            });
        }
        //console.log('End');
    
    };

    const GetArticle = async  (req, res) => {
        console.log('STARTING Article');
        const articlesData = await PostArticles.findById(req.params.id);
       
        if (true) {
            //this will respond to the client the out put of the data
            //const  actualData  = await PostAuthors.findById(filteredData[0]._id);
            res.json(articlesData);
            //console.log(actualData);
            // console.log(filteredData);
            console.log('Success All Section articles Found');
            console.log(articlesData);
        } else {
            console.log('Failure No Section article found');
            //it will send a 400 status code and show in the client side
            // a json file containing a message(msg)
            res.status(400).json({
                msg: `member not Found ${req.params.id}`
            });
        }
        //console.log('End');
    
    };

    const UpdateArticle = async (req,res) => {
        try {
            const {id: _id } = req.params;
    
            const post = req.body;
        
            console.log("UPDATING POST...");
            //if(!mongoose.Types.ObjectId.isValid(_id)) {return res.status(404).send("NO POST ID")};
            const UpdatedArticle = await PostArticles.findByIdAndUpdate(_id, {...post, _id} , {new:true});
            console.log("UPDATED POST!");
            res.json(UpdatedArticle);
        } catch (error) {
            console.log(error);
        }
       
    };






    const DeleteArticle = async (req,res) => {
        try{
            const {id} = req.params;
    
            //NOt sure how it works
            res.json({message: 'Post Deleting'});
            console.log('POST DELETING');
            await PostArticles.findByIdAndRemove(id);
            //if(!mongoose.Types.objectId.isValid(id)) {return res.status(404).send("NO POST ID")};
            console.log('POST DELETED');
            
            res.json({message: 'Post Deleted Successfully'});
        
        }catch(error){
            console.log(error);
    
        }
    }
    
    
    
    
    



// ////////////////////////////////////////////////////////////////////
const multer = require("multer");
// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("serverWorrking1")
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");


const UploadFiles = async  (req, res) => {
    console.log('STARTING');
    upload(req, res, err => {
        if (err) {
            console.log(err);
            return res.json({ success: false, err });
            
        }
        
        return res.json({ success: true, url: req.file.path, fileName: res.req.file.filename });
    });
    //console.log('End');

};
///////////////////////////////////////////////////////////////////////////






















module.exports = {
        CreateArticle,
        GetArticleData,
        GetContentsByAuthorId,
        GetArticles,
        GetArticle,
        UploadFiles,
        DeleteArticle,
        UpdateArticle,
        GetContentsByArticlePosition
    }
