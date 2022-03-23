'use strict';

const db = require('../models');

module.exports = {
    createPost: async (req, res) => {

        if (!req.file) {
            return res.status(401).json({ message: "Please provide all values", statusCode: res.statusCode, error: true });
        }

        try {
            let body = {
                img: '/uploads/' + req.file.filename
            }

            if (req.body.description) {
                body.description = req.body.description
            }

            await db.post.create(body);

            return res.status(200).json({ message: "Post created successfully", statusCode: res.statusCode, error: false });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Internal server error", statusCode: res.statusCode, error: true });
        }
    },

    listPost: async (req, res) => {

        try {

            let post = await db.post.findAll({
                order: [['createdAt', 'DESC']],
            });

            return res.status(200).json({ message: "Ok", data: post, statusCode: res.statusCode, error: false });
        } catch (error) {
            console.log(err)
            return res.status(500).json({ message: "Internal server error", statusCode: res.statusCode, error: true });
        }
    }
}