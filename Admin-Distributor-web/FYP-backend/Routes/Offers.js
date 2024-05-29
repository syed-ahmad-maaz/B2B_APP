var express= require('express');
var router= express.Router();
const AuthenticateAdmin = require("../Middleware/AdminAuth");
const UpcomingOffersController = require("../Controllers/UpcomingOffer");
const upload=require("../Middleware/ImageUpload")
router.route('/').get(UpcomingOffersController.getOffer)
router.route('/').post(AuthenticateAdmin,upload.single("OfferImage"),UpcomingOffersController.CreateUpcomingOffer)
router.route('/:id').put(AuthenticateAdmin,upload.single("OfferImage"),UpcomingOffersController.UpdateUpcomingOffer)
router.route('/:id').delete(UpcomingOffersController.DeleteUpcomingOffer)


module.exports = router;