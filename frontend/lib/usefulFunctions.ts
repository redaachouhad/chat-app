export const addUsers = async (user: any) => {
  const createUser = {
    email: user.email as string,
    image: user.image as string,
    username: user.name as string,
  };
  const response = await fetch(
    (process.env.NEXT_PUBLIC_URL_BACKEND as string) + "/api/users/addUsers",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createUser),
      cache: "no-store",
    }
  );
  return response;
};

export const findPeople = async (id: string) => {
  try {
    const response = await fetch(
      (process.env.NEXT_PUBLIC_URL_BACKEND as string) +
        `/api/users/findPeople/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data.message as People[];
  } catch (error) {
    console.log(error);
    return [] as People[];
  }
};

export const sendInvitation = async (invitation: Invitation) => {
  try {
    const response = await fetch(
      (process.env.NEXT_PUBLIC_URL_BACKEND as string) +
        "/api/invitations/sendInvitation",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invitation),
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data.message as Invitation[];
  } catch (error) {
    console.log(error);
    return [] as Invitation[];
  }
};

export const getSentInvitation = async (id: string) => {
  try {
    const response = await fetch(
      (process.env.NEXT_PUBLIC_URL_BACKEND as string) +
        `/api/invitations/getSentInvitation/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data.message as Invitation[];
  } catch (error) {
    console.log(error);
    return [] as Invitation[];
  }
};

export const deleteSentInvitation = async (id: string) => {
  try {
    const response = await fetch(
      (process.env.NEXT_PUBLIC_URL_BACKEND as string) +
        `/api/invitations/deleteSentInvitation/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getReceiveInvitation = async (id: string) => {
  try {
    const response = await fetch(
      (process.env.NEXT_PUBLIC_URL_BACKEND as string) +
        `/api/invitations/getReceiveInvitation/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data.message as Invitation[];
  } catch (error) {
    console.log(error);
    return [] as Invitation[];
  }
};

export const deleteReceivedInvitation = async (id: string) => {
  try {
    const response = await fetch(
      (process.env.NEXT_PUBLIC_URL_BACKEND as string) +
        `/api/invitations/deleteReceivedInvitation/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const addFriends = async (friends: any) => {
  try {
    const response = await fetch(
      (process.env.NEXT_PUBLIC_URL_BACKEND as string) +
        `/api/friends/addFriends`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(friends),
        cache: "no-store",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getFriends = async (id: string) => {
  try {
    const response = await fetch(
      (process.env.NEXT_PUBLIC_URL_BACKEND as string) +
        `/api/friends/getFriends/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data.message as Friends[];
  } catch (error) {
    console.log(error);
    return [] as Friends[];
  }
};

export const deleteFriend = async (id: string) => {
  try {
    const response = await fetch(
      (process.env.NEXT_PUBLIC_URL_BACKEND as string) +
        `/api/friends/deleteFriend/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const sendMessageApi = async (item: any) => {
  try {
    const response = await fetch(
      (process.env.NEXT_PUBLIC_URL_BACKEND as string) +
        `/api/messages/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
        cache: "no-store",
      }
    );
    const data = await response.json();
    console.log(data.listOfFriends as Friends[]);
    return {
      savedMessage: data.savedMessage as Message,
      listOfFriendsApi: data.listOfFriends as Friends[],
    };
  } catch (error) {
    console.log(error);
  }
};

export const getAllMessages = async (item: any) => {
  try {
    const response = await fetch(
      (process.env.NEXT_PUBLIC_URL_BACKEND as string) +
        `/api/messages/getAllMessages`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data.message as Message[];
  } catch (error) {
    console.log(error);
    return [] as Message[];
  }
};

export const sendingMessageWithPusher = async (savedMessage: Message) => {
  try {
    const response = await fetch("/api/pusher/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(savedMessage),
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendingInvitationWithPusher = async (invitation: Invitation) => {
  try {
    const response = await fetch("/api/pusher/sendInvitation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invitation),
    });
  } catch (error) {
    console.log(error);
  }
};

export const acceptInvitationWithPusher = async (invitation: Invitation) => {
  try {
    const response = await fetch("/api/pusher/acceptInvitation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invitation),
    });
  } catch (error) {
    console.log(error);
  }
};

export const refuseInvitationWithPusher = async (invitation: Invitation) => {
  try {
    const response = await fetch("/api/pusher/refuseInvitation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invitation),
    });
  } catch (error) {
    console.log(error);
  }
};
