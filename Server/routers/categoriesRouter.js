const Router = require("express");
const {
  getAllCategories,
  getAvailableCategories,
  createCategory,
  updateCategory,
  getCategoryById
} = require("../controllers/categoriesController");
const {
  categoryCreateSchema,
  categoryUpdateSchema,
} = require("./schemas/categoriesSchemas");
const validationMiddleware = require("../middleware/validationMiddleware");

const router = new Router();


router.get("/", getAvailableCategories);
router.get("/available", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", validationMiddleware(categoryCreateSchema), createCategory);
router.patch("/", validationMiddleware(categoryUpdateSchema), updateCategory);

module.exports = router;
