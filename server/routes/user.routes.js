const express = require('express');
const UserSchema = require("../dtos/user.dto/user.dto");
const { hashPassword } = require("../utils/bcryptUtils");
const bcrypt = require('bcrypt')
const User = require("../database/models/User");

const router = express.Router();

//toti userii
router.get('/', async (req, res) => {
    const users = await User.findAll({
        attributes: {
            exclude: ['password']
        }
    });

    res.status(200).json(users);
})

//user in fct de id
router.get('/:id', async(req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({sucess: false, message: 'User id is not valid', data: {}})
    }

    const user = await User.findByPk(id, {
        attributes: {
            exclude: ['password']
        }
    });

    if (!user) {
        return res.status(400).json({sucess: false, message: 'User not found', data: {}})
    }

    res.status(200).json({sucess: true, message: 'User was found', data: user})
})

//creare user nou
router.post('/', async (req, res) => {
    const existingUser = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if(existingUser) {
        return res.status(400).json({success: false, message: 'User already exists', data: {}});
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const user = await User.create({
        ...req.body,
        password: hashedPassword
    })

    delete user.dataValues.password;

    res.status(201).json({success: true, message: 'User created', data: user});
})


//register
router.post("/register", async (req, res) => {
    const validation = UserSchema.safeParse(req.body);
  
    // Validare date
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Datele utilizatorului sunt invalide.",
        errors: validation.error.errors.map(err => err.message), // Trimite erorile detaliate
      });
    }
  
    const { name, email, password, role } = validation.data;
  
    try {
      // Verificăm dacă utilizatorul există deja
      const existingUser = await User.findOne({
        where: { email },
      });
  
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Utilizatorul există deja cu această adresă de email.",
        });
      }
  
      // Creare utilizator nou
      const hashedPassword = hashPassword(password); // Hash parola
      const newUser = await User.create({
        email,
        name,
        password: hashedPassword,
      });
  
      res.status(201).json({
        success: true,
        message: "Utilizatorul a fost creat cu succes.",
        data: { id: newUser.id, name: newUser.name, email: newUser.email },
      });
    } catch (error) {
      console.error("Eroare la crearea utilizatorului:", error);
      res.status(500).json({
        success: false,
        message: "A apărut o eroare internă.",
      });
    }
  });

 //modificare/update user   
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({success: false, message: 'User id is not valid', data: {}})
    }

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(400).json({success: false, message: 'User not found', data: {}})
    }

    const updatedUser = await user.update({
        ...req.body
    })

    delete updatedUser.dataValues.password;

    res.status(200).json({success: true, message: 'User updated', data: updatedUser});
})


//stergere user
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({success: false, message: 'User id is not valid', data: {}})
    }

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(400).json({success: false, message: 'User not found', data: {}})
    }

    await user.destroy();

    res.status(200).json({success: true, message: 'User successfully deleted', data: {}});
})


module.exports = router;
