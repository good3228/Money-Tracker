import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";
//Login action

export const loginUserAction = createAsyncThunk("login", 
async(payload, 
{rejectWithValue, getState, dispatch})=> {
    const config = {
        headers:{
            "Content-Type": "application/json",
        },
    };
    try {
        const { data } = await axios.post("http://localhost:9000/login", 
        payload,
        config
        );
        console.log(data);
        return data;
    }catch(error) {
        if(error.response) {
            console.log(error.response.data);
        }
        return rejectWithValue(error?.response?.data);
    }
}
);


//slices

const userSlices = createSlice({
    name:'users',
    initialState:{},
    extraReducers: (builder) => {
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.userLoading = true;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userLoading = false;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.userLoading = false;
            state.userAppErr = action?.payload.message;
            state.userServerErr = action.error?.message;
        })
    }
});


export default userSlices.reducer;