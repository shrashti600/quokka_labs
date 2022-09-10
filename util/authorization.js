const UserModel = require("../models/user");
const util = require("./index");

exports.checkSession = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return util.sendResponse(
        res,
        util.SESSIONEXPIREDCODE,
        util.SESSIONEXPIREDMESSAGE,
        false
      );
    }
    const decodedData = await util.decodeJWT(token);
    if (decodedData.userType != "user") {
      return util.sendResponse(
        res,
        util.SESSIONEXPIREDCODE,
        util.SESSIONEXPIREDMESSAGE,
        false
      );
    }
    const userData = await UserModel.findOne({
      _id: decodedData.id,
      sessionId: token,
    });
    if (!userData) {
      return util.sendResponse(
        res,
        util.SESSIONEXPIREDCODE,
        util.SESSIONEXPIREDMESSAGE,
        false
      );
    }
    req.user = userData;
    return next();
  } catch (error) {
    return util.sendResponse(
      res,
      util.SESSIONEXPIREDCODE,
      util.SESSIONEXPIREDMESSAGE,
      false
    );
  }
};
