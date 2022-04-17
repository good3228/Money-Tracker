import express from 'express';
import * as usersController from './../controllers/users-controller.js';
const router = express.Router();

//set up the signup routes and http methods
router.route('/signup')
    .post(usersController.create_new_user)

//set up the tasks/:id route and corresponding http methods

export default router;