const { register, login, logout, checkAuth, setAvatar, getAllUsers, getUser } = require("../controllers/userController.js");
const requireAuth = require("../middleware/requireAuth.js");

const router = require("express").Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);
 
router.post("/checkauth", checkAuth);

router.post("/setavatar", setAvatar);

router.get("/allusers/:id", getAllUsers);

router.get("/getuser/:username", getUser);



module.exports = router;

