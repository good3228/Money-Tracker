import Revenue from './../models/Revenue.js'
import Expense from './../models/Expense.js'


//these are the two functions which set up the different response
const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}
const setSuccessResponse = (obj,response) => {
    response.status(200);
    response.json(obj);
}

export const create_statistic = async (request, response) => {
    try{
        const expensesStats = await Expense.aggregate([
        { $match: { amount: { $gte: 0 } } },
    {
      $group: {
        _id: null,
        averageExp: { $avg: "$amount" },
        totalExp: { $sum: "$amount" },
        minExp: { $min: "$amount" },
        maxExp: { $max: "$amount" },
        totalRecords: { $sum: 1 },
      },
    },
        ]);

        const revenueStats = await Revenue.aggregate([
            //filter
            { $match: { amount: { $gte: 0 } } },
            {
              $group: {
                _id: null, 
                averageRev: { $avg: "$amount" },
                totalRev: { $sum: "$amount" },
                minRev: { $min: "$amount" },
                maxRev: { $max: "$amount" },
                totalRecords: { $sum: 1 },
              },
            },
          ]);

        const profit = revenueStats[0].totalRev - expensesStats[0].totalExp;
        response.json({ expensesStats, revenueStats, profit });
    }catch(error){
        setErrorResponse(error,response);
    }
}