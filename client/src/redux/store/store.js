import {configureStore} from '@reduxjs/toolkit';
import usersReducer from '../slices/User/usersSlices';
import expensesSlices from '../slices/expenses/expensesSlices';
import statistic from '../slices/accountStatistics/accountStatisticSlices';
const store = configureStore({
    reducer: {
        users: usersReducer,
        expenses:expensesSlices,
    },
});

export default store;