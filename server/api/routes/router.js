import express from 'express';
import * as usersController from './../controllers/users-controller.js';
import * as revenueController from './../controllers/revenues-controller.js';
import * as expenseController from './../controllers/expenses-controller.js';
const router = express.Router();

//set up the signup routes and http methods
router.route('/signup')
    .post(usersController.create_new_user)

router.route('/login')
    .post(usersController.getUser)

router.route('/income')
    .post(revenueController.create_revenue)

router.route('/expense')
    .post(expenseController.create_expense)

router.route('/income/:id')
    .get(revenueController.fetch_userRevenue)
    .put(revenueController.update_userRevenue)
    .delete(revenueController.delete_userRevenue)

router.route('/expense/:id')
    .get(expenseController.fetch_userExpense)
    .put(expenseController.update_userExpense)
    .delete(expenseController.delete_userExpense)

export default router;