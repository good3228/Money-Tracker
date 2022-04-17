import express from 'express';
import * as usersController from './../controllers/users-controller.js';
import * as revenueController from './../controllers/revenues-controller.js';
const router = express.Router();

//set up the signup routes and http methods
router.route('/signup')
    .post(usersController.create_new_user)

router.route('/login')
    .post(usersController.getUser)

router.route('/income')
    .post(revenueController.create_revenue)

router.route('/:id')
    .get(revenueController.fetch_userRevenue)


export default router;