const Image = require('../models/Images');
const fs = require('fs');
const { NotFoundError,
  BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

// upload images endpoint
exports.imagesUpload = async (req, res) => {
  const files = req.files;
  if (!files) throw new BadRequestError('No files were uploaded');
  // create new image object
  const newImage = new Image();

  newImage.profile.data = fs.readFileSync(files.profile.path);
  newImage.profile.contentType = files.profile.type;

  newImage.portfolio.data = fs.readFileSync(files.portfolio.path);
  newImage.portfolio.contentType = files.portfolio.type;

  newImage.banner.data = fs.readFileSync(files.banner.path);
  newImage.banner.contentType = files.banner.type;

  // save the image object to database

  const savedImage = await newImage.save();
  res.status(StatusCodes.CREATED).send('Image uploaded successfully');

}

// get images endpoint

exports.getImages = async (req, res) => {

  const images = await Image.find().sort({ "createdAt": -1 }).limit(1);
  if (!images) throw new NotFoundError('No images found');
  const imagePaths = images.map((image) => [image.profile, image.portfolio, image.banner]);
  res.status(StatusCodes.OK).send(images[0]?._id);

}

// profile image
exports.profileImage = async (req, res) => {
  const id = req.params.id;
  if (!id) throw new BadRequestError('No id was provided');
  const images = await Image.find({
    _id: id
  }, { profile: 1 });
  if (!images) throw new NotFoundError('No images found');
  res.set('Content-Type', images[0].profile.contentType);
  return res.status(StatusCodes.OK).send(images[0].profile.data);

}
// update profile image
exports.updateProfileImage = async (req, res) => {
  const id = req.params.id;
  if (!id) throw new BadRequestError('No id was provided');
  const { photo } = req.files;
  if (!photo) throw new BadRequestError('No photo was provided');
  const image = await Image.findByIdAndUpdate(
    id,
    {
      profile: {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      }
    },
    { new: true }
  );
  await image.save();
  return res.status(StatusCodes.OK).send('Profile Image updated successfully');
}

// portfolio image
exports.portfolioImage = async (req, res) => {
  const id = req.params.id;
  if (!id) throw new BadRequestError('No id was provided');
  const images = await Image.find({
    _id: id
  }, { portfolio: 1 });

  if (!images) throw new NotFoundError('No images found');
  res.set('Content-Type', images[0].portfolio.contentType);
  return res.status(StatusCodes.OK).send(images[0].portfolio.data);

}
// update portfolio image
exports.updatePortfolioImage = async (req, res) => {


  const id = req.params.id;
  if (!id) throw new BadRequestError('No id was provided');
  const { photo } = req.files;
  if (!photo) throw new BadRequestError('No photo was provided');
  const image = await Image.findByIdAndUpdate(
    id,
    {
      portfolio: {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      }
    },
    { new: true }
  );


  await image.save();
  return res.status(StatusCodes.OK).send('Portfolio Image updated successfully');

}

// banner image
exports.bannerImage = async (req, res) => {
  const id = req.params.id;
  if (!id) throw new BadRequestError('No id was provided');
  const images = await Image.find({
    _id: id
  }, { banner: 1 });
  if (!images) throw new NotFoundError('No images found');
  res.set('Content-Type', images[0].banner.contentType);
  return res.status(StatusCodes.OK).send(images[0].banner.data);
}

// update banner image
exports.updateBannerImage = async (req, res) => {


  const id = req.params.id;
  if (!id) throw new BadRequestError('No id was provided');
  const { photo } = req.files;
  if (!photo) throw new BadRequestError('No photo was provided');
  const image = await Image.findByIdAndUpdate(
    id,
    {
      banner: {
        data: fs.readFileSync(photo.path),
        contentType: photo.type,
      }
    },
    { new: true }
  );

  await image.save();
  return res.status(StatusCodes.OK).send('Banner Image updated successfully');
}