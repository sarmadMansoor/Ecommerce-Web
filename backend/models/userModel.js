import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object, default: {} },
}, { minimize: false });  // Prevents removal of empty objects

// Prevent model overwrite in development (important in hot-reloading environments like Next.js)
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
