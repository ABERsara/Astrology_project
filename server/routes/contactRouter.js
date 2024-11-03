const express = require("express");
const controller = require("../controllers/contactController");
const router = express.Router();


router.get("/", controller.getContacts);
router.get("/:id", controller.getContact);
router.post("/",  controller.addContact);
router.put("/", controller.updateContact);
router.delete("/:id", controller.deleteContact);

module.exports = router;
