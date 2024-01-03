const { addMessage, getAllMessages } = require("../controllers/messageController.js");
// const requireAuth = require("../middleware/requireAuth.js");

const router = require("express").Router();

router.post("/addmessage", addMessage);
router.post("/getmessage", getAllMessages);



module.exports = router;

