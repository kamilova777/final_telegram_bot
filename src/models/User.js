import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  chatId: { type: String, required: true, unique: true },
  firstname: String,
  username: { type: String, default: null },
  active: { type: Boolean, default: true },
  balance: { type: Number, default: 2000 },
  action: {type: String,default:"start",},
  name:String,
  phone:String,

});

const User = mongoose.model("User", userSchema);

export { User };
