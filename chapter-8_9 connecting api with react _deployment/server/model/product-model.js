import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true }, // String is shorthand for {type: String}
  thumbnail: String,
  price: { type: Number, required: true },
  rating: {
    type: Number,
    min: [0, "rating has to be >0"],
    max: [5, "rating has to be <5"],
  },
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  // images : [String] --> array of strings
});

const Product = mongoose.model("Product", productSchema);

export default Product;
