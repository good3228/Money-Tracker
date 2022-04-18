import {configureStore} from '@reduxjs/toolkit';
import usersReducer from '../slices/User/usersSlices';
const store = configureStore({
    reducer: {
        users: usersReducer,
    },
});

export default store;