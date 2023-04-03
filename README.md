## dynamically set token in postman

> in login route in postman go to Test tab and write below code:

```
 const jsonData=pm.response.json();
 pm.globals.set("token",jsonData.token);
```

_added postman documentation link in the end of this file._
[postman documentation](https://documenter.getpostman.com/view/20773865/2s93RUvXaE)

> #  instructions

## while sending data to the backend must give the proper name as per schima.in the formdata.append , name must be same as the schima field name.

## here i want to use a schima to upload only image in the database mongodb.

- so i created a schima for that. Images.js

  - it has three item to store in the database.
  - profile ,portfoli,banner
  - i have also included the createdAt to get back the last image from the database.

- in the route i have several routes for doing different task. the routes are,

```
router.post("/upload", formidable(), imagesUpload);
router.get('/images', getImages);


router.get('/profileImage/:id', profileImage);
router.post('/updateProfileImage/:id', formidable(), updateProfileImage)
router.get('/portfolioImage/:id', portfolioImage);
router.post('/updatePortfolioImage/:id', formidable(), updatePortfolioImage)
router.get('/bannerImage/:id', bannerImage);
router.post('/updateBannerImage/:id', formidable(), updateBannerImage)

router.get('/delete',deleteAllImages);
```

- /upload is for uploading the image in the database. it will get all theree images at a time and sore it.
- /images i will get only the last 3 uploaded images.

- the the below 6 are used to get the specific image from the database. and update it.
- though i have uploaded function which will need to get all 3 images at a time to upload them but for update i have used single image update functionality.

- /delete is for deleting all the images from the database.

- /images will get back the database \_id. it is used to get the data from the database.

```
  const id = req.params.id;
  if (!id) throw new BadRequestError('No id was provided');
  const images = await Image.find({
    _id: id
  }, { profile: 1 });
```

- from the params i am getting the id and then i am using it to get the data from the database. and profile:1 means i only want the profile field/ profile image from the database.
- like this for protfolio and banner. it has separate route for each.

- in the client side using useEffect i will get the databse id

```
  const loadId = async () => {
    const { data } = await axios.get('http://localhost:5000/api/v1/images');
    setId(data);
  }
```

## for uploading images.

- handleFieldName use kore profile portfolio and banner state a image gulo set korci.
  then below code.

```
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('profile', profile);
    formData.append('portfolio', portfolio);
    formData.append('banner', banner);

    try {
      await axios.post("http://localhost:5000/api/v1/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Images uploaded successfully');
      navigate('/');


    } catch (err) {
      console.log(err);
      alert('Failed to upload images');
    }
  };
```

- in ViewImage.jsx. then i have used the id to get single image from the routes and show in the image part.

```
<div className="col-md-4 mb-3">
    <img className="img-fluid" src={`http://localhost:5000/api/v1/profileImage/${id}?${new Date().getTime()}`} alt="profileImage" />
</div>
```

- in update part we again need the id. so again using useEffect i have got the \_id

- then using form data get the image . append them and send it to the route with post method.

```
//onChange a profile state a data ashbe. mane akta image ashbe first then.
    if (profile) {
      const formData = new FormData();
      profile && formData.append("photo", profile);
      await axios.post(`https://multiple-image-in-single-schima.vercel.app/api/v1/updateProfileImage/${id}`, formData);
    }
```
