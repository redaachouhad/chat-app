import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface ListOfMessagesState {
  value: Message[];
}

// Define the initial state using that type
const initialState: ListOfMessagesState = {
  value: [] as Message[],
};

export const listOfMessagesSlice = createSlice({
  name: "listOfMessages",
  initialState,
  reducers: {
    setListOfMessages: (state, action: PayloadAction<Message[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setListOfMessages } = listOfMessagesSlice.actions;

export const selectCount = (state: RootState) => state.listOfMessages.value;

export default listOfMessagesSlice.reducer;
