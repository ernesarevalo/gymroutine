const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fecha_nacimiento: { type: Date, required: true },
  sexo: { type: String, required: true },
  altura: { type: Number, required: true },
  peso: { type: Number, required: true },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
