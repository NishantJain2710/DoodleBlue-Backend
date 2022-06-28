import express from 'express';

//controllers
import ShowAllUsersController from '../../controllers/ShowUsers/ShowAllUsers.js';
import GetUserDetails from '../../controllers/ShowUsers/GetUserDetails.js';
import GetListOfNearByUsersController from '../../controllers/ShowUsers/GetListOfNearByUsers.js';
import SearchUsersByGeoCoordinates from '../../controllers/ShowUsers/SearchUsersByGeoCoordinates.js';

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

router.get(
    '/lon/:lon/lat/:lat',
    isAuthentication,
    UserDetailsValidation('searchByGeo'),
    SearchUsersByGeoCoordinates
)

export default { router };