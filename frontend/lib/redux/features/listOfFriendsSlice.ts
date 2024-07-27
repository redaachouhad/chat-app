import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface ListOfFriendsState {
  value: Friends[];
}

// Define the initial state using that type
const initialState: ListOfFriendsState = {
  value: [] as Friends[],
};

export const listOfFriendsSlice = createSlice({
  name: "listOfFriends",
  initialState,
  reducers: {
    setListOfFriends: (state, action: PayloadAction<Friends[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setListOfFriends } = listOfFriendsSlice.actions;

export const selectCount = (state: RootState) => state.listOfFriends.value;

export default listOfFriendsSlice.reducer;
