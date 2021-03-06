require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db");
// const cors = require("cors");
const corsMiddleware=require("./middleware/corsMiddleware")
const router = require("./routers/index");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(corsMiddleware);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use("/api", router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
