const express = require("express");
const formidable = require("express-formidable");
const { imagesUpload, getImages, profileImage, portfolioImage, bannerImage, updateProfileImage, updatePortfolioImage, updateBannerImage,deleteAllImages } = require("../controllers/image");
const Image = require("../models/Images");

const router = express.Router();

router.post("/upload", formidable(), imagesUpload);
router.get('/images', getImages);


router.get('/profileImage/:id', profileImage);
router.post('/updateProfileImage/:id', formidable(), updateProfileImage)
router.get('/portfolioImage/:id', portfolioImage);
router.post('/updatePortfolioImage/:id', formidable(), updatePortfolioImage)
router.get('/bannerImage/:id', bannerImage);
router.post('/updateBannerImage/:id', formidable(), updateBannerImage)

router.get('/delete',deleteAllImages);

module.exports = router;
