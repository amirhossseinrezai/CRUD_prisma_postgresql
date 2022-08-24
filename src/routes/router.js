const router = require('express').Router();
const Controller = require('../controller/controller');

router.get("/", Controller.getUser);
router.get("/:email", Controller.getUserByEmail);
router.post("/", Controller.addUser);
router.put("/:email", Controller.updateUser);
router.delete("/:id", Controller.deleteUser);

module.exports = router;