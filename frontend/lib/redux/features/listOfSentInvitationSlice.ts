import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface ListOfSentInvitationState {
  value: Invitation[];
}

// Define the initial state using that type
const initialState: ListOfSentInvitationState = {
  value: [] as Invitation[],
};

export const listOfSentInvitationSlice = createSlice({
  name: "listOfSentInvitation",
  initialState,
  reducers: {
    setListOfSentInvitation: (state, action: PayloadAction<Invitation[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setListOfSentInvitation } = listOfSentInvitationSlice.actions;

export const selectCount = (state: RootState) =>
  state.listOfSentInvitation.value;

export default listOfSentInvitationSlice.reducer;
