const Router = require('express');
const router = new Router();
const infoControllers = require('../controllers/infoControllers');

router.get('/', infoControllers.getInfo);
router.post('/', infoControllers.createInfo);
router.patch('/', infoControllers.updateInfo);



module.exports = router;