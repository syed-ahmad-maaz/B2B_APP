var express = require("express");
var router = express.Router();
const DispatchController = require("../Controllers/Dispatch");

router.route("/").post(DispatchController.PostDispatch);
module.exports = router;
