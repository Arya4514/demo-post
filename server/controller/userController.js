'use strict';

const Op = require('sequelize').Op;
var db = require('../models');
const role = require('../utils/role');

module.exports = {

    editUser: async (req, res) => {
        try {

            if (!req.body.id) {
                return res.status(401).json({ message: "Please provide all values", statusCode: res.statusCode, error: true });
            }

            if (req.body.password)
                delete req.body.password;


            if (req.body.role)
                delete req.body.role

            let user = await db.user.findOne({
                where: { id: req.body.id }
            });

            if (req.body.user_name) {

                let userName = await db.user.findOne({
                    where: { user_name: req.body.user_name }
                });
                if (userName) {
                    return res.status(401).json({ message: "User exist with user name!", statusCode: res.statusCode, error: true });
                }
            }
            if (!user) {
                return res.status(404).json({ message: "User does not exist!", statusCode: res.statusCode, error: true });

            }

            user = await db.user.update(req.body, {
                where: {
                    id: req.body.id
                }
            });

            return res.status(200).json({ message: "User updated successfully", statusCode: res.statusCode, error: false });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error", statusCode: res.statusCode, error: true });
        };

    },

    getUserByID: async (req, res) => {

        try {

            if (!req.params.id) {
                return res.status(401).json({ message: "Please provide all values", statusCode: res.statusCode, error: true });
            }

            let user = await db.user.findOne({
                where: {
                    id: req.params.id
                },
                attributes: { exclude: ['password'] },
                order: [['updatedAt', 'DESC']],
            });

            return res.status(200).json({ message: "Ok", data: user, statusCode: res.statusCode, error: false });

        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Internal server error", statusCode: res.statusCode, error: true });
        };
    },

    getUsers: async (req, res) => {

        try {

            let user = await db.user.findAll({
                where: { [Op.not]: [{ role: role.ADMIN }] },
                attributes: { exclude: ['password'] },
                order: [['updatedAt', 'DESC']],
            })

            return res.status(200).json({ message: "Ok", data: user, statusCode: res.statusCode, error: false });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error", statusCode: res.statusCode, error: true });
        };
    }
}