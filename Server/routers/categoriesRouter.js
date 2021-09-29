const Router = require("express");
const {
  getAllCategories,
  getAvailableCategories,
  createCategory,
  updateCategory,
  getCategoryById,
  updateCategoryAvailability
} = require("../controllers/categoriesController");
const {
  categoryCreateSchema,
  categoryUpdateSchema,
} = require("./schemas/categoriesSchemas");
const validationMiddleware = require("../middleware/validationMiddleware");

const router = new Router();


router.get("/", getAllCategories);
router.get("/available", getAvailableCategories);
router.get("/:id", getCategoryById);
router.post("/", validationMiddleware(categoryCreateSchema), createCategory);
router.patch("/", validationMiddleware(categoryUpdateSchema), updateCategory);
router.patch("/availability", updateCategoryAvailability);

module.exports = router;
