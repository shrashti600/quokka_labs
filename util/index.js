var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const SESSIONEXPIREDCODE = 401;
const ERRORCODE = 400;
const SUCCESSCODE = 200;
const EXCEPTIONCODE = 500;
const ALREADYLOGGEDIN = 406;
const EXCEPTIONMESSAGE = "We are currently facing some problem. Please Try again after some time";
const SESSIONEXPIREDMESSAGE = "The user is not logged in or token expired."

/**
 * Methos to return response
 * @param {*} res 
 * @param {*} statusCode 
 * @param {*} message 
 * @param {*} success 
 * @param {*} data 
 * @param {*} token 
 * @returns 
 */
const sendResponse = (res, statusCode, message, success, data, token) => res.send({
  statusCode, 
  message, 
  success, 
  data,
  token 
});

/**
 * Method to generate jwt without any expiry
 * @param {*} data :- { id: String, userType: String[user] }
 * @returns 
 */
const generateJWT = async (data) => jwt.sign(data, process.env.jwtSecretKey);

/**
 * Method to generate jwt with expiry of 600000 ms
 * @param {*} data :- { id: string, userType: String[user] }
 * @returns 
 */
const jwtWithExpiry = async (data) => jwt.sign(data, process.env.jwtSecretKey,{expiresIn:process.env.jwtExpiryTime});

/**
 * Method to decode jwt(get data from jwt token)
 * @param token : string
 */
const decodeJWT = async (token) => jwt.verify(token, process.env.jwtSecretKey);

/**
 * Method to encrypt password
 * @param {*} password :- String
 * @returns 
 */
const encryptPassword = async (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(11));

/**
 * Method to match password
 * @param {*} password :- string
 * @param {*} hash :- string
 * @returns 
 */
const matchPassword = async(password, hash) => bcrypt.compare(password, hash);

module.exports = {
  SESSIONEXPIREDCODE, ERRORCODE, SUCCESSCODE, EXCEPTIONCODE, ALREADYLOGGEDIN, EXCEPTIONMESSAGE,
  SESSIONEXPIREDMESSAGE, sendResponse, generateJWT, jwtWithExpiry, decodeJWT, encryptPassword,
   matchPassword
}