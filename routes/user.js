const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validationMiddleware = require('../middleware/validationMiddleware');
const { verifyToken } = require('../middleware/isAuthenticate')

router.get('/', userController.getAllUsers);
router.post('/register', validationMiddleware.validateRegister, userController.registerUser);
router.post('/login', validationMiddleware.validateLogin, userController.loginUser);

router.get('/:id', verifyToken, userController.getUserById);
router.post('/', validationMiddleware.validateUser, verifyToken, userController.createUser);
router.put('/:id', validationMiddleware.validateUser, verifyToken, userController.updateUser);
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;