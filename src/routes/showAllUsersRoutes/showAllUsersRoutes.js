import express from 'express';

//controllers
import ShowAllUsersController from '../../controllers/ShowUsers/ShowAllUsers.js';

//middleware
import { isAuthentication } from '../../middleware/auth/authentication.js';

const router = express.Router();

router.get(
    '/',
    isAuthentication,
    ShowAllUsersController
)

export default { router };