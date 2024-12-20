const { z } = require("zod");

const UserSchema = z.object({
  email: z.string().email("Adresa de email nu este validă."),
  name: z.string(1, "Numele de utilizator este obligatoriu."),
  password: z.string().min(8, "Parola trebuie să aibă cel puțin 8 caractere."),
});

module.exports = UserSchema;
