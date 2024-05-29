var express = require("express");
var router = express.Router();
const DispatchController = require("../Controllers/Dispatch");
const AuthenticateAdmin = require("../Middleware/AdminAuth");
router.route("/signup").post(AuthenticateAdmin,DispatchController.PostDispatch);
router.route("/alldispatchers").get(DispatchController.listofdispatchers);
router.route("/:id").put(DispatchController.UpdateDispatch);
router.route("/:id").delete(DispatchController.deleteDispatch);
module.exports = router;
