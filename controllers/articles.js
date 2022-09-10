const ArticleModel = require("../models/articles");
const util = require("../util");

module.exports = {
  deleteArticle: async (req, res) => {
    try {
      const deletedArticle = await ArticleModel.findByIdAndRemove(
        req.query.articleId
      );
      if (!deletedArticle) {
        return util.sendResponse(
          res,
          util.ERRORCODE,
          "Article not found!",
          false
        );
      }
      return util.sendResponse(res, util.SUCCESSCODE, "Article deleted!", true);
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
   * Method to add article to itinerary day
   * @param {*} req :- {body: validation.addArticle}
   * @param {*} res
   * @returns
   */
  addArticle: async (req, res) => {
    try {
      const articleObj = new ArticleModel(req.body);
      const articleData = await articleObj.save();
      const sendData = {
        _id: articleData._id,
        userId: articleData.userId,
        title: articleData.title,
        about: articleData.about,
      };
      return util.sendResponse(
        res,
        util.SUCCESSCODE,
        "Article added!",
        true,
        sendData
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
   * Method to update an article
   * @param {*} req :- {query:{articleId:string},body:validation.updateArticle}
   * @param {*} res
   * @returns
   */
  updateArticle: async (req, res) => {
    try {
      const updatedData = await ArticleModel.findByIdAndUpdate(
        req.query.articleId,
        { $set: req.body },
        { new: true }
      );
      if (!updatedData) {
        return util.sendResponse(
          res,
          util.ERRORCODE,
          "Article not found!",
          false
        );
      }
      return util.sendResponse(
        res,
        util.SUCCESSCODE,
        "Article updated!",
        true,
        updatedData
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

  getArticle: async (req, res) => {
    try {
      const articleData = await ArticleModel.findById(req.query.articleId, {
        userId: 1,
        title: 1,
        about: 1,
        _id: 1,
      });
      if (!articleData) {
        return util.sendResponse(
          res,
          util.ERRORCODE,
          "Article not found!",
          false
        );
      }
      return util.sendResponse(
        res,
        util.SUCCESSCODE,
        "Article detail!",
        true,
        articleData
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

  getArticleList: async (req, res) => {
    try {
      const articleData = await ArticleModel.find();
      return util.sendResponse(
        res,
        util.SUCCESSCODE,
        "Article detail!",
        true,
        articleData
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
