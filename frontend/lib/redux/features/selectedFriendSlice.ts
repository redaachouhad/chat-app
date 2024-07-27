import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface SelectedFriendState {
  value: Friends;
}

// Define the initial state using that type
const initialState: SelectedFriendState = {
  value: {
    _id: "",
    id1: "",
    email1: "",
    username1: "",
    image1: "",
    id2: "",
    email2: "",
    username2: "",
    image2: "",
    lastMessage: "",
  },
};

export const selectedFriendSlice = createSlice({
  name: "selectedFriend",
  initialState,
  reducers: {
    setSelectedFriend: (state, action: PayloadAction<Friends>) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedFriend } = selectedFriendSlice.actions;

export const selectCount = (state: RootState) => state.selectedFriend.value;

export default selectedFriendSlice.reducer;
