const express = require('express');
const router = express.Router();
const {GetAuthorData, UpdateAuthorData,  CreateAuthor, SignInRequest, DataRequest,DeleteAuthor} =  require('../Controller/Controller-Authors');
const {GetArticleData,GetContentsByArticlePosition, UpdateArticle, DeleteArticle, CreateArticle, GetContentsByAuthorId,GetArticles,GetArticle, UploadFiles} =  require('../Controller/Controller-Articles');

//FOR  AUTHOR
router.get('/authors', GetAuthorData);
router.delete('/authors/:id', DeleteAuthor);
router.post('/authors',CreateAuthor);
router.get('/authors/:email', SignInRequest );
router.get('/authors/confirm/:id', DataRequest );
router.patch('/authors/:id', UpdateAuthorData);


//FOR ARTICLES
//Update Article
router.patch('/article/:id', UpdateArticle);
//Delete Article
router.delete('/article/:id', DeleteArticle);
router.get('/articles', GetArticleData);
router.post('/articles',CreateArticle);
router.get('/articles/:authorId',  GetContentsByAuthorId);
router.get('/articlesposition/:articlePosition',  GetContentsByArticlePosition);
//Get Articles According To Section
router.get('/section/:section',  GetArticles);
//Get Single Article
router.get('/article/:id',  GetArticle);

//UploadFiles
router.post("/uploadfiles", UploadFiles)


module.exports = router;