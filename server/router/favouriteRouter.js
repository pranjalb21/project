const express = require('express');
const favouriteController = require('../controllers/favouriteController');

const router = express.Router();

router
    .post(`/add`, favouriteController.AddToFavourite)
    .post(`/get`, favouriteController.GetFavourite)
    .post(`/delete`, favouriteController.DeleteFavourite)

module.exports = router;
