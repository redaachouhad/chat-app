import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface ListOfPeopleState {
  value: People[];
}

// Define the initial state using that type
const initialState: ListOfPeopleState = {
  value: [] as People[],
};

export const listOfPeopleSlice = createSlice({
  name: "listOfPeople",
  initialState,
  reducers: {
    setListOfPeople: (state, action: PayloadAction<People[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setListOfPeople } = listOfPeopleSlice.actions;

export const selectCount = (state: RootState) => state.listOfPeople.value;

export default listOfPeopleSlice.reducer;
