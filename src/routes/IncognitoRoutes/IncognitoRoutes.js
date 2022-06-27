import express from 'express';

//controllers
import IncognitoController from '../../controllers/VisiblityMode/IncognitoController.js';

//middleware
import { isAuthentication } from '../../middleware/auth/authentication.js';

const router = express.Router();

router.put(
    '/incognito/mode',
    isAuthentication,
    IncognitoController
)

export default { router };