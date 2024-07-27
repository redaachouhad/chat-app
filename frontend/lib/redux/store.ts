import { configureStore } from "@reduxjs/toolkit";
import listOfFriendsReducer from "./features/listOfFriendsSlice";
import listOfMessagesReducer from "./features/listOfMessagesSlice";
import listOfReceivedInvitationReducer from "./features/listOfReceivedInvitationSlice";
import listOfInvitationReducer from "./features/listOfSentInvitationSlice";
import selectedFriendReducer from "./features/selectedFriendSlice";

export const store = configureStore({
  reducer: {
    listOfSentInvitation: listOfInvitationReducer,
    listOfReceivedInvitation: listOfReceivedInvitationReducer,
    listOfFriends: listOfFriendsReducer,
    selectedFriend: selectedFriendReducer,
    listOfMessages: listOfMessagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
