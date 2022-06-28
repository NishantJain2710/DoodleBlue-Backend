import express from 'express';

//controllers
import ShowAllUsersController from '../../controllers/ShowUsers/ShowAllUsers.js';
import GetUserDetails from '../../controllers/ShowUsers/GetUserDetails.js';
//middleware
import { isAuthentication } from '../../middleware/auth/authentication.js';

const router = express.Router();

router.get(
    '/',
    isAuthentication,
    ShowAllUsersController
)

router.get(
    '/me',
    isAuthentication,
    GetUserDetails
)

export default { router };