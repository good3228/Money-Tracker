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

const expenseSlices = createSlice({
  name:'expenses',
  initialState:{expense:["43", "53"]},
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
    })
  },
});

export default expenseSlices.reducer;