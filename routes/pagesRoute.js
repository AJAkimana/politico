const express = require('express');
var pageRoute = express.Router();

const pagesController = require('../controllers/pagesController');

pageRoute.get('/', pagesController.getMainPage);

module.exports = pageRoute;