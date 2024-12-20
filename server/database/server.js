//1. am configurat baza de date
require('dotenv').config();
const { Sequelize } = require("sequelize");
console.log("BCRYPT_SALT:", process.env.BCRYPT_SALT);

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database/db.sqlite',
    logging: false
})

sequelize
    .sync()
    .then(() => {
        console.log('Models sucessfully (re)created.');
    })
    .catch((err) => {
        console.log(err);
    })

module.exports =  sequelize 