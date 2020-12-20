const express = require('express');

const router = express.Router();

const cardController = require('../controllers/cardController');
const authController = require('../controllers/authController');

router.get('/', cardController.getUserCards);

router.get('/:id', cardController.getUserCardDetails);

router.patch('/:id', authController.isAdmin, cardController.updateUserCard);

router.post('/', authController.isAdmin, cardController.addUserCard);

router.delete('/:id', authController.isAdmin, cardController.deleteUserCard);

module.exports = router;
