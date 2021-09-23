const handleError = require("../utils/handleError");
const { Meal } = require("../models/models");
const {
  successMessage,
  httpCodes,
} = require("../constants/constants");

const getMealByCategory = async (req, res) => {
  try {
    const id = req.params.id;
    let mealsByCategory = await Meal.findAll({ where: { categoryId: id, availability:true } });
    res
      .status(httpCodes.OK)
      .send(mealsByCategory);
  } catch (error) {
    handleError(res, error);
  }
};

const createMeal = async (req, res) => {
  try {
    let { img, name, description, weight, price, availability, categoryId } = req.body;
    if (availability === "false") {
      availability = false;
      return availability;
    }
    await Meal.create({ img, name, description, weight, price, availability, categoryId });
    res
      .status(httpCodes.CREATED)
      .send({  message: successMessage });
  } catch (error) {
    handleError(res, error);
  }
};

const updateMeal = async (req, res) => {
  try {
    let { id, img, name, description, weight, price, categoryId, availability } = req.body;
    if (availability === "false") {
      availability = false;
      return availability;
    }
    await Meal.update(
      { img, name, description, weight, price, availability, categoryId },
      { where: { id: id } }
    );
    res
      .status(httpCodes.OK)
      .send({  message: successMessage });
  } catch (error) {
    handleError(res, error, httpCodes.UPDATE_ERROR);
  }
};

const deleteMeal = async (req, res) => {
  try {
    const id = req.params.id;
    await Meal.destroy({ where: { id: id } });
    res
      .status(httpCodes.OK)
      .send({ message: successMessage });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = { getMealByCategory, createMeal, updateMeal, deleteMeal };
