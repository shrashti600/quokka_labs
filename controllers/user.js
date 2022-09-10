const UserModel = require("../models/user");
const util = require("../util");
const { ObjectId } = require("mongodb");

module.exports = {
  /**
   * Method to signup by user
   * @param {*} res
   * @returns
   */
  register: async (req, res) => {
    try {
      const existingQuery = {
        email: req.body.email.toLowerCase(),
      };
      const existingData = await UserModel.findOne(existingQuery);
      console.log("req", existingData);
      if (existingData) {
        // if data already exist with given email then return Email already exist response
        return util.sendResponse(
          res,
          util.ERRORCODE,
          "Email already exist!",
          false
        );
      }
      req.body.password = await util.encryptPassword(req.body.password);
      req.body.email = req.body.email.toLowerCase();
      const userObj = new UserModel(req.body);
      const token = await util.generateJWT({
        id: userObj._id,
        userType: "user",
      });

      console.log("obj", userObj);
      userObj._doc.sessionId = token;
      const userData = await userObj.save();
      const sendObj = {
        _id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      };
      console.log("hhh", sendObj);
      return util.sendResponse(
        res,
        util.SUCCESSCODE,
        "User added!",
        true,
        sendObj,
        token
      );
    } catch (error) {
      return util.sendResponse(
        res,
        util.EXCEPTIONCODE,
        error.message ? error.message : util.EXCEPTIONMESSAGE,
        false
      );
    }
  },

  /**
   * Method to login for user
   * @param {*} req :- {body:validation.userLogin}
   * @param {*} res
   */
  login: async (req, res) => {
    try {
      const query = {
        email: req.body.email.toLowerCase(),
        isDeleted: false,
      };
      const userData = await UserModel.findOne(query);
      if (!userData) {
        // if user not found with given email then return User not found! response
        return util.sendResponse(res, util.ERRORCODE, "User not found!", false);
      }
      const matchPwd = await util.matchPassword(
        req.body.password,
        userData.password
      );
      if (!matchPwd) {
        // if password does not match with the given password then return Invalid login detail response
        return util.sendResponse(
          res,
          util.ERRORCODE,
          "Invalid login detail",
          false
        );
      }
      const token = await util.generateJWT({
        id: userData._id,
        userType: "user",
      });
      const updatedData = await UserModel.findByIdAndUpdate(
        userData._id,
        { $set: { sessionId: token } },
        { new: true }
      ).select("firstName lastName email ");
      return util.sendResponse(
        res,
        util.SUCCESSCODE,
        "Successfully login!",
        true,
        updatedData,
        token
      );
    } catch (error) {
      return util.sendResponse(
        res,
        util.EXCEPTIONCODE,
        error.message ? error.message : util.EXCEPTIONMESSAGE,
        false
      );
    }
  },

  /**
   * Method to search user
   * @param {*} req :- validation.searchUser
   * @param {*} res
   * @returns
   */
  userList: async (req, res) => {
    try {
      const list = await UserModel.find();

      const sendObj = list.map((list) => ({
        _id: list._id,
        firstName: list.firstName,
        lastName: list.lastName,
        email: list.email,
      }));
      return util.sendResponse(
        res,
        util.SUCCESSCODE,
        "User list!",
        true,
        sendObj
      );
    } catch (error) {
      return util.sendResponse(
        res,
        util.EXCEPTIONCODE,
        error.message ? error.message : util.EXCEPTIONMESSAGE,
        false
      );
    }
  },

  userData: async (req, res) => {
    try {
      if (!req.user) {
        // return if user not found
        return util.sendResponse(res, util.ERRORCODE, "User not found!");
      }
      const data = req.user._doc;
      const sendObj = {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      };
      return util.sendResponse(
        res,
        util.SUCCESSCODE,
        "user's data!",
        true,
        sendObj
      );
    } catch (error) {
      return util.sendResponse(
        res,
        util.EXCEPTIONCODE,
        error.message ? error.message : util.EXCEPTIONMESSAGE,
        false
      );
    }
  },
};


