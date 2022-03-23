const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const { upload } = require('../middlewares/FileUpload');
const authorize = require('../middlewares/middlewares');

//Get Method Calls

router.post('/post', authorize(['SUPER_ADMIN']), upload.single('image'), postController.createPost)

router.get('/post', postController.listPost)

module.exports = router;