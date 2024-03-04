const express = require("express");
const router = express.Router();

const { sendEmailController } = require("../controllers/sendEmail.controller");
const {
  sendMultipleMailController,
} = require("../controllers/sendMultipleMail.controller");
const {
  contactEmailController,
} = require("../controllers/contactEmail.controller");

router.post("/contact", async (req, res, next) => {
  try {
    const result = await contactEmailController(req.body);
    return res.send(result);
  } catch (error) {
    return next(error);
  }
});

router.post("/single", async (req, res, next) => {
  const payload = req.body;
  try {
    const result = await sendEmailController(payload, req?.user);
    return res.send(result);
  } catch (error) {
    return next(error);
  }
});

router.post("/multiple", async (req, res, next) => {
  const payload = req.body;
  try {
    const result = await sendMultipleMailController(payload);
    return res.send(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
