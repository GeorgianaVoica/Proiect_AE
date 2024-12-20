const express = require("express");
const router = express.Router();

// Mock pentru coș 
let cart = [];

// Obține coșul curent
router.get("/", (req, res) => {
  res.status(200).json(cart);
});

// Adaugă un produs în coș
router.post("/", (req, res) => {
  const { productId, quantity, price, title } = req.body;

  const existingProduct = cart.find((item) => item.productId === productId);
  if (existingProduct) {
    existingProduct.quantity += quantity; // Doar actualizează cantitatea
  } else {
    // Adaugă produsul complet
    cart.push({ productId, quantity, price, title });
  }

  console.log("Updated Cart:", cart); // Debugging
  res.status(200).json(cart);
});


// Actualizează cantitatea unui produs
router.put("/:productId", (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const{ price } = req.params;

  const product = cart.find(item => item.productId === parseInt(productId));
  if (!product) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  product.price = price;
  product.quantity = quantity;
  res.status(200).json(cart);
});

// Șterge un produs din coș
router.delete("/:productId", (req, res) => {
  const { productId } = req.params;

  cart = cart.filter(item => item.productId !== parseInt(productId));
  res.status(200).json(cart);
});

module.exports = router;
