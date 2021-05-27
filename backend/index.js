const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { uploadSingle } = require("./middleware/multer");
const app = express();
const port = 3001;

const ItemModel = require("./models/items");

mongoose.connect("mongodb://localhost:27017/nutech-integrasi", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());
app.use(cors());

app.get("/item", async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.body;
    console.log(req.query);
    const items = await ItemModel.find({})
      .skip((page - 1) * limit)
      .limit(limit * 1)
      .exec();

    const count = await ItemModel.countDocuments();
    res.json({
      status: 200,
      message: "Success",
      items,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
});
app.post("/item", uploadSingle, async (req, res) => {
  try {
    const { name, purchase_price, selling_price, stock, file } = req.body;
    const item = await ItemModel.create({
      name,
      purchase_price,
      selling_price,
      stock,
      image_url: `images/${file}`,
    });
    res.json({ status: 201, message: "Data berhasil ditambahkan!", item });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
});
app.get("/item-detail/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item = await ItemModel.findById(id);
    res.json({ status: 200, message: "Success", item });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
});
app.put("/item", async (req, res) => {
  try {
    const { _id, name, purchase_price, selling_price, stock, file } = req.body;
    const item = await ItemModel.findOne({ _id });
    if (file) {
      // await fs.unlink(path.join(`public/images/${item.image_url}`));
      item.image_url = `images/${file}`;
    }

    item.name = name;
    item.purchase_price = purchase_price;
    item.selling_price = selling_price;
    item.stock = stock;

    await item.save();
    res.json({ status: 200, message: "Success", item });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
});
app.delete("/item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await ItemModel.findOne({ _id: id });
    await item.remove();

    res.json({ status: 200, message: "Data Berhasil Dihapus", item });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
