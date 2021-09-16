const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Category = sequelize.define("categories", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    unique: {
      msg: "This title is already exist.",
      fields: ["title"],
    },
    allowNull: false,
  },
  availability: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

const Meal = sequelize.define("meals", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  img: { type: DataTypes.STRING, allowNull: false },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: "This name is already exist.",
      fields: ["name"],
    },
  },
  description: { type: DataTypes.STRING },
  weight: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.STRING, allowNull: false },
  availability: { type: DataTypes.BOOLEAN, defaultValue: true },
});

const Info = sequelize.define("info", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  address: {
    type: DataTypes.STRING
  },
  contacts: { type: DataTypes.STRING },
  wiFi: { type: DataTypes.STRING },
});

Category.hasMany(Meal);
Meal.belongsTo(Category);

module.exports = {
  Category,
  Meal,
  Info,
};
