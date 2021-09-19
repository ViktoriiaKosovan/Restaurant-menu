const { Category } = require("../models/models");
const {
  successMessage,
  httpCodes,
} = require("../constants/constants");
const handleError = require("../utils/handleError");

const getCategories = async (req, res) => {
  try {
    let categories = await Category.findAll();
    res
      .status(httpCodes.OK)
      .send({ categories });
  } catch (error) {
    handleError(res, error);
  }
};

const createCategory = async (req, res) => {
  try {
    let { title } = req.body;
    await Category.create({ title });
    res
      .status(httpCodes.CREATED)
      .send({message: successMessage });
  } catch (error) {
    handleError(res, error);
  }
};

const updateCategory = async (req, res) => {
  try {
    let { id, title } = req.body;
    await Category.update({ title }, { where: { id: id } });
    res
      .status(httpCodes.OK)
      .send({ message: successMessage });
  } catch (error) {
    handleError(res, error, httpCodes.UPDATE_ERROR);
  }
};

module.exports = { getCategories, createCategory, updateCategory };