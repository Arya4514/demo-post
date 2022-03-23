/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { jwt_secret, jwt_issuer } = require('../environments');

/**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

/**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
const comparePassword = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
};

/**
   * Generate Token
   * @param {string} id
   * @returns {string} token
   */
const generateUserToken = (id, user_name, role, qualification, city, phone_number) => {
    const token = jwt.sign({ id, user_name, role, qualification, city, phone_number },
        jwt_secret, { expiresIn: 60 * 60 * 24, issuer: jwt_issuer },
    );
    return token;
};

const decodeJWTToken = (token) => {
    try {
        let options = {
            expiresIn: 60 * 60 * 24,
            issuer: jwt_issuer
        };
        return jwt.verify(token, jwt_secret, options);
    } catch (error) {
        throw error
    }
}


let validations = {
    hashPassword,
    comparePassword,
    generateUserToken,
    decodeJWTToken
}

module.exports = validations;
