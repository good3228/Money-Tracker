import {createAsyncThunk, createSlice, createAction} from "@reduxjs/toolkit"
import axios from "axios";



//Actions Redirect
export const resetExpCreated = createAction("expense/create/reset");
export const resetExpUpdated = createAction("expense/updated/reset");
export const resetExpDeleted = createAction("expense/deleted/reset");

//  create expense
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
        //  dispatch
        dispatch(resetExpCreated());
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
        //  dispatch
        dispatch(resetExpUpdated());
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


//  search action
// export const searchExpAction = createAsyncThunk("expense/search", 
// async(payload, 
// {rejectWithValue, getState, dispatch})=> {

//     const user_id = getState()?.users?.userAuth?._id;
//     const keyword = payload?.keyword;
//     const config = {
//         headers:{
//             "Content-Type": "application/json",
//         },
//     };
//     try {
//         const { data } = await axios.get("http://localhost:9000/userExpense/" + user_id + "?title=" + keyword, 
//        payload,
//         config
//         );
//         return data;
//     }catch(error) {
//         if(!error?.response) {
//             throw error;
//         }
//         return rejectWithValue(error?.response?.data);
//     }
// }
// );

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
        //  dispatch
        dispatch(resetExpDeleted());
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
    //  reset action
    builder.addCase(resetExpCreated, (state, action) => {
        state.isExpCreated = true;
    })
    builder.addCase(createExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isExpCreated = false;
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

    //  search Expenses
    // builder.addCase(searchExpAction.pending, (state, action) => {
    //     state.loading = true;
    //   });
    //   builder.addCase(searchExpAction.fulfilled, (state, action) => {
    //       state.loading = false;
    //     //   state.expensesList = action?.payload;
    //       state.appErr = undefined;
    //       state.serverErr = undefined;
    //       state.keyword = action?.payload;
    //   });
    //   builder.addCase(searchExpAction.rejected, (state, action) => {
    //       state.loading = false;
    //       state.expensesList = action?.payload;
    //       state.appErr = undefined;
    //       state.serverErr = undefined;
    //   });    


    //  update Expense
    builder.addCase(updateExpAction.pending, (state, action) => {
        state.loading = true;
      });
    //  reset action
    builder.addCase(resetExpUpdated, (state, action) => {
        state.isExpUpdated = true;
    })
      builder.addCase(updateExpAction.fulfilled, (state, action) => {
          state.loading = false;
          state.expensesUpdated = action?.payload;
          state.appErr = undefined;
          state.serverErr = undefined;
          state.isExpUpdated = false;
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

    //  reset action
    builder.addCase(resetExpDeleted, (state, action) => {
        state.isExpDeleted = true;
    })
      builder.addCase(deleteExpAction.fulfilled, (state, action) => {
          state.loading = false;
          state.expensesDeleted = action?.payload;
          state.appErr = undefined;
          state.serverErr = undefined;
          state.isExpDeleted = false;
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