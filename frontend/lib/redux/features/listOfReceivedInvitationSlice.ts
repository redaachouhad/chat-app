import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface ListOfReceivedInvitationState {
  value: Invitation[];
}

// Define the initial state using that type
const initialState: ListOfReceivedInvitationState = {
  value: [] as Invitation[],
};

export const listOfReceivedInvitationSlice = createSlice({
  name: "listOfReceivedInvitation",
  initialState,
  reducers: {
    setListOfReceivedInvitation: (
      state,
      action: PayloadAction<Invitation[]>
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setListOfReceivedInvitation } =
  listOfReceivedInvitationSlice.actions;

export const selectCount = (state: RootState) =>
  state.listOfReceivedInvitation.value;

export default listOfReceivedInvitationSlice.reducer;
