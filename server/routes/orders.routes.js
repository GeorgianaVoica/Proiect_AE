const express = require("express");
const {Order, OrderItem} = require("../database/models/Order");
const User = require("../database/models/User"); // Dacă este nevoie de relația inversă
//const { validateToken } = require("../middleware/auth.middleware");
const router = express.Router();
const { verifyToken } = require("../utils/tokenUtils");

router.post("/", verifyToken, async (req, res) => {
    try {
      const { name, address, paymentMethod, items, total } = req.body;
        console.log("Received items: ");

      if (!items || items.length === 0) {
        return res.status(400).json({ message: "No items in the order" });
      }
  
      const userId = req.userId;
  
      // Creează comanda principală
      const newOrder = await Order.create({
        userId,
        name,
        address,
        cardDetails: paymentMethod,
        total,
      });
  
      // Creează elementele din comandă
      const orderItems = items.map((item) => ({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));
  
      await OrderItem.bulkCreate(orderItems); // Salvează produsele în baza de date
  
      res.status(201).json({ message: "Order placed successfully", orderId: newOrder.id });
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ message: "Error placing order" });
    }
  });

router.get('/', async function(req, res) {
    try {
        const orders = await Order.findAll();

        res.status(200).json(orders);
    } catch (error) {
        handleErrorResponse(res, error, 'Orders not found');
    }
});

router.get('/:id', async function(req, res) {
    try {
        const id = req.params.id;

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({success: false, message: "Order not found", data: {}});
    }

            return res.status(200).json({success: true, message: "Order was found",data: order});

    } catch (error) {
        handleErrorResponse(res, error, 'Order not found');
    }
});

router.get('/user/:id', async function(req, res) {
    try {
        const id = req.userId;

        if (!id) {
            return res.status(401).json({success: false, message: "Unauthorized", data: {}});
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({success: false, message: "User not found", data: {}});
        }

        const orders = await user.getOrders({
            where: {userId: id}
        });

        return res.status(200).json({success: true, message: "Orders were found", data: orders});
    } catch (error) {
        handleErrorResponse(res, error, 'Orders not found');
    }
});


router.post("/", async (req, res) => {
    try {
        const { name, address, cardDetails, items, total } = req.body;

        // Creează comanda
        const newOrder = await Order.create({
            userId: 1, // Înlocuiește cu ID-ul utilizatorului autentificat
            total,
            status: "Pending",
        });

        // Creează elementele din comandă
        const orderItems = items.map(item => ({
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
        }));

        await OrderItem.bulkCreate(orderItems);

        res.status(201).json({ message: "Order placed successfully", orderId: newOrder.id });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Error placing order" });
    }
});

router.put('/:id', async function(req, res) {
    try {
        const id = req.params.id;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({success: false, message: "Order not found", data: {}});
        }

        const updatedOrder = await order.update(req.body);

        return res.status(200).json(updatedOrder);
    } catch (error) {
    handleErrorResponse(res, error, 'Error updating order');
    }
});

router.delete('/:id', async function(req, res) {
    try {
        const id = req.params.id;
        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({success: false, message: "Order not found", data: {}});
        }

        await order.destroy();

        return res.status(200).json({success: true, message: "Order was deleted", data: order});

    } catch (error) {
    handleErrorResponse(res, error, 'Error deleting order');
    }
});


const handleErrorResponse = (res, error, message) => {
    console.error(`Error: ${message}`, error);
    return res.status(500).json({ success: false, message: `Error ${message}.`
    });
};

module.exports = router; 