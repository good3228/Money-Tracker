import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";

//Fetch All Exp
export const fetchAccountStatsAction = createAsyncThunk(
    "statistic/details",
    async (stats, { rejectWithValue, getState, dispatch }) => {
        const config = {
            headers:{
                "Content-Type": "application/json",
            },
        };
      //http call
      try {
        const { data } = await axios.get("http://localhost:9000/statistic", 
        stats,
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
    name: "statistics",
    initialState: {},
    extraReducers: builder => {
      //fetch all
      builder.addCase(fetchAccountStatsAction.pending, (state, action) => {
        state.statsLoading = true;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(fetchAccountStatsAction.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
        state.isIncomeCreated = false;
      });
      builder.addCase(fetchAccountStatsAction.rejected, (state, action) => {
        state.statsLoading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });
    },
  });
  
  export default incomeSlices.reducer;
  