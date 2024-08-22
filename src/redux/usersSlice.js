import { createSlice } from "@reduxjs/toolkit"; // permite crear un slice  de la tienda redux. un slice es una porcion del estado

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        fetchUsers: (state, action) => {
            return action.payload;
        }
    },
})

export const { fetchUsers } = usersSlice.actions;

export default usersSlice.reducer;