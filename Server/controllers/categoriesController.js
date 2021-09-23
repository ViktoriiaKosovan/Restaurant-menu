const { Category } = require("../models/models");
const {
  successMessage,
  httpCodes,
} = require("../constants/constants");
const handleError = require("../utils/handleError");

const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
   let category= await Category.findOne({ where: { id: id } });
    res
      .status(httpCodes.OK)
      .send(category);
  } catch (error) {
    handleError(res, error);
  }
};

const getCategories = async (req, res) => {
  try {
    let categories = await Category.findAll();
    res
      .status(httpCodes.OK)
      .send(categories );
  } catch (error) {
    handleError(res, error);
  }
};

const createCategory = async (req, res) => {
  try {
    let { title, availability } = req.body;
    if (availability === "false") {
      availability = false;
      return availability;
    }
    await Category.create({ title, availability });
    res
      .status(httpCodes.CREATED)
      .send({message: successMessage });
  } catch (error) {
    handleError(res, error);
  }
};

const updateCategory = async (req, res) => {
  try {
    let { id, title, availability } = req.body;
    if (availability === "false") {
      availability = false;
      return availability;
    }
    await Category.update({ title,availability }, { where: { id: id } });
    res
      .status(httpCodes.OK)
      .send({ message: successMessage });
  } catch (error) {
    handleError(res, error, httpCodes.UPDATE_ERROR);
  }
};

module.exports = { getCategories, createCategory, updateCategory, getCategoryById };