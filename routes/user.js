const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get('/', userController.getAllUsers);
router.post('/register', validationMiddleware.validateRegister, userController.registerUser);
router.post('/login', validationMiddleware.validateLogin, userController.loginUser);

router.get('/:id', userController.getUserById);
router.post('/',validationMiddleware.validateUser, userController.createUser);
router.put('/:id', validationMiddleware.validateUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
