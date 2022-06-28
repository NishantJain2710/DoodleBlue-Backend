import express from 'express';

//controllers
import ShowAllUsersController from '../../controllers/ShowUsers/ShowAllUsers.js';
import GetUserDetails from '../../controllers/ShowUsers/GetUserDetails.js';
import GetListOfNearByUsersController from '../../controllers/ShowUsers/GetListOfNearByUsers.js';

//middleware
import { isAuthentication } from '../../middleware/auth/authentication.js';
import UserDetailsValidation from '../../middleware/Validation/UserDetailsValidation.js';

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

router.get(
    '/nearby/:dis',
    isAuthentication,
    UserDetailsValidation('showNearByUsers'),
    GetListOfNearByUsersController
)

export default { router };