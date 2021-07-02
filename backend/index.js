const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const { uploadSingle } = require("./middleware/multer");
const app = express();
const port = 3001;

const Employee = require("./models/employee");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

db.authenticate().then(() =>
  console.log("berhasil terkoneksi dengan database")
);

app.get("/employee", async (req, res) => {
  try {
    // const { limit = 10, page = 1 } = req.body;
    // const items = await ItemModel.find({})
    //   .skip((page - 1) * limit)
    //   .limit(limit * 1)
    //   .exec();

    // const count = await ItemModel.countDocuments();
    // res.json({
    //   status: 200,
    //   message: "Success",
    //   items,
    //   totalPages: Math.ceil(count / limit),
    //   currentPage: page,
    // });

    const employees = await Employee.findAll({});
    res.json({
      status: 200,
      message: "Success",
      employees,
    });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
});

app.post("/employee", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      dob,
      province,
      city,
      address,
      ktp_number,
      current_position,
      bank_account_number,
      bank_account,
    } = req.body;

    const employee = new Employee({
      first_name,
      last_name,
      phone_number,
      dob,
      province,
      city,
      address,
      ktp_number,
      current_position,
      bank_account_number,
      bank_account,
      image_url: `images/${req.file.filename}`,
    });

    await employee.save();

    res.json({ status: 201, message: "Data berhasil ditambahkan!", employee });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
});

app.get("/employee/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const employee = await Employee.findOne({
      where: { id },
    });

    res.json({
      status: 200,
      message: "Success",
      employee,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.delete("/employee/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const employee = await Employee.destroy({
      where: { id },
    });

    await employee;

    res.json({ status: 201, message: "Data berhasil dihapus!", data: [] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});


app.put("/employee/:id", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      dob,
      province,
      city,
      address,
      ktp_number,
      current_position,
      bank_account_number,
      bank_account,
    } = req.body;
    const id = req.params.id;

    const employee = await Employee.update(
      {
        first_name,
        last_name,
        phone_number,
        dob,
        province,
        city,
        address,
        ktp_number,
        current_position,
        bank_account_number,
        bank_account,
        image_url: `images/${req.file.filename}`,
      },
      { where: { id } }
    );
    await employee;

    res.json({ status: 201, message: "Data berhasil diubah!", employee });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
