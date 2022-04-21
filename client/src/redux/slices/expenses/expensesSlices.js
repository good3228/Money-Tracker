import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";



//
export const createExpAction = createAsyncThunk("expense/create", 
async(payload, 
{rejectWithValue, getState, dispatch})=> {

    const user_id = getState()?.users?.userAuth?._id;
    const config = {
        headers:{
            "Content-Type": "application/json",
        },
    };
    try {
        const { data } = await axios.post("http://localhost:9000/expense", 
        {
            title: payload.title,
            description: payload.description,
            amount: payload.amount,
            user: user_id
        },
        config
        );
        console.log(data);
        return data;
    }catch(error) {
        if(!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
}
);

export const updateExpAction = createAsyncThunk("expense/update", 
async(payload, 
{rejectWithValue, getState, dispatch})=> {

    // const payload_id = payload?._id;
    const config = {
        headers:{
            "Content-Type": "application/json",
        },
    };
    try {
        const { data } = await axios.put(`http:\/\/localhost:9000/expense/${payload?.id}`, 
        {
            title: payload.title,
            description: payload.description,
            amount: payload.amount,
        },
        config
        );
        // console.log(data);
        return data;
    }catch(error) {
        if(!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
}
);

//  fetch all action
export const fetchAllExpAction = createAsyncThunk("expense/fetchAll", 
async(payload, 
{rejectWithValue, getState, dispatch})=> {

    const user_id = getState()?.users?.userAuth?._id;
    const config = {
        headers:{
            "Content-Type": "application/json",
        },
    };
    try {
        const { data } = await axios.get("http://localhost:9000/userExpense/" + user_id, 
        {
            title: payload.title,
            description: payload.description,
            amount: payload.amount,
            user: user_id
        },
        config
        );
        return data;
    }catch(error) {
        if(!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
}
);

//  Delete action
export const deleteExpAction = createAsyncThunk("expense/delete", 
async(payload, 
{rejectWithValue, getState, dispatch})=> {

    // const user_id = getState()?.users?.userAuth?._id;
    const config = {
        headers:{
            "Content-Type": "application/json",
        },
    };
    try {
        const { data } = await axios.delete(`http:\/\/localhost:9000/expense/${payload?.id}`, 
        {
            title: payload.title,
            description: payload.description,
            amount: payload.amount,
        },
        config
        );
        return data;
    }catch(error) {
        if(!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }
}
);

const expenseSlices = createSlice({
  name:'expenses',
  initialState:{},
  extraReducers:(builder) => {
    builder.addCase(createExpAction.pending, (state, action) => {
        state.loading = true;
    });
    builder.addCase(createExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createExpAction.rejected, (state, action) => {
      state.loading = false;
      state.expenseCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //  fetch all Expenses
    builder.addCase(fetchAllExpAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllExpAction.fulfilled, (state, action) => {
        state.loading = false;
        state.expensesList = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
    });
    builder.addCase(fetchAllExpAction.rejected, (state, action) => {
        state.loading = false;
        state.expensesList = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
    });


    //  update Expense
    builder.addCase(updateExpAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(updateExpAction.fulfilled, (state, action) => {
          state.loading = false;
          state.expensesUpdated = action?.payload;
          state.appErr = undefined;
          state.serverErr = undefined;
      });
      builder.addCase(updateExpAction.rejected, (state, action) => {
          state.loading = false;
          state.expensesUpdated = action?.payload;
          state.appErr = action?.payload?.message;
          state.serverErr = action?.error?.message;
      });

    //  delete Expense
    builder.addCase(deleteExpAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(deleteExpAction.fulfilled, (state, action) => {
          state.loading = false;
          state.expensesDeleted = action?.payload;
          state.appErr = undefined;
          state.serverErr = undefined;
      });
      builder.addCase(deleteExpAction.rejected, (state, action) => {
          state.loading = false;
          state.expensesDeleted = action?.payload;
          state.appErr = action?.payload?.message;
          state.serverErr = action?.error?.message;
      });
  },
});

export default expenseSlices.reducer;