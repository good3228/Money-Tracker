import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

//Fetch All Exp
export const fetchAccountStatsAction = createAsyncThunk(
    "profile/statistic",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        const user_id = getState()?.users?.userAuth?._id;
        const config = {
            headers:{
                "Content-Type": "application/json",
            },
        };
      //http call
      try {
        const { data } = await axios.get(`http:\/\/localhost:9000/statistic/${user_id}`,
        payload,
        config);
        return data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );


  const incomeSlices = createSlice({
    name: "profile",
    initialState: {},
    extraReducers: builder => {
      //fetch all
      builder.addCase(fetchAccountStatsAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(fetchAccountStatsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.accountDetails = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(fetchAccountStatsAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
    },
  });
  
  export default incomeSlices.reducer;
  