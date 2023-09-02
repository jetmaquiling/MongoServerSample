const express = require('express');
const router = express.Router();
const { mongoose } = require('mongoose');
const PostAuthors = require('../models/authors.js');

const GetAuthorData = async (req,res)=>{

     try {
         //we use await to open it asyncronously
        const PostAuthor = await PostAuthors.find();
        console.log('From Controller Server Route this is the model');
        console.log('All Authors Sent SuccessFuly');
        res.status(200).json(PostAuthor);
    } catch (error) {
        console.log("ERROR IN GETTING DATA IN THE MONGO DB");
        console.log(error);
        //this will return the error
        res.status(404).json({message: error.message});
    }
    
    };



// This is the Logic For adding The data
// This is async because we are fetching data and it will take time 
const CreateAuthor = async (req,res)=>{
    //with post request we have access to the body
    // The req.body will be our new post so we name it as post
    const post = req.body;
    
    //this is where we match the new post into the new database model and pass it to the MongoDD
    const newPost = new PostAuthors(post);

    try {

        console.log("SUCCESSFUL TRANSFER OF DATA TO THE SERVER");
        console.log('Waiting to transefer data to the DataBase...');
        // This is async because we are fetching data and it will take time
        //If the data is successfully transfered to the server
        //we pass in the new post to pass it to the MongoDD
        await newPost.save();

        // learn more about httpStatus Code here
        // restapitutorial.com/httpstatuscodes.html
        res.status(201).json(newPost);
        console.log(newPost);
        
    } catch (error) {
        console.log("ERROR IN SENDING DATA TO THE SERVER");
        res.status(409).json({message: error.message});
    }



    //res.send('POST CREATION')
    
    };



const SignInRequest = async  (req, res) => {
    console.log('STARTING');
    const memberData = await PostAuthors.find();
    const data = memberData.some(member => member.email === req.params.email);
    console.log(req.params.email);
    if (data) {
        //this will respond to the client the out put of the data
        const filteredData = memberData.filter(member => member.email === req.params.email);
        const  actualData  = await PostAuthors.findById(filteredData[0]._id);
        res.json(filteredData);
        console.log(actualData);
        console.log(filteredData);
        console.log('Success All member Found');
    } else {
        console.log('Failure No member found');
        //it will send a 400 status code and show in the client side
        // a json file containing a message(msg)
        res.status(400).json({
            msg: `member not Found ${req.params.id}`
        });
    }
    //console.log('End');

};

const DataRequest = async  (req, res) => {
    console.log('STARTING DataRequest');
    console.log(req.params.id);
    try {
       const  actualData  = await PostAuthors.findById(req.params.id);
       res.json(actualData );
       console.log(actualData);
       console.log('Success All member Found');
   } catch (error) {
        console.log(req.params.id);
       //this will return the error
       res.status(404).json({message: error.message});
       console.log('Failure No member found');
       //it will send a 400 status code and show in the client side
       // a json file containing a message(msg)
       res.status(400).json({
           msg: `member not Found ${req.params.id}`
       });
   }
   

};

const UpdateAuthorData = async (req,res)=>{
    try {
        const {id: _id } = req.params;

        const newData = req.body;
    
        console.log("UPDATING POST...");
        //if(!mongoose.Types.ObjectId.isValid(_id)) {return res.status(404).send("NO POST ID")};
        const updatedAuthors = await PostAuthors.findByIdAndUpdate(_id, {...newData, _id} , {new:true});
        console.log("UPDATED POST!");
    } catch (error) {
        console.log(error);
    }
   };

const DeleteAuthor = async (req,res)=>{
    try {
        const {id} = req.params;
        res.json({message: 'Post Deleting'});
        console.log('POST DELETING');
        await PostAuthors.findByIdAndRemove(id);
        //if(!mongoose.Types.objectId.isValid(id)) {return res.status(404).send("NO POST ID")};
        console.log('Author DELETED');
        res.json({message: 'Author Deleted Successfully'});
    } catch (error) {
        console.log(error);
    }
   };









module.exports = {
    CreateAuthor,
    GetAuthorData,
    SignInRequest,
    DataRequest,
    UpdateAuthorData,
    DeleteAuthor
}