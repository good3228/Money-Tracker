import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";



// Create Action
export const createIncAction = createAsyncThunk("income/create", /////
async(payload, 
{rejectWithValue, getState, dispatch})=> {

    const user_id = getState()?.users?.userAuth?._id;
    const config = {
        headers:{
            "Content-Type": "application/json",
        },
    };
    try {
        const { data } = await axios.post("http://localhost:9000/income", 
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

// Update Action
export const updateIncAction = createAsyncThunk("income/update", 
async(payload, 
{rejectWithValue, getState, dispatch})=> {
    const config = {
        headers:{
            "Content-Type": "application/json",
        },
    };
    try {
        const { data } = await axios.put(`http:\/\/localhost:9000/income/${payload?.id}`, 
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

//  fetch all action
export const fetchAllIncAction = createAsyncThunk("income/fetchAll", /////
async(payload, 
{rejectWithValue, getState, dispatch})=> {

    const user_id = getState()?.users?.userAuth?._id;
    const config = {
        headers:{
            "Content-Type": "application/json",
        },
    };
    try {
        const { data } = await axios.get("http://localhost:9000/userRevenue/" + user_id, 
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

// Delete Action
export const deleteIncAction = createAsyncThunk("income/delete", 
async(payload, 
{rejectWithValue, getState, dispatch})=> {
    const config = {
        headers:{
            "Content-Type": "application/json",
        },
    };
    try {
        const { data } = await axios.delete(`http:\/\/localhost:9000/income/${payload?.id}`, 
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

const incomeSlices = createSlice({
  name:'incomes',
  initialState:{},
  extraReducers:(builder) => {
    builder.addCase(createIncAction.pending, (state, action) => {
        state.loading = true;
    });
    builder.addCase(createIncAction.fulfilled, (state, action) => {
      state.loading = false;
      state.incomeCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createIncAction.rejected, (state, action) => {
      state.loading = false;
      state.incomeCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    //  fetch all Incomes
    builder.addCase(fetchAllIncAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllIncAction.fulfilled, (state, action) => {
        state.loading = false;
        state.incomesList = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
    });
    builder.addCase(fetchAllIncAction.rejected, (state, action) => {
        state.loading = false;
        state.incomesList = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
    });

    //  update Income
    builder.addCase(updateIncAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(updateIncAction.fulfilled, (state, action) => {
          state.loading = false;
          state.incomeUpdated = action?.payload;
          state.appErr = undefined;
          state.serverErr = undefined;
      });
      builder.addCase(updateIncAction.rejected, (state, action) => {
          state.loading = false;
          state.incomeUpdated = action?.payload;
          state.appErr = action?.payload?.message;
          state.serverErr = action?.error?.message;
      });

    //  delete Income
    builder.addCase(deleteIncAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(deleteIncAction.fulfilled, (state, action) => {
          state.loading = false;
          state.incomeDeleted = action?.payload;
          state.appErr = undefined;
          state.serverErr = undefined;
      });
      builder.addCase(deleteIncAction.rejected, (state, action) => {
          state.loading = false;
          state.incomeDeleted = action?.payload;
          state.appErr = action?.payload?.message;
          state.serverErr = action?.error?.message;
      });
  },
});

export default incomeSlices.reducer;