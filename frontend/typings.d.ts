interface People {
  _id: string;
  email: string;
  username: string;
  image: string;
}

interface User {
  id?: string;
  email: string;
  username: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Invitation {
  _id?: string;
  idSender: string;
  usernameSender: string;
  emailSender: string;
  imageSender: string;
  idReceiver: string;
  usernameReceiver: string;
  emailReceiver: string;
  imageReceiver: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Friends {
  _id?: string;
  id1: string;
  email1: string;
  username1: string;
  image1: string;
  id2: string;
  email2: string;
  username2: string;
  image2: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastMessage?: string;
}

interface Message {
  _id?: string;
  idSender: string;
  usernameSender: string;
  imageSender?: string;
  idReceiver: string;
  usernameReceiver: string;
  imageReceiver?: string;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}
