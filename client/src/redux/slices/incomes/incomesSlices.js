import {createAsyncThunk, createSlice, createAction} from "@reduxjs/toolkit"
import axios from "axios";

// Redirect
export const resetIncCreated = createAction("income/create/reset");
export const resetIncUpdated = createAction("income/updated/reset");
export const resetIncDeleted = createAction("income/deleted/reset");

// Create Action
export const createIncAction = createAsyncThunk("income/create",
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
        //  dispatch
        dispatch(resetIncCreated());
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
        dispatch(resetIncUpdated());
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

//  search action
export const searchIncAction = createAsyncThunk("income/search", 
async(payload, 
{rejectWithValue, getState, dispatch})=> {

    const user_id = getState()?.users?.userAuth?._id;
    const keyword = payload?.keyword;
    const config = {
        headers:{
            "Content-Type": "application/json",
        },
    };
    try {
        const { data } = await axios.get("http://localhost:9000/userRevenue/search/" + user_id + "?title=" + keyword, 
       payload,
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
        dispatch(resetIncDeleted());
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
    builder.addCase(resetIncCreated, (state, action) => {
        state.isIncCreated = true;
    })
    builder.addCase(createIncAction.fulfilled, (state, action) => {
      state.loading = false;
      state.incomeCreated = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isIncCreated = false;      
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

    //  search income
    builder.addCase(searchIncAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(searchIncAction.fulfilled, (state, action) => {
          state.loading = false;
          state.appErr = undefined;
          state.serverErr = undefined;
          state.keyword = action?.payload;
      });
      builder.addCase(searchIncAction.rejected, (state, action) => {
          state.loading = false;
          state.incomesList = action?.payload;
          state.appErr = undefined;
          state.serverErr = undefined;
      }); 

    //  update Income
    builder.addCase(updateIncAction.pending, (state, action) => {
        state.loading = true;
      });
      //  reset action
    builder.addCase(resetIncUpdated, (state, action) => {
        state.isIncUpdated = true;
    })
      builder.addCase(updateIncAction.fulfilled, (state, action) => {
          state.loading = false;
          state.incomeUpdated = action?.payload;
          state.appErr = undefined;
          state.serverErr = undefined;
          state.isIncUpdated = false;
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
      })
      //  reset action
    builder.addCase(resetIncDeleted, (state, action) => {
        state.isIncDeleted = true;
    })
      builder.addCase(deleteIncAction.fulfilled, (state, action) => {
          state.loading = false;
          state.incomeDeleted = action?.payload;
          state.appErr = undefined;
          state.serverErr = undefined;
          state.isIncDeleted = false;
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