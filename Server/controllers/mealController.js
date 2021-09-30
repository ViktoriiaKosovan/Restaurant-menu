const handleError = require("../utils/handleError");
const { cloudinary } = require("../utils/cloudinary");
const { Meal } = require("../models/models");
const { successMessage, httpCodes } = require("../constants/constants");

const getAllMeals = async (req, res) => {
  try {
    let meals = await Meal.findAll({
      order: [["createdAt", "ASC"]],
    });
    res.status(httpCodes.OK).send(meals);
  } catch (error) {
    handleError(res, error);
  }
};

const getMealById = async (req, res) => {
  try {
    const id = req.params.id;
    let mealById = await Meal.findOne({ where: { id: id } });
    res.status(httpCodes.OK).send(mealById);
  } catch (error) {
    handleError(res, error);
  }
};
const getMealByCategory = async (req, res) => {
  try {
    const id = req.params.id;
    let mealsByCategory = await Meal.findAll(
      { where: { categoryId: id, availability: true } },
      {
        order: [["createdAt", "ASC"]],
      }
    );
    res.status(httpCodes.OK).send(mealsByCategory);
  } catch (error) {
    handleError(res, error);
  }
};

const createMeal = async (req, res) => {
  try {
    let { name, img, description, weight, price, availability, categoryId } =
      req.body;
    const uploadResponse = await cloudinary.uploader.upload_large(img, {
      upload_preset: "dev_setups",
    });

    if (availability === "false") {
      availability = false;
      return availability;
    }
    await Meal.create({
      name,
      img: uploadResponse.url,
      description,
      weight,
      price,
      availability,
      categoryId,
    });
    res.status(httpCodes.CREATED).send({ message: successMessage });
  } catch (error) {
    handleError(res, error);
  }
};

const updateMeal = async (req, res) => {
  try {
    let {
      id,
      img,
      name,
      description,
      weight,
      price,
      categoryId,
      availability,
    } = req.body;
    const uploadResponse = await cloudinary.uploader.upload_large(img, {
      upload_preset: "dev_setups",
    });
    if (availability === "false") {
      availability = false;
      return availability;
    }
    await Meal.update(
      {
        img: uploadResponse.url,
        name,
        description,
        weight,
        price,
        availability,
        categoryId,
      },
      { where: { id: id } }
    );
    res.status(httpCodes.OK).send({ message: successMessage });
  } catch (error) {
    handleError(res, error, httpCodes.UPDATE_ERROR);
  }
};

const updateMealAvailability = async (req, res) => {
  try {
    let { id, availability } = req.body;

    if (availability === "false") {
      availability = false;
      return availability;
    }
    await Meal.update({ availability }, { where: { id: id } });
    res.status(httpCodes.OK).send({ message: successMessage });
  } catch (error) {
    handleError(res, error, httpCodes.UPDATE_ERROR);
  }
};

const deleteMeal = async (req, res) => {
  try {
    const id = req.params.id;
    await Meal.destroy({ where: { id: id } });
    res.status(httpCodes.OK).send({ message: successMessage });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  getAllMeals,
  getMealById,
  getMealByCategory,
  createMeal,
  updateMeal,
  updateMealAvailability,
  deleteMeal,
};
