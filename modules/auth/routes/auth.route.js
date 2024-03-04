const express = require("express");
const { loginController } = require("../controller/login.controller");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  const payload = req.body;
  try {
    const result = await loginController(payload);
    return res.send(result);
  } catch (error) {

    return next(error);
  }
});

router.post("/restt-password", async (req, res, next) => {
  const payload = req.body;
  try {
    // const result = await sendMultipleMailController(payload);
    // return res.send(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
