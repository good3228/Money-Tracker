import {configureStore} from '@reduxjs/toolkit';
import usersReducer from '../slices/User/usersSlices';
import statistic from '../slices/accountStatistics/accountStatisticSlices';
const store = configureStore({
    reducer: {
        users: usersReducer,
    },
});

export default store;