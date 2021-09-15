const Router = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
} = require("../controllers/categoriesController");
const {
  categoryCreateSchema,
  categoryUpdateSchema,
} = require("./schemas/categoriesSchemas");
const validationMiddleware = require("../middleware/validationMiddleware");

const router = new Router();

router.get("/", getCategories);
router.post("/", validationMiddleware(categoryCreateSchema), createCategory);
router.patch("/", validationMiddleware(categoryUpdateSchema), updateCategory);

module.exports = router;
