const Router = require("express");
const router = new Router();
const {
  getMealById,
  getMealByCategory,
  createMeal,
  updateMeal,
  deleteMeal,
  getAllMeals,
  updateMealAvailability
} = require("../controllers/mealController");
const {
  mealCreateSchema,
  mealUpdateSchema,
} = require("./schemas/mealsSchemas");
const validationMiddleware = require("../middleware/validationMiddleware");

router.get("/", getAllMeals);
router.get("/category/:id", getMealByCategory);
router.get("/:id", getMealById);
router.post("/", validationMiddleware(mealCreateSchema), createMeal);
router.patch("/", validationMiddleware(mealUpdateSchema), updateMeal);
router.patch("/availability", updateMealAvailability);
router.delete("/:id", deleteMeal);

module.exports = router;
