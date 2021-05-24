const router = require("express").Router();
const controller = {
  index: require("./controllers/index"),
  login: require("./controllers/login"),
  register: require("./controllers/register"),
};
/* Get's */
router.get("/", controller.index);
router.get("/login", controller.login);
router.get("/register", controller.register);

module.exports = router;
