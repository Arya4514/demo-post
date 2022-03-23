'use strict';

const db = require('../models');
const role = require('../utils/role');
const utils = require('../utils/utils');

module.exports = {
    signIn: async (req, res) => {

        if (!req.body.user_name || !req.body.password) {
            return res.status(401).json({ message: "Please provide all values", statusCode: res.statusCode, error: true });
        }

        try {

            let user = await db.user.findOne({
                where: {
                    user_name: req.body.user_name
                }
            });

            if (!user) {
                return res.status(401).json({ message: "User not found with given user name!", statusCode: res.statusCode, error: true });
            }

            if (!utils.comparePassword(user.password, req.body.password)) {
                return res.status(401).json({ message: "invalid credentials", statusCode: res.statusCode, error: true });
            }
            else {

                const tokenOriginal = utils.generateUserToken(
                    user.id, user.user_name, user.role, user.qualification, user.city, user.phone_number
                );

                return res.status(200).json({ message: "Login successfully", token: tokenOriginal, statusCode: res.statusCode, error: false });
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Internal server error", statusCode: res.statusCode, error: true });
        };
    },

    signUp: async (req, res) => {

        if (!req.body.user_name || !req.body.phone || !req.body.password) {
            return res.status(401).json({ message: "Please provide all values", statusCode: res.statusCode, error: true });
        }

        try {

            let user = await db.user.findOne({
                where: {
                    user_name: req.body.user_name
                }
            });

            if (!user) {

                req.body.password = utils.hashPassword(req.body.password)
                req.body.role = role.USER

                user = await db.user.create(req.body);

                return res.status(200).json({ message: "Sign Up successfully", statusCode: res.statusCode, error: false });
            }
            else {
                return res.status(401).json({ message: "User exist with same user name!", statusCode: res.statusCode, error: true });
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "Internal server error", statusCode: res.statusCode, error: true });
        };
    }
}