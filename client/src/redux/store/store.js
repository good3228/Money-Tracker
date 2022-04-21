import {configureStore} from '@reduxjs/toolkit';
import usersReducer from '../slices/User/usersSlices';
import expensesSlices from '../slices/expenses/expensesSlices';
import statistic from '../slices/accountStatistics/accountStatisticSlices';
import incomesSlices from '../slices/incomes/incomesSlices';
const store = configureStore({
    reducer: {
        users: usersReducer,
        expenses:expensesSlices,
        incomes:incomesSlices,
        statistic,
    },
});

export default store;