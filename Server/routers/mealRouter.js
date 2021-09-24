const Router = require("express");
const router = new Router();
const {
  getMealByCategory,
  createMeal,
  updateMeal,
  deleteMeal,
  getAllMeals
} = require("../controllers/mealController");
const {
  mealCreateSchema,
  mealUpdateSchema,
} = require("./schemas/mealsSchemas");
const validationMiddleware = require("../middleware/validationMiddleware");

router.get("/", getAllMeals);
router.get("/category/:id", getMealByCategory);
router.post("/", validationMiddleware(mealCreateSchema), createMeal);
router.patch("/", validationMiddleware(mealUpdateSchema), updateMeal);
router.delete("/:id", deleteMeal);

module.exports = router;
