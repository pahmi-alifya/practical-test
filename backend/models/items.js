const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  purchase_price: {
    type: Number,
  },
  selling_price: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  image_url: {
    type: String,
  },
});

module.exports = mongoose.model("Item", itemSchema);
