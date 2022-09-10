const express = require("express");
const userRoute = express.Router();
const articleController = require("../../controllers/articles");

userRoute.post("/add", articleController.addArticle);
userRoute.put("/update", articleController.updateArticle);
userRoute.get("/get-article-by-id", articleController.getArticle);
userRoute.delete("/delete", articleController.deleteArticle);
userRoute.get("/article-list", articleController.getArticleList)

module.exports = userRoute;
