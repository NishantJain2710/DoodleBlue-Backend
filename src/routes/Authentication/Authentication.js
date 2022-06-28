import express from 'express';

//Controllers
import loginController from '../../controllers/Authentication/LoginController.js';
import RegisterController from '../../controllers/Authentication/RegisterController.js';

//middleware for validation
import AuthValidationMiddleware from '../../middleware/Validation/AuthValidations.js';

const router = express.Router();

router.post(
    '/login',
    AuthValidationMiddleware('login'),
    loginController
)

router.post(
    '/register',
    AuthValidationMiddleware('register'),
    RegisterController
)

export default { router };