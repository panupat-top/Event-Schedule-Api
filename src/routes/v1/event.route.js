const express = require('express');

const router = express.Router();
const { eventController } = require('../../controllers');

router.route('/lists').get(eventController.listsController);
router.route('/add').post(eventController.addController);
router.route('/remove/:id').delete(eventController.removeController);

module.exports = router;
