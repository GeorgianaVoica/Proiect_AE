const express = require("express");
const { safeParse } = require("zod");
const LoginSchema = require("../dtos/auth.dtos/login.dto");
const CheckTokenSchema = require("../dtos/auth.dtos/checkToken.dto");
const { generateToken, verifyToken } = require("../utils/tokenUtils");
const { comparePassword } = require("../utils/bcryptUtils");
const User = require("../database/models/User");

const router = express.Router();

// Endpoint pentru autentificare
router.post("/login", async (req, res) => {
  const validation = LoginSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ success: false, message: "Date invalide." });
  }

  const { email, password } = validation.data;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !comparePassword(password, user.password)) {
      return res.status(401).json({ success: false, message: "Autentificare eșuată." });
    }

    const token = generateToken(user.id);

    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Eroare server.", error });
  }
});

// Endpoint pentru verificarea token-ului
router.post("/check", (req, res) => {
  const validation = CheckTokenSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ success: false, message: "Date invalide." });
  }

  const { token } = validation.data;

  try {
    verifyToken(req, res, () => {
      return res.status(200).json({ success: true, message: "Token valid." });
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token invalid.", error });
  }
});

module.exports = router;
