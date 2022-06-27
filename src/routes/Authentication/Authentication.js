import express from 'express';

import loginController from '../../controllers/Authentication/LoginController.js';
import RegisterController from '../../controllers/Authentication/RegisterController.js';

const router = express.Router();

router.post(
    '/login',
    loginController
)

router.post(
    '/register',
    RegisterController
)

export default { router };