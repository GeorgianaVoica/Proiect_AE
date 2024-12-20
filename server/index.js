require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const User = require('../server/database/models/User');
const {Order, OrderItem} = require('../server/database/models/Order');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/orders.routes');
const cartRoutes = require("./routes/cart.routes");
const productRoutes = require("./routes/product.routes");

User.hasMany(Order, {foreignKey: 'userId'});
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello'})
})

app.use(morgan('dev'))
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server successfully started on port ${PORT}`)
})

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use("/cart", cartRoutes);
app.use("/products", productRoutes);

